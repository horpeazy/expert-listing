import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables!");
  console.error("Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local");
  console.error("\nFound:");
  console.error("  NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓" : "✗");
  console.error("  SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✓" : "✗");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const testProperties = [
  {
    title: "Luxury 4 Bedroom Duplex in Lekki",
    slug: "luxury-4-bedroom-duplex-lekki",
    description: "Stunning modern duplex with panoramic views of Lekki. Features include a spacious living area, modern kitchen with appliances, en-suite bedrooms, swimming pool, and 24/7 security.",
    property_type: "detached",
    transaction_type: "sale",
    price: 85000000,
    bedrooms: 4,
    bathrooms: 5,
    area_sqm: 350,
    address: "Lekki Phase 1",
    city: "Lekki",
    state: "Lagos",
    latitude: 6.4474,
    longitude: 3.5423,
    features: ["Swimming Pool", "Security", "Parking Space", "Garden", "Modern Kitchen"],
    is_featured: true,
    status: "approved",
  },
  {
    title: "3 Bedroom Apartment in Victoria Island",
    slug: "3-bedroom-apartment-victoria-island",
    description: "Premium serviced apartment in the heart of Victoria Island. Close to shopping malls, restaurants, and business districts. Features air conditioning, fitted kitchen, and gym access.",
    property_type: "apartment",
    transaction_type: "rent",
    price: 3500000,
    bedrooms: 3,
    bathrooms: 3,
    area_sqm: 180,
    address: "Ahmadu Bello Way",
    city: "Victoria Island",
    state: "Lagos",
    latitude: 6.4281,
    longitude: 3.4219,
    features: ["Air Conditioning", "Gym", "24hr Power", "Security", "Fitted Kitchen"],
    is_featured: true,
    status: "approved",
  },
  {
    title: "5 Bedroom Mansion in Banana Island",
    slug: "5-bedroom-mansion-banana-island",
    description: "Exclusive waterfront mansion on Banana Island. This architectural masterpiece features a private jetty, infinity pool, home cinema, wine cellar, and smart home automation.",
    property_type: "detached",
    transaction_type: "sale",
    price: 750000000,
    bedrooms: 5,
    bathrooms: 6,
    area_sqm: 600,
    address: "Banana Island Road",
    city: "Ikoyi",
    state: "Lagos",
    latitude: 6.4474,
    longitude: 3.4366,
    features: ["Swimming Pool", "Private Jetty", "Home Cinema", "Wine Cellar", "Smart Home", "Garden", "Security"],
    is_featured: true,
    status: "approved",
  },
  {
    title: "Modern 2 Bedroom Flat in Ikeja",
    slug: "modern-2-bedroom-flat-ikeja",
    description: "Newly built 2 bedroom apartment in a secure estate. Perfect for young professionals. Features include ample parking, 24hr power supply, and proximity to Ikeja City Mall.",
    property_type: "apartment",
    transaction_type: "rent",
    price: 1800000,
    bedrooms: 2,
    bathrooms: 2,
    area_sqm: 120,
    address: "Oregun Road",
    city: "Ikeja",
    state: "Lagos",
    latitude: 6.5964,
    longitude: 3.3515,
    features: ["24hr Power", "Security", "Parking Space", "Modern Fittings"],
    is_featured: false,
    status: "approved",
  },
  {
    title: "Commercial Office Space in Abuja",
    slug: "commercial-office-space-abuja",
    description: "Premium office space in the heart of Abuja's business district. Ideal for corporate headquarters. Features include central air conditioning, elevators, backup power, and ample parking.",
    property_type: "studio",
    transaction_type: "rent",
    price: 12000000,
    bedrooms: 0,
    bathrooms: 4,
    area_sqm: 450,
    address: "Central Business District",
    city: "Abuja",
    state: "FCT",
    latitude: 9.0579,
    longitude: 7.4951,
    features: ["Central AC", "Elevators", "24hr Power", "Security", "Parking Space"],
    is_featured: false,
    status: "approved",
  },
];

const propertyImages = [
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    is_primary: true,
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    is_primary: true,
  },
  {
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    is_primary: true,
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    is_primary: true,
  },
  {
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    is_primary: true,
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...\n");

    // Check if tables exist first
    console.log("Checking database tables...");
    const { error: tableCheckError } = await supabase
      .from("properties")
      .select("id")
      .limit(1);

    if (tableCheckError && tableCheckError.message.includes("does not exist")) {
      console.error("\n❌ Error: Database tables don't exist!");
      console.error("\n📋 You need to run the database migration first:");
      console.error("   1. Go to https://supabase.com/dashboard");
      console.error("   2. Select your project");
      console.error("   3. Go to SQL Editor");
      console.error("   4. Copy and run the contents of: supabase/migrations/001_initial_schema.sql\n");
      process.exit(1);
    }

    console.log("✓ Database tables exist\n");

    // Try to get an existing user or use a placeholder
    console.log("Looking for existing users...");
    let userId: string;

    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    
    if (existingUsers && existingUsers.users && existingUsers.users.length > 0) {
      userId = existingUsers.users[0].id;
      console.log(`✓ Using existing user: ${userId}\n`);
    } else {
      // Try to create a new user
      console.log("No users found, creating test user...");
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: "test@expertlisting.ng",
        password: "Test123456!",
        email_confirm: true,
      });

      if (createError) {
        console.error("⚠️  Could not create user, using placeholder UUID");
        console.error("   You may need to manually create a user via the signup page first.\n");
        // Use a placeholder UUID - properties will be orphaned but visible
        userId = "00000000-0000-0000-0000-000000000000";
      } else {
        userId = newUser.user!.id;
        console.log(`✓ Test user created: ${userId}\n`);
      }
    }

    // Insert properties
    console.log("Inserting test properties...");
    for (let i = 0; i < testProperties.length; i++) {
      const property = { ...testProperties[i], user_id: userId };
      
      const { data: propertyData, error: propertyError } = await supabase
        .from("properties")
        .insert(property)
        .select()
        .single();

      if (propertyError) {
        console.error(`✗ Error inserting property ${i + 1}:`, propertyError);
        continue;
      }

      console.log(`✓ Created: ${propertyData.title}`);

      // Add image for this property
      if (propertyData && propertyImages[i]) {
        const { error: imageError } = await supabase
          .from("property_images")
          .insert({
            property_id: propertyData.id,
            url: propertyImages[i].url,
            is_primary: true,
          });

        if (imageError) {
          console.error(`  ✗ Error adding image:`, imageError);
        } else {
          console.log(`  ✓ Added image`);
        }
      }
    }

    console.log("\n✅ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - ${testProperties.filter(p => p.is_featured).length} featured properties`);
    console.log(`   - ${testProperties.length} total properties`);
    console.log(`   - Test user: test@expertlisting.ng (password: Test123456!)`);
    
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

