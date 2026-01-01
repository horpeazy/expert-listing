import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { generateSlug } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const supabase = await createClient();

    let query = supabase
      .from("properties")
      .select(`
        *,
        images:property_images(*),
        user:profiles(*)
      `)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    // Apply filters
    const search = searchParams.get("search");
    const transaction_type = searchParams.get("transaction_type");
    const property_type = searchParams.get("property_type");
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const sort = searchParams.get("sort") || "newest";

    if (search) {
      query = query.or(`title.ilike.%${search}%,city.ilike.%${search}%,state.ilike.%${search}%`);
    }
    if (transaction_type) {
      query = query.eq("transaction_type", transaction_type);
    }
    if (property_type) {
      const types = property_type.split(",");
      query = query.in("property_type", types);
    }
    if (state) {
      query = query.eq("state", state);
    }
    if (city) {
      query = query.eq("city", city);
    }
    if (min_price) {
      query = query.gte("price", parseInt(min_price));
    }
    if (max_price) {
      query = query.lte("price", parseInt(max_price));
    }
    if (bedrooms) {
      query = query.gte("bedrooms", parseInt(bedrooms));
    }
    if (bathrooms) {
      query = query.gte("bathrooms", parseInt(bathrooms));
    }

    // Apply sorting
    if (sort === "price_low_to_high") {
      query = query.order("price", { ascending: true });
    } else if (sort === "price_high_to_low") {
      query = query.order("price", { ascending: false });
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ properties: data });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
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

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const slug = generateSlug(body.title);

    const { data, error } = await supabase
      .from("properties")
      .insert({
        ...body,
        slug,
        user_id: user.id,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ property: data }, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}

