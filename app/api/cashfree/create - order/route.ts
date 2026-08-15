import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    // Get the user's Supabase access token from the request
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const accessToken = authorization.replace("Bearer ", "");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase configuration is missing." },
        { status: 500 }
      );
    }

    // Create a Supabase client using the logged-in user's token
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    // Verify the logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired login session." },
        { status: 401 }
      );
    }

    // Read membership plan from request
    const body = await request.json();
    const planId = body?.planId;

    if (!planId) {
      return NextResponse.json(
        { error: "Membership plan ID is required." },
        { status: 400 }
      );
    }

    // Get the selected plan from Supabase
    const { data: plan, error: planError } = await supabase
      .from("membership_plans")
      .select("id, name, price, duration_months")
      .eq("id", planId)
      .eq("active", true)
      .single();

    if (planError || !plan) {
      console.error("Plan lookup error:", planError);

      return NextResponse.json(
        { error: "Selected membership plan was not found." },
        { status: 404 }
      );
    }

    // Create membership record
    const { data: membership, error: membershipError } =
      await supabase
        .from("memberships")
        .insert({
          user_id: user.id,
          plan_id: plan.id,
          status: "pending",
          payment_status: "created",
        })
        .select("id")
        .single();

    if (membershipError || !membership) {
      console.error("Membership insert error:", membershipError);

      return NextResponse.json(
        { error: "Could not create membership record." },
        { status: 500 }
      );
    }

    // Create a unique Cashfree order ID
    const orderId =
      "FAMI_" +
      membership.id.replace(/-/g, "").substring(0, 20);

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    // Create Cashfree order
    const cashfreeResponse = await fetch(
      "https://sandbox.cashfree.com/pg/orders",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-version": "2025-01-01",
          "x-client-id":
            process.env.CASHFREE_CLIENT_ID!,
          "x-client-secret":
            process.env.CASHFREE_CLIENT_SECRET!,
        },

        body: JSON.stringify({
          order_id: orderId,

          order_amount: Number(plan.price),

          order_currency: "INR",

          customer_details: {
            customer_id: user.id,

            customer_email:
              user.email || "customer@example.com",

            customer_phone:
              user.user_metadata?.phone ||
              user.user_metadata?.mobile ||
              "9999999999",
          },

          order_meta: {
            return_url:
              `${baseUrl}/payment/success?order_id={order_id}`,

            notify_url:
              `${baseUrl}/api/cashfree/webhook`,
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
        "Cashfree order creation failed:",
        cashfreeData
      );

      // Mark payment as failed to create
      await supabase
        .from("memberships")
        .update({
          payment_status: "failed",
        })
        .eq("id", membership.id);

      return NextResponse.json(
        {
          error:
            cashfreeData?.message ||
            "Cashfree order creation failed.",
        },
        { status: 500 }
      );
    }

    // Save Cashfree order reference
    const { error: updateError } =
      await supabase
        .from("memberships")
        .update({
          payment_reference: orderId,
        })
        .eq("id", membership.id);

    if (updateError) {
      console.error(
        "Membership update error:",
        updateError
      );
    }

    // Return only information needed by the browser
    return NextResponse.json({
      success: true,

      orderId,

      paymentSessionId:
        cashfreeData.payment_session_id,

      membershipId: membership.id,
    });
  } catch (error) {
    console.error(
      "Cashfree create-order error:",
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