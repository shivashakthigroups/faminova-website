import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Check Authorization header
    // --------------------------------------------------

    const authorization =
      request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const accessToken =
      authorization.replace("Bearer ", "");

    // --------------------------------------------------
    // 2. Environment variables
    // --------------------------------------------------

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
      console.error(
        "Manual payment server configuration missing."
      );

      return NextResponse.json(
        {
          error:
            "Server configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 3. Verify logged-in user
    // --------------------------------------------------

    const userSupabase =
      createClient(
        supabaseUrl,
        publishableKey
      );

    const {
      data: { user },
      error: userError,
    } =
      await userSupabase.auth.getUser(
        accessToken
      );

    if (userError || !user) {
      console.error(
        "User verification error:",
        userError
      );

      return NextResponse.json(
        {
          error:
            "Invalid or expired login session.",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // 4. Read submitted data
    // --------------------------------------------------

    const body =
      await request.json();

    const planId =
      String(body?.planId || "")
        .trim();

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

    if (!utr) {
      return NextResponse.json(
        {
          error:
            "UPI Transaction ID / UTR is required.",
        },
        { status: 400 }
      );
    }

    if (utr.length < 6) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid UPI Transaction ID / UTR.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 5. Server-only Supabase client
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 6. Check selected membership plan
    // --------------------------------------------------

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
        .eq(
          "id",
          planId
        )
        .eq(
          "active",
          true
        )
        .single();

    if (
      planError ||
      !plan
    ) {
      console.error(
        "Membership plan lookup error:",
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
            "Invalid membership amount.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 7. Check if this UTR was already submitted
    // --------------------------------------------------

    const {
      data: existingPayment,
      error: existingPaymentError,
    } =
      await adminSupabase
        .from("manual_payments")
        .select(
          `
          id,
          order_id,
          payment_status
          `
        )
        .eq(
          "utr",
          utr
        )
        .maybeSingle();

    if (existingPaymentError) {
      console.error(
        "Duplicate UTR lookup error:",
        existingPaymentError
      );

      return NextResponse.json(
        {
          error:
            "Unable to validate the payment reference.",
        },
        { status: 500 }
      );
    }

    if (existingPayment) {
      return NextResponse.json(
        {
          error:
            "This UPI Transaction ID / UTR has already been submitted.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // 8. Check for existing pending/submitted payment
    // --------------------------------------------------

    const {
      data: existingPendingPayment,
      error: pendingPaymentError,
    } =
      await adminSupabase
        .from("manual_payments")
        .select(
          `
          id,
          order_id,
          payment_status,
          membership_id
          `
        )
        .eq(
          "user_id",
          user.id
        )
        .in(
          "payment_status",
          [
            "pending",
            "submitted",
          ]
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        )
        .limit(1)
        .maybeSingle();

    if (pendingPaymentError) {
      console.error(
        "Pending payment lookup error:",
        pendingPaymentError
      );

      return NextResponse.json(
        {
          error:
            "Unable to check existing payment requests.",
        },
        { status: 500 }
      );
    }

    if (existingPendingPayment) {
      return NextResponse.json(
        {
          error:
            "You already have a payment awaiting verification. Please wait for it to be approved or rejected before submitting another payment.",
          existingOrderId:
            existingPendingPayment.order_id,
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // 9. Create pending membership
    // --------------------------------------------------

    const {
      data: membership,
      error: membershipError,
    } =
      await adminSupabase
        .from("memberships")
        .insert({
          user_id:
            user.id,

          plan_id:
            plan.id,

          status:
            "pending",

          payment_status:
            "created",
        })
        .select(
          `
          id,
          user_id,
          plan_id,
          status,
          payment_status
          `
        )
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

    // --------------------------------------------------
    // 10. Generate unique FamiNova order ID
    // --------------------------------------------------

    const orderId =
      "FAMI-UPI-" +
      membership.id
        .replace(/-/g, "")
        .substring(0, 16)
        .toUpperCase();

    // --------------------------------------------------
    // 11. Save payment reference on membership
    // --------------------------------------------------

    const {
      error: membershipReferenceError,
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
        );

    if (membershipReferenceError) {
      console.error(
        "Membership payment reference error:",
        membershipReferenceError
      );

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
            "Unable to create the payment reference.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 12. Create manual payment
    // --------------------------------------------------

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
          `
          id,
          order_id,
          amount,
          utr,
          payment_status,
          submitted_at
          `
        )
        .single();

    // --------------------------------------------------
    // 13. Handle duplicate UTR/database error
    // --------------------------------------------------

    if (
      paymentError ||
      !payment
    ) {
      console.error(
        "Manual payment creation error:",
        paymentError
      );

      // Remove the orphan membership if
      // payment creation failed.
      await adminSupabase
        .from("memberships")
        .delete()
        .eq(
          "id",
          membership.id
        );

      if (
        paymentError?.code ===
        "23505"
      ) {
        return NextResponse.json(
          {
            error:
              "This UPI Transaction ID / UTR has already been submitted.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          error:
            "Unable to submit the payment for verification.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 14. Success
    // --------------------------------------------------

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

        utr:
          payment.utr,

        status:
          payment.payment_status,

        submittedAt:
          payment.submitted_at,
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
          "Unexpected error while submitting the payment.",
      },
      { status: 500 }
    );
  }
}