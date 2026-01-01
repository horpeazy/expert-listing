import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { SNAGGING_PACKAGES } from "@/lib/constants";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let query = supabase
      .from("snagging_bookings")
      .select("*")
      .order("created_at", { ascending: false });

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // Non-admins can only see their own bookings
    if (profile?.role !== "admin") {
      query = query.eq("user_id", user.id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ bookings: data });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const body = await request.json();
    const packageInfo = SNAGGING_PACKAGES[body.package_type as keyof typeof SNAGGING_PACKAGES];

    if (!packageInfo) {
      return NextResponse.json(
        { error: "Invalid package type" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("snagging_bookings")
      .insert({
        ...body,
        user_id: user?.id,
        price: packageInfo.price,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Send confirmation email

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

