import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const authorization =
      request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const accessToken =
      authorization.replace("Bearer ", "");

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const publishableKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    const cashfreeClientId =
      process.env.CASHFREE_CLIENT_ID;

    const cashfreeClientSecret =
      process.env.CASHFREE_CLIENT_SECRET;

    if (
      !supabaseUrl ||
      !publishableKey ||
      !serviceRoleKey ||
      !cashfreeClientId ||
      !cashfreeClientSecret
    ) {
      return NextResponse.json(
        {
          error:
            "Server configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    // -----------------------------------------
    // User client: only used to verify login
    // -----------------------------------------

    const userSupabase =
      createClient(
        supabaseUrl,
        publishableKey,
        {
          global: {
            headers: {
              Authorization:
                `Bearer ${accessToken}`,
            },
          },
        }
      );

    const {
      data: { user },
      error: userError,
    } =
      await userSupabase.auth.getUser(
        accessToken
      );

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Invalid or expired login session.",
        },
        { status: 401 }
      );
    }

    // -----------------------------------------
    // Admin client: server only
    // -----------------------------------------

    const adminSupabase =
      createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      );

    const body =
      await request.json();

    const planId =
      body?.planId;

    if (!planId) {
      return NextResponse.json(
        {
          error:
            "Membership plan ID is required.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Get plan using server client
    // -----------------------------------------

    const {
      data: plan,
      error: planError,
    } =
      await adminSupabase
        .from("membership_plans")
        .select(
          `
          id,
          name,
          price,
          duration_months,
          active
          `
        )
        .eq("id", planId)
        .eq("active", true)
        .single();

    if (planError || !plan) {
      console.error(
        "Plan lookup error:",
        planError
      );

      return NextResponse.json(
        {
          error:
            "Selected membership plan was not found.",
        },
        { status: 404 }
      );
    }

    const amount =
      Number(plan.price);

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid membership plan price.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // Create membership using service role
    // -----------------------------------------

    const {
      data: membership,
      error: membershipError,
    } =
      await adminSupabase
        .from("memberships")
        .insert({
          user_id: user.id,
          plan_id: plan.id,
          status: "pending",
          payment_status: "created",
        })
        .select("id")
        .single();

    if (
      membershipError ||
      !membership
    ) {
      console.error(
        "Membership creation error:",
        membershipError
      );

      return NextResponse.json(
        {
          error:
            "Could not create membership record.",
        },
        { status: 500 }
      );
    }

    // -----------------------------------------
    // Create Cashfree order ID
    // -----------------------------------------

    const orderId =
      "FAMI_" +
      membership.id
        .replace(/-/g, "")
        .substring(0, 20);

    // -----------------------------------------
    // Save payment reference using service role
    // -----------------------------------------

    const {
      data: savedMembership,
      error: referenceError,
    } =
      await adminSupabase
        .from("memberships")
        .update({
          payment_reference:
            orderId,
        })
        .eq(
          "id",
          membership.id
        )
        .select(
          "id, payment_reference"
        )
        .single();

    if (
      referenceError ||
      !savedMembership
    ) {
      console.error(
        "Payment reference update failed:",
        referenceError
      );

      return NextResponse.json(
        {
          error:
            "Membership was created but the payment reference could not be saved.",
        },
        { status: 500 }
      );
    }

    // -----------------------------------------
    // Use current request origin
    // -----------------------------------------

    const requestUrl =
      new URL(request.url);

    const baseUrl =
      requestUrl.origin;

    const returnUrl =
      `${baseUrl}/payment/success?order_id={order_id}`;

    const notifyUrl =
      `${baseUrl}/api/cashfree/webhook`;

    // -----------------------------------------
    // Create Cashfree Sandbox order
    // -----------------------------------------

    const cashfreeResponse =
      await fetch(
        "https://sandbox.cashfree.com/pg/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",

            "x-api-version":
              "2025-01-01",

            "x-client-id":
              cashfreeClientId,

            "x-client-secret":
              cashfreeClientSecret,
          },

          body: JSON.stringify({
            order_id:
              orderId,

            order_amount:
              amount,

            order_currency:
              "INR",

            customer_details: {
              customer_id:
                user.id,

              customer_email:
                user.email ||
                "customer@example.com",

              customer_phone:
                user.user_metadata
                  ?.phone ||
                user.user_metadata
                  ?.mobile ||
                "9999999999",
            },

            order_meta: {
              return_url:
                returnUrl,

              notify_url:
                notifyUrl,
            },

            order_note:
              `FamiNova membership - ${plan.name}`,
          }),
        }
      );

    const cashfreeData =
      await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      console.error(
        "Cashfree order error:",
        cashfreeData
      );

      await adminSupabase
        .from("memberships")
        .update({
          payment_status:
            "failed",
        })
        .eq(
          "id",
          membership.id
        );

      return NextResponse.json(
        {
          error:
            cashfreeData?.message ||
            "Cashfree order creation failed.",
        },
        { status: 500 }
      );
    }

    if (
      !cashfreeData.payment_session_id
    ) {
      return NextResponse.json(
        {
          error:
            "Cashfree did not return a payment session.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,

      orderId,

      paymentSessionId:
        cashfreeData.payment_session_id,

      membershipId:
        membership.id,
    });
  } catch (error) {
    console.error(
      "Create Cashfree order error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unexpected error while creating payment order.",
      },
      { status: 500 }
    );
  }
}