import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function getAdminUser(request: Request) {
  const authorization =
    request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token =
    authorization.replace("Bearer ", "");

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    return null;
  }

  const supabase =
    createClient(
      supabaseUrl,
      publishableKey
    );

  const {
    data: { user },
    error,
  } =
    await supabase.auth.getUser(token);

  if (error || !user) {
    return null;
  }

  const adminEmail =
    process.env.ADMIN_EMAIL?.toLowerCase();

  if (
    !adminEmail ||
    user.email?.toLowerCase() !== adminEmail
  ) {
    return null;
  }

  return user;
}

export async function POST(request: Request) {
  try {
    const admin =
      await getAdminUser(request);

    if (!admin) {
      return NextResponse.json(
        {
          error: "Admin access required.",
        },
        { status: 403 }
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      !supabaseUrl ||
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

    const body =
      await request.json();

    const paymentId =
      body?.paymentId;

    const action =
      body?.action;

    const adminNote =
      String(body?.adminNote || "")
        .trim();

    if (
      !paymentId ||
      !["approve", "reject"].includes(action)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid payment action.",
        },
        { status: 400 }
      );
    }

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

    const {
      data: payment,
      error: paymentError,
    } =
      await adminSupabase
        .from("manual_payments")
        .select(
          `
          id,
          membership_id,
          payment_status
          `
        )
        .eq("id", paymentId)
        .single();

    if (
      paymentError ||
      !payment
    ) {
      return NextResponse.json(
        {
          error:
            "Payment record not found.",
        },
        { status: 404 }
      );
    }

    if (
      payment.payment_status ===
      "approved"
    ) {
      return NextResponse.json({
        success: true,
        message:
          "Payment already approved.",
      });
    }

    if (action === "reject") {
      const {
        error: rejectError,
      } =
        await adminSupabase
          .from("manual_payments")
          .update({
            payment_status:
              "rejected",

            verified_at:
              new Date().toISOString(),

            verified_by:
              admin.id,

            admin_note:
              adminNote || null,
          })
          .eq(
            "id",
            payment.id
          );

      if (rejectError) {
        return NextResponse.json(
          {
            error:
              "Unable to reject payment.",
          },
          { status: 500 }
        );
      }

      await adminSupabase
        .from("memberships")
        .update({
          status:
            "cancelled",

          payment_status:
            "failed",
        })
        .eq(
          "id",
          payment.membership_id
        );

      return NextResponse.json({
        success: true,
        message:
          "Payment rejected.",
      });
    }

    // -----------------------------
    // APPROVE
    // -----------------------------

    const {
      data: membership,
      error: membershipError,
    } =
      await adminSupabase
        .from("memberships")
        .select(
          "id, plan_id"
        )
        .eq(
          "id",
          payment.membership_id
        )
        .single();

    if (
      membershipError ||
      !membership
    ) {
      return NextResponse.json(
        {
          error:
            "Membership record not found.",
        },
        { status: 404 }
      );
    }

    const {
      data: plan,
      error: planError,
    } =
      await adminSupabase
        .from("membership_plans")
        .select(
          "duration_months"
        )
        .eq(
          "id",
          membership.plan_id
        )
        .single();

    if (
      planError ||
      !plan
    ) {
      return NextResponse.json(
        {
          error:
            "Membership plan not found.",
        },
        { status: 404 }
      );
    }

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

    const {
      error: membershipUpdateError,
    } =
      await adminSupabase
        .from("memberships")
        .update({
          status:
            "active",

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
        );

    if (
      membershipUpdateError
    ) {
      return NextResponse.json(
        {
          error:
            "Unable to activate membership.",
        },
        { status: 500 }
      );
    }

    const {
      error: paymentUpdateError,
    } =
      await adminSupabase
        .from("manual_payments")
        .update({
          payment_status:
            "approved",

          verified_at:
            startedAt.toISOString(),

          verified_by:
            admin.id,

          admin_note:
            adminNote || null,
        })
        .eq(
          "id",
          payment.id
        );

    if (
      paymentUpdateError
    ) {
      return NextResponse.json(
        {
          error:
            "Membership activated, but payment record update failed.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,

      message:
        "Payment approved and membership activated.",
    });
  } catch (error) {
    console.error(
      "Manual payment action error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unexpected admin payment error.",
      },
      { status: 500 }
    );
  }
}