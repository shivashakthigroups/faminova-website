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

    if (
      !supabaseUrl ||
      !publishableKey ||
      !serviceRoleKey
    ) {
      return NextResponse.json(
        {
          error:
            "Server configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    // User client - only for verifying login
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

    const body =
      await request.json();

    const planId =
      body?.planId;

    const utr =
      String(body?.utr || "")
        .trim();

    if (!planId) {
      return NextResponse.json(
        {
          error:
            "Membership plan ID is required.",
        },
        { status: 400 }
      );
    }

    if (
      !utr ||
      utr.length < 6
    ) {
      return NextResponse.json(
        {
          error:
            "A valid UPI Transaction ID / UTR is required.",
        },
        { status: 400 }
      );
    }

    // Server-only Supabase client
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

    // Get the selected membership plan
    const {
      data: plan,
      error: planError,
    } =
      await adminSupabase
        .from("membership_plans")
        .select(
          "id, name, price, duration_months, active"
        )
        .eq("id", planId)
        .eq("active", true)
        .single();

    if (
      planError ||
      !plan
    ) {
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
            "Invalid membership amount.",
        },
        { status: 400 }
      );
    }

    // Create membership in pending state
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

    // Create unique FamiNova order ID
    const orderId =
      "FAMI-UPI-" +
      membership.id
        .replace(/-/g, "")
        .substring(0, 16)
        .toUpperCase();

    // Reject duplicate UTR submissions
    const {
      data: existingPayment,
    } =
      await adminSupabase
        .from("manual_payments")
        .select("id")
        .eq("utr", utr)
        .maybeSingle();

    if (existingPayment) {
      await adminSupabase
        .from("memberships")
        .delete()
        .eq(
          "id",
          membership.id
        );

      return NextResponse.json(
        {
          error:
            "This UPI Transaction ID has already been submitted.",
        },
        { status: 409 }
      );
    }

    // Create manual payment record
    const {
      data: payment,
      error: paymentError,
    } =
      await adminSupabase
        .from("manual_payments")
        .insert({
          user_id:
            user.id,

          membership_id:
            membership.id,

          order_id:
            orderId,

          amount,

          utr,

          payment_status:
            "submitted",

          submitted_at:
            new Date().toISOString(),
        })
        .select(
          "id, order_id, amount, payment_status"
        )
        .single();

    if (
      paymentError ||
      !payment
    ) {
      console.error(
        "Manual payment creation error:",
        paymentError
      );

      return NextResponse.json(
        {
          error:
            "Unable to submit the payment for verification.",
        },
        { status: 500 }
      );
    }

    // Save order reference on membership
    await adminSupabase
      .from("memberships")
      .update({
        payment_reference:
          orderId,
      })
      .eq(
        "id",
        membership.id
      );

    return NextResponse.json({
      success: true,

      message:
        "Payment details submitted successfully and are pending verification.",

      payment: {
        id:
          payment.id,

        orderId:
          payment.order_id,

        amount:
          payment.amount,

        status:
          payment.payment_status,
      },
    });
  } catch (error) {
    console.error(
      "Manual payment submission error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unexpected error while submitting payment.",
      },
      { status: 500 }
    );
  }
}