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

  const supabase = createClient(
    supabaseUrl,
    publishableKey
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  
  console.log("LIVE LOGGED USER:", user?.email);
console.log("LIVE ADMIN EMAIL:", process.env.ADMIN_EMAIL);

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

export async function GET(request: Request) {
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

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          error:
            "Server configuration is incomplete.",
        },
        { status: 500 }
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
      data: payments,
      error,
    } = await adminSupabase
      .from("manual_payments")
      .select(
        `
        id,
        user_id,
        membership_id,
        order_id,
        amount,
        utr,
        payment_status,
        submitted_at,
        verified_at,
        admin_note,
        created_at
        `
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Admin payments error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Unable to load payments.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      payments: payments ?? [],
    });
  } catch (error) {
    console.error(
      "Admin payments route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unexpected error loading payments.",
      },
      { status: 500 }
    );
  }
}