import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    // Cashfree requires the RAW request body
    // for webhook signature verification.
    const rawBody = await request.text();

    const signature = request.headers.get(
      "x-webhook-signature"
    );

    const timestamp = request.headers.get(
      "x-webhook-timestamp"
    );

    if (!signature || !timestamp) {
      console.error(
        "Cashfree webhook signature headers missing."
      );

      return NextResponse.json(
        { error: "Missing webhook signature." },
        { status: 400 }
      );
    }

    const secret =
      process.env.CASHFREE_CLIENT_SECRET;

    if (!secret) {
      console.error(
        "CASHFREE_CLIENT_SECRET is missing."
      );

      return NextResponse.json(
        { error: "Webhook configuration error." },
        { status: 500 }
      );
    }

    // Cashfree signature:
    // Base64(HMAC-SHA256(timestamp + rawBody, secret))
    const signedPayload =
      timestamp + rawBody;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(signedPayload)
        .digest("base64");

    // Constant-time comparison
    const signatureBuffer =
      Buffer.from(signature);

    const expectedBuffer =
      Buffer.from(expectedSignature);

    if (
      signatureBuffer.length !==
      expectedBuffer.length ||
      !crypto.timingSafeEqual(
        signatureBuffer,
        expectedBuffer
      )
    ) {
      console.error(
        "Invalid Cashfree webhook signature."
      );

      return NextResponse.json(
        { error: "Invalid signature." },
        { status: 401 }
      );
    }

    const payload =
      JSON.parse(rawBody);

    console.log(
      "Cashfree webhook received:",
      JSON.stringify(
        payload,
        null,
        2
      )
    );

    // --------------------------------------------------
    // Extract Cashfree information
    // --------------------------------------------------

    const orderId =
      payload?.data?.order?.order_id;

    const paymentStatus =
      payload?.data?.payment?.payment_status;

    const paymentId =
      payload?.data?.payment?.cf_payment_id;

    if (!orderId) {
      return NextResponse.json(
        {
          error:
            "Cashfree order ID missing.",
        },
        { status: 400 }
      );
    }

    console.log(
      "Cashfree order:",
      orderId
    );

    console.log(
      "Cashfree payment status:",
      paymentStatus
    );

    // --------------------------------------------------
    // Supabase server client
    // --------------------------------------------------

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      console.error(
        "Supabase server configuration missing."
      );

      return NextResponse.json(
        {
          error:
            "Supabase configuration error.",
        },
        { status: 500 }
      );
    }

    const supabase =
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
    // Find membership
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
            "Membership lookup failed.",
        },
        { status: 500 }
      );
    }

    if (!membership) {
      console.error(
        "Membership not found for order:",
        orderId
      );

      return NextResponse.json(
        {
          error:
            "Membership not found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // Successful payment
    // --------------------------------------------------

    if (
      paymentStatus === "SUCCESS"
    ) {
      // Prevent duplicate webhook processing.
      if (
        membership.status === "active" &&
        membership.payment_status ===
          "paid"
      ) {
        console.log(
          "Membership already active:",
          membership.id
        );

        return NextResponse.json({
          success: true,
          message:
            "Membership already active.",
        });
      }

      // Get membership plan
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

      if (
        planError ||
        !plan
      ) {
        console.error(
          "Plan lookup error:",
          planError
        );

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
            plan.duration_months ||
              1
          )
      );

      // Activate membership
      const {
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
        );

      if (updateError) {
        console.error(
          "Membership activation error:",
          updateError
        );

        return NextResponse.json(
          {
            error:
              "Membership activation failed.",
          },
          { status: 500 }
        );
      }

      console.log(
        "Membership activated:",
        membership.id
      );

      console.log(
        "Cashfree payment ID:",
        paymentId
      );

      return NextResponse.json({
        success: true,
        message:
          "Payment received and membership activated.",
      });
    }

    // --------------------------------------------------
    // Failed payment
    // --------------------------------------------------

    if (
      paymentStatus === "FAILED"
    ) {
      await supabase
        .from("memberships")
        .update({
          payment_status:
            "failed",
        })
        .eq(
          "id",
          membership.id
        );

      console.log(
        "Payment failed:",
        membership.id
      );

      return NextResponse.json({
        success: true,
        message:
          "Payment failure recorded.",
      });
    }

    // --------------------------------------------------
    // Pending / other events
    // --------------------------------------------------

    console.log(
      "Payment status requires no membership activation:",
      paymentStatus
    );

    return NextResponse.json({
      success: true,
      message:
        "Webhook received.",
      status:
        paymentStatus ||
        "UNKNOWN",
    });
  } catch (error) {
    console.error(
      "Cashfree webhook processing error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Webhook processing failed.",
      },
      { status: 500 }
    );
  }
}