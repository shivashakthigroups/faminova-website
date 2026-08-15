import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    // --------------------------------------------------
    // 1. Check authentication
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

    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    const cashfreeClientId =
      process.env.CASHFREE_CLIENT_ID;

    const cashfreeClientSecret =
      process.env.CASHFREE_CLIENT_SECRET;

    if (
      !supabaseUrl ||
      !supabaseKey ||
      !cashfreeClientId ||
      !cashfreeClientSecret
    ) {
      console.error(
        "Required environment variables are missing."
      );

      return NextResponse.json(
        {
          error:
            "Payment configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 3. Create authenticated Supabase client
    // --------------------------------------------------

    const supabase = createClient(
      supabaseUrl,
      supabaseKey,
      {
        global: {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        },
      }
    );

    // --------------------------------------------------
    // 4. Verify logged-in user
    // --------------------------------------------------

    const {
      data: { user },
      error: userError,
    } =
      await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      console.error(
        "User authentication error:",
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
    // 5. Read membership plan
    // --------------------------------------------------

    const body = await request.json();

    const planId = body?.planId;

    if (!planId) {
      return NextResponse.json(
        {
          error:
            "Membership plan ID is required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 6. Get membership plan
    // --------------------------------------------------

    const {
      data: plan,
      error: planError,
    } =
      await supabase
        .from("membership_plans")
        .select(
          `
          id,
          name,
          description,
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

    // --------------------------------------------------
    // 7. Validate amount
    // --------------------------------------------------

    const amount = Number(plan.price);

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

    // --------------------------------------------------
    // 8. Create membership record
    // --------------------------------------------------

    const {
      data: membership,
      error: membershipError,
    } =
      await supabase
        .from("memberships")
        .insert({
          user_id: user.id,
          plan_id: plan.id,
          status: "pending",
          payment_status: "created",
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
        "Membership insert error:",
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
    // 9. Create Cashfree order ID
    // --------------------------------------------------

    const orderId =
      "FAMI_" +
      membership.id
        .replace(/-/g, "")
        .substring(0, 20);

    // --------------------------------------------------
    // 10. Save Cashfree order ID
    // --------------------------------------------------

    const {
      data: savedMembership,
      error: referenceError,
    } =
      await supabase
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
          `
          id,
          payment_reference
          `
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

    console.log(
      "Payment reference saved:",
      savedMembership
    );

    // --------------------------------------------------
    // 11. Website URL
    // --------------------------------------------------

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://faminova-website-8wmn.vercel.app";

    // --------------------------------------------------
    // 12. Return URL
    // --------------------------------------------------

    const returnUrl =
      `${baseUrl}/payment/success?order_id={order_id}`;

    // --------------------------------------------------
    // 13. Webhook / Notify URL
    // --------------------------------------------------

    const notifyUrl =
      `${baseUrl}/api/cashfree/webhook`;

    // --------------------------------------------------
    // 14. Create Cashfree Sandbox order
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 15. Read Cashfree response
    // --------------------------------------------------

    const cashfreeData =
      await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      console.error(
        "Cashfree order error:",
        cashfreeData
      );

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

      return NextResponse.json(
        {
          error:
            cashfreeData?.message ||
            "Cashfree order creation failed.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 16. Check payment session
    // --------------------------------------------------

    if (
      !cashfreeData.payment_session_id
    ) {
      console.error(
        "Cashfree response missing payment_session_id:",
        cashfreeData
      );

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

      return NextResponse.json(
        {
          error:
            "Cashfree did not return a payment session.",
        },
        { status: 500 }
      );
    }

    // --------------------------------------------------
    // 17. Mark payment order as created
    // --------------------------------------------------

    await supabase
      .from("memberships")
      .update({
        payment_status:
          "created",
      })
      .eq(
        "id",
        membership.id
      );

    // --------------------------------------------------
    // 18. Return payment session
    // --------------------------------------------------

    return NextResponse.json({
      success: true,

      orderId:
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