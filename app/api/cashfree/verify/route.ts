import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        {
          error: "Order ID is required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 1. Environment variables
    // --------------------------------------------------

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    const cashfreeClientId =
      process.env.CASHFREE_CLIENT_ID;

    const cashfreeClientSecret =
      process.env.CASHFREE_CLIENT_SECRET;

    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !cashfreeClientId ||
      !cashfreeClientSecret
    ) {
      console.error(
        "Required payment verification environment variables are missing."
      );

      return NextResponse.json(
        {
          error:
            "Payment verification configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 2. SERVER-ONLY Supabase client
    // --------------------------------------------------

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // --------------------------------------------------
    // 3. Ask Cashfree for current order status
    // --------------------------------------------------

    const cashfreeResponse =
      await fetch(
        `https://sandbox.cashfree.com/pg/orders/${encodeURIComponent(
          orderId
        )}`,
        {
          method: "GET",

          headers: {
            Accept: "application/json",

            "x-api-version":
              "2025-01-01",

            "x-client-id":
              cashfreeClientId,

            "x-client-secret":
              cashfreeClientSecret,
          },

          cache: "no-store",
        }
      );

    const cashfreeData =
      await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      console.error(
        "Cashfree verification error:",
        cashfreeData
      );

      return NextResponse.json(
        {
          error:
            cashfreeData?.message ||
            "Unable to verify payment.",
        },
        { status: 500 }
      );
    }

    const orderStatus =
      cashfreeData?.order_status;

    console.log(
      "Cashfree order status:",
      orderStatus
    );

    // --------------------------------------------------
    // 4. Payment isn't completed
    // --------------------------------------------------

    if (orderStatus !== "PAID") {
      return NextResponse.json({
        success: true,
        status:
          orderStatus || "UNKNOWN",
      });
    }

    // --------------------------------------------------
    // 5. Find membership using Cashfree order ID
    // --------------------------------------------------

    const {
      data: membership,
      error: membershipError,
    } = await supabase
      .from("memberships")
      .select(
        `
        id,
        user_id,
        plan_id,
        status,
        payment_status,
        payment_reference
        `
      )
      .eq(
        "payment_reference",
        orderId
      )
      .maybeSingle();

    if (membershipError) {
      console.error(
        "Membership lookup error:",
        membershipError
      );

      return NextResponse.json(
        {
          error:
            "Unable to find membership record.",
        },
        { status: 500 }
      );
    }

    if (!membership) {
      console.error(
        "No membership found for order:",
        orderId
      );

      return NextResponse.json(
        {
          error:
            "Payment was received, but the membership record was not found.",
        },
        { status: 404 }
      );
    }

    console.log(
      "Membership found:",
      membership
    );

    // --------------------------------------------------
    // 6. Already active?
    // --------------------------------------------------

    if (
      membership.status === "active" &&
      membership.payment_status === "paid"
    ) {
      return NextResponse.json({
        success: true,
        status: "ACTIVE",
        membershipId:
          membership.id,
      });
    }

    // --------------------------------------------------
    // 7. Get membership plan duration
    // --------------------------------------------------

    const {
      data: plan,
      error: planError,
    } = await supabase
      .from("membership_plans")
      .select(
        "duration_months"
      )
      .eq(
        "id",
        membership.plan_id
      )
      .single();

    if (planError || !plan) {
      console.error(
        "Membership plan lookup error:",
        planError
      );

      return NextResponse.json(
        {
          error:
            "Membership plan could not be found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 8. Calculate membership dates
    // --------------------------------------------------

    const startedAt =
      new Date();

    const expiresAt =
      new Date(startedAt);

    expiresAt.setMonth(
      expiresAt.getMonth() +
        Number(
          plan.duration_months || 1
        )
    );

    // --------------------------------------------------
    // 9. Activate membership
    // --------------------------------------------------

    const {
      data: activatedMembership,
      error: updateError,
    } = await supabase
      .from("memberships")
      .update({
        status: "active",

        payment_status:
          "paid",

        started_at:
          startedAt.toISOString(),

        expires_at:
          expiresAt.toISOString(),

        paid_at:
          startedAt.toISOString(),
      })
      .eq(
        "id",
        membership.id
      )
      .select(
        `
        id,
        user_id,
        plan_id,
        status,
        payment_status,
        started_at,
        expires_at
        `
      )
      .single();

    if (
      updateError ||
      !activatedMembership
    ) {
      console.error(
        "Membership activation error:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            "Payment was verified, but membership activation failed.",
        },
        { status: 500 }
      );
    }

    console.log(
      "Membership successfully activated:",
      activatedMembership
    );

    // --------------------------------------------------
    // 10. Success
    // --------------------------------------------------

    return NextResponse.json({
      success: true,

      status: "ACTIVE",

      membershipId:
        activatedMembership.id,

      expiresAt:
        activatedMembership.expires_at,
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unexpected error while verifying payment.",
      },
      { status: 500 }
    );
  }
}