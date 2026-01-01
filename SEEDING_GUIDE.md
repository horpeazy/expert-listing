# Database Seeding Guide 🌱

This guide will help you add test featured properties to your Supabase database.

## Prerequisites

Before running the seed script, make sure you have:

1. **Supabase Project Set Up**
2. **Environment Variables Configured** in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Database Migrations Run** - The tables should already exist in your database

## Step 1: Check Your Environment Variables

Open your `.env.local` file and ensure you have:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

You can find these values in your Supabase Dashboard:
- Go to https://supabase.com/dashboard
- Select your project
- Go to **Settings** → **API**
- Copy:
  - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - **Publishable key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **Secret key** → `SUPABASE_SERVICE_ROLE_KEY`

## Step 2: Run Database Migrations (If Not Done Already)

If you haven't run the migrations yet:

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

Or manually run the migration in your Supabase SQL Editor:
- Go to **SQL Editor** in Supabase Dashboard
- Copy contents from `supabase/migrations/001_initial_schema.sql`
- Paste and run

## Step 3: Run the Seeding Script

```bash
npm run seed
```

This will create:
- ✅ **3 Featured Properties** (will show on homepage)
  - Luxury 4 Bedroom Duplex in Lekki (₦85M)
  - 3 Bedroom Apartment in Victoria Island (₦3.5M/year)
  - 5 Bedroom Mansion in Banana Island (₦750M)

- ✅ **2 Regular Properties**
  - Modern 2 Bedroom Flat in Ikeja
  - Commercial Office Space in Abuja

- ✅ **Test User Account**
  - Email: `test@expertlisting.ng`
  - Password: `Test123456!`

## Step 4: Verify the Data

After seeding, you can verify the data:

### Option 1: Check in Supabase Dashboard
- Go to **Table Editor** in Supabase
- View the `properties` table
- You should see 5 properties, 3 marked as featured

### Option 2: Check Your Website
- Go to http://localhost:3001
- Scroll to "Featured Properties" section
- You should see 3 property cards displayed

## Troubleshooting

### Error: "Missing Supabase environment variables"
**Solution**: Make sure your `.env.local` file has all three required variables

### Error: "relation properties does not exist"
**Solution**: You need to run the database migrations first (see Step 2)

### Error: "User already registered"
**Solution**: This is fine! The script will reuse the existing test user

### Properties not showing on website
**Solution**: 
1. Check that properties have `status: "approved"`
2. Check that properties have `is_featured: true`
3. Refresh your browser (clear cache if needed)

## Adding More Properties

You can run the seed script multiple times, or modify `scripts/seed-properties.ts` to add more test properties.

### Quick Add Template

```typescript
{
  title: "Your Property Title",
  slug: "your-property-title",
  description: "Property description...",
  property_type: "detached", // detached, semi_detached, terrace, flat, apartment, commercial
  transaction_type: "sale", // sale or rent
  price: 50000000,
  bedrooms: 3,
  bathrooms: 3,
  toilets: 4,
  area_sqm: 200,
  address: "Full address",
  city: "City name",
  state: "Lagos", // Lagos, FCT, etc.
  latitude: 6.5244,
  longitude: 3.3792,
  features: ["Feature 1", "Feature 2"],
  is_featured: true, // true for featured, false for regular
  status: "approved", // Must be "approved" to show on site
}
```

## Cleaning Up Test Data

To remove all test properties:

```sql
-- Run in Supabase SQL Editor
DELETE FROM property_images WHERE property_id IN (
  SELECT id FROM properties WHERE user_id = (
    SELECT id FROM auth.users WHERE email = 'test@expertlisting.ng'
  )
);

DELETE FROM properties WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'test@expertlisting.ng'
);
```

---

**Need Help?** Check the main README.md or PREMIUM_DESIGN_COMPLETE.md for more information.

