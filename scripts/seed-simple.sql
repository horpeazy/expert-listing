-- Simple Seeding Script - Creates test profile and properties
-- Run this in Supabase SQL Editor

-- Step 1: Create a dummy profile (you'll create a real user later via signup)
DO $$
DECLARE
  dummy_user_id UUID := '12345678-1234-1234-1234-123456789012';
BEGIN
  -- Insert dummy profile if it doesn't exist
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    dummy_user_id,
    'seed@expertlisting.ng',
    'Seed User',
    'user'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert properties
  INSERT INTO properties (
    user_id, title, slug, description, property_type, transaction_type,
    price, bedrooms, bathrooms, area_sqm, address, city, state,
    latitude, longitude, features, is_featured, status
  ) VALUES
  -- Property 1: Luxury Duplex in Lekki
  (
    dummy_user_id,
    'Luxury 4 Bedroom Duplex in Lekki',
    'luxury-4-bedroom-duplex-lekki',
    'Stunning modern duplex with panoramic views of Lekki. Features include a spacious living area, modern kitchen with appliances, en-suite bedrooms, swimming pool, and 24/7 security.',
    'detached',
    'sale',
    85000000,
    4,
    5,
    350,
    'Lekki Phase 1',
    'Lekki',
    'Lagos',
    6.4474,
    3.5423,
    '["Swimming Pool", "Security", "Parking Space", "Garden", "Modern Kitchen"]'::jsonb,
    true,
    'approved'
  ),
  -- Property 2: Apartment in Victoria Island
  (
    dummy_user_id,
    '3 Bedroom Apartment in Victoria Island',
    '3-bedroom-apartment-victoria-island',
    'Premium serviced apartment in the heart of Victoria Island. Close to shopping malls, restaurants, and business districts. Features air conditioning, fitted kitchen, and gym access.',
    'apartment',
    'rent',
    3500000,
    3,
    3,
    180,
    'Ahmadu Bello Way',
    'Victoria Island',
    'Lagos',
    6.4281,
    3.4219,
    '["Air Conditioning", "Gym", "24hr Power", "Security", "Fitted Kitchen"]'::jsonb,
    true,
    'approved'
  ),
  -- Property 3: Mansion in Banana Island
  (
    dummy_user_id,
    '5 Bedroom Mansion in Banana Island',
    '5-bedroom-mansion-banana-island',
    'Exclusive waterfront mansion on Banana Island. This architectural masterpiece features a private jetty, infinity pool, home cinema, wine cellar, and smart home automation.',
    'detached',
    'sale',
    750000000,
    5,
    6,
    600,
    'Banana Island Road',
    'Ikoyi',
    'Lagos',
    6.4474,
    3.4366,
    '["Swimming Pool", "Private Jetty", "Home Cinema", "Wine Cellar", "Smart Home", "Garden", "Security"]'::jsonb,
    true,
    'approved'
  ),
  -- Property 4: Apartment in Ikeja
  (
    dummy_user_id,
    'Modern 2 Bedroom Flat in Ikeja',
    'modern-2-bedroom-flat-ikeja',
    'Newly built 2 bedroom apartment in a secure estate. Perfect for young professionals. Features include ample parking, 24hr power supply, and proximity to Ikeja City Mall.',
    'apartment',
    'rent',
    1800000,
    2,
    2,
    120,
    'Oregun Road',
    'Ikeja',
    'Lagos',
    6.5964,
    3.3515,
    '["24hr Power", "Security", "Parking Space", "Modern Fittings"]'::jsonb,
    false,
    'approved'
  ),
  -- Property 5: Office Space in Abuja
  (
    dummy_user_id,
    'Commercial Office Space in Abuja',
    'commercial-office-space-abuja',
    'Premium office space in the heart of Abuja business district. Ideal for corporate headquarters. Features include central air conditioning, elevators, backup power, and ample parking.',
    'studio',
    'rent',
    12000000,
    0,
    4,
    450,
    'Central Business District',
    'Abuja',
    'FCT',
    9.0579,
    7.4951,
    '["Central AC", "Elevators", "24hr Power", "Security", "Parking Space"]'::jsonb,
    false,
    'approved'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Add images for the properties
  INSERT INTO property_images (property_id, url, storage_path, is_primary)
  SELECT 
    id,
    CASE 
      WHEN title LIKE '%Lekki%' THEN 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      WHEN title LIKE '%Victoria Island%' THEN 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
      WHEN title LIKE '%Banana Island%' THEN 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
      WHEN title LIKE '%Ikeja%' THEN 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
      ELSE 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    END,
    'external/' || id || '/primary.jpg',
    true
  FROM properties
  WHERE user_id = dummy_user_id
  ON CONFLICT DO NOTHING;

END $$;

-- Verify the data
SELECT 
  title,
  city,
  state,
  price,
  is_featured,
  status
FROM properties
ORDER BY is_featured DESC, created_at DESC;

