import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const property_id = searchParams.get("property_id");

    let query = supabase
      .from("inquiries")
      .select(`
        *,
        property:properties(*)
      `)
      .order("created_at", { ascending: false });

    if (property_id) {
      query = query.eq("property_id", property_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ inquiries: data });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
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

    const { data, error } = await supabase
      .from("inquiries")
      .insert({
        ...body,
        user_id: user?.id,
        status: "new",
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Send email notification to property owner

    return NextResponse.json({ inquiry: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    );
  }
}

