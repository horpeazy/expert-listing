-- Seed 10 Properties for Home Plug Realty
-- Run this in Supabase SQL Editor

DO $$
DECLARE
  test_user_id UUID := '12345678-1234-1234-1234-123456789012';
BEGIN
  -- User already exists, just clean up old properties and add new ones
  -- Delete existing properties to start fresh
  DELETE FROM property_images WHERE property_id IN (SELECT id FROM properties WHERE user_id = test_user_id);
  DELETE FROM properties WHERE user_id = test_user_id;

  -- Step 4: Insert 10 diverse properties
  INSERT INTO properties (
    user_id, title, slug, description, property_type, transaction_type,
    price, bedrooms, bathrooms, area_sqm, address, city, state,
    latitude, longitude, features, is_featured, status
  ) VALUES
  
  -- Property 1: Luxury Duplex in Lekki (Featured)
  (
    test_user_id,
    'Luxury 4 Bedroom Duplex in Lekki Phase 1',
    'luxury-4-bedroom-duplex-lekki-phase-1',
    'Stunning modern duplex with panoramic views of Lekki. Features include a spacious living area, modern kitchen with appliances, en-suite bedrooms, swimming pool, and 24/7 security. Perfect for executives and families.',
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
    '["Swimming Pool", "Security", "Parking Space", "Garden", "Modern Kitchen", "Air Conditioning"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 2: Apartment in Victoria Island (Featured)
  (
    test_user_id,
    '3 Bedroom Serviced Apartment in Victoria Island',
    '3-bedroom-serviced-apartment-victoria-island',
    'Premium serviced apartment in the heart of Victoria Island. Close to shopping malls, restaurants, and business districts. Features air conditioning, fitted kitchen, gym access, and 24-hour power supply.',
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
    '["Air Conditioning", "Gym", "24hr Power", "Security", "Fitted Kitchen", "Swimming Pool"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 3: Mansion in Banana Island (Featured)
  (
    test_user_id,
    '5 Bedroom Waterfront Mansion in Banana Island',
    '5-bedroom-waterfront-mansion-banana-island',
    'Exclusive waterfront mansion on Banana Island. This architectural masterpiece features a private jetty, infinity pool, home cinema, wine cellar, smart home automation, and breathtaking lagoon views.',
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
    '["Swimming Pool", "Private Jetty", "Home Cinema", "Wine Cellar", "Smart Home", "Garden", "Security", "Air Conditioning"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 4: Apartment in Ikeja
  (
    test_user_id,
    'Modern 2 Bedroom Flat in Ikeja GRA',
    'modern-2-bedroom-flat-ikeja-gra',
    'Newly built 2 bedroom apartment in a secure estate at Ikeja GRA. Perfect for young professionals. Features include ample parking, 24hr power supply, and proximity to Ikeja City Mall and business hubs.',
    'apartment',
    'rent',
    1800000,
    2,
    2,
    120,
    'Oregun Road, Ikeja GRA',
    'Ikeja',
    'Lagos',
    6.5964,
    3.3515,
    '["24hr Power", "Security", "Parking Space", "Modern Fittings", "Air Conditioning"]'::jsonb,
    false,
    'approved'
  ),
  
  -- Property 5: Studio in Yaba
  (
    test_user_id,
    'Compact Studio Apartment in Yaba',
    'compact-studio-apartment-yaba',
    'Affordable studio apartment perfect for students or young professionals. Located in the vibrant Yaba area, close to universities, tech hubs, and entertainment spots. Fully furnished with modern amenities.',
    'studio',
    'rent',
    800000,
    1,
    1,
    45,
    'Herbert Macaulay Way',
    'Yaba',
    'Lagos',
    6.5074,
    3.3777,
    '["Furnished", "24hr Power", "Security", "Internet Access"]'::jsonb,
    false,
    'approved'
  ),
  
  -- Property 6: Duplex in Ajah (Featured)
  (
    test_user_id,
    'Spacious 3 Bedroom Duplex in Ajah',
    'spacious-3-bedroom-duplex-ajah',
    'Beautiful semi-detached duplex in a gated estate in Ajah. Features spacious rooms, modern kitchen, balcony, and dedicated parking. Close to schools, markets, and the Lekki-Epe Expressway.',
    'semi_detached',
    'sale',
    35000000,
    3,
    4,
    220,
    'Lekki-Epe Expressway, Ajah',
    'Ajah',
    'Lagos',
    6.4698,
    3.5852,
    '["Security", "Parking Space", "Modern Kitchen", "Balcony", "Air Conditioning"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 7: Penthouse in Ikoyi (Featured)
  (
    test_user_id,
    'Luxury 4 Bedroom Penthouse in Ikoyi',
    'luxury-4-bedroom-penthouse-ikoyi',
    'Ultra-modern penthouse with panoramic city views. Features include floor-to-ceiling windows, private terrace, jacuzzi, state-of-the-art kitchen, and premium finishes throughout. Located in exclusive Ikoyi neighborhood.',
    'apartment',
    'sale',
    250000000,
    4,
    5,
    320,
    'Bourdillon Road',
    'Ikoyi',
    'Lagos',
    6.4550,
    3.4350,
    '["Swimming Pool", "Gym", "Jacuzzi", "Private Terrace", "24hr Power", "Smart Home", "Air Conditioning", "Security"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 8: Detached House in Magodo
  (
    test_user_id,
    '4 Bedroom Detached House in Magodo Phase 2',
    '4-bedroom-detached-house-magodo-phase-2',
    'Well-maintained detached bungalow in a serene environment. Features spacious compound, BQ, modern fittings, and ample parking. Perfect for families seeking comfort and tranquility.',
    'detached',
    'rent',
    4500000,
    4,
    4,
    280,
    'Magodo Phase 2',
    'Magodo',
    'Lagos',
    6.5810,
    3.3730,
    '["Security", "Parking Space", "Garden", "BQ", "Modern Kitchen", "Air Conditioning"]'::jsonb,
    false,
    'approved'
  ),
  
  -- Property 9: Apartment in Surulere
  (
    test_user_id,
    '2 Bedroom Apartment in Surulere',
    '2-bedroom-apartment-surulere',
    'Cozy 2 bedroom apartment in the heart of Surulere. Walking distance to National Stadium, shopping centers, and public transport. Ideal for small families or working professionals.',
    'apartment',
    'rent',
    1200000,
    2,
    2,
    95,
    'Adeniran Ogunsanya Street',
    'Surulere',
    'Lagos',
    6.4969,
    3.3614,
    '["Security", "Parking Space", "Modern Fittings"]'::jsonb,
    false,
    'approved'
  ),
  
  -- Property 10: Terrace in Lekki (Featured)
  (
    test_user_id,
    'Contemporary 3 Bedroom Terrace in Lekki Phase 2',
    'contemporary-3-bedroom-terrace-lekki-phase-2',
    'Brand new terrace duplex in a beautiful estate. Features modern architecture, smart home system, fitted kitchen, swimming pool, gym, and 24-hour power. Close to schools and shopping centers.',
    'semi_detached',
    'sale',
    68000000,
    3,
    4,
    210,
    'Lekki Phase 2',
    'Lekki',
    'Lagos',
    6.4393,
    3.5515,
    '["Swimming Pool", "Gym", "Smart Home", "24hr Power", "Security", "Modern Kitchen", "Air Conditioning", "Parking Space"]'::jsonb,
    true,
    'approved'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Step 5: Add images for all properties
  INSERT INTO property_images (property_id, url, storage_path, is_primary)
  SELECT
    id,
    CASE
      WHEN title LIKE '%Lekki Phase 1%' THEN 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
      WHEN title LIKE '%Victoria Island%' THEN 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
      WHEN title LIKE '%Banana Island%' THEN 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
      WHEN title LIKE '%Ikeja%' THEN 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
      WHEN title LIKE '%Yaba%' THEN 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
      WHEN title LIKE '%Ajah%' THEN 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800'
      WHEN title LIKE '%Penthouse%' THEN 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
      WHEN title LIKE '%Magodo%' THEN 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'
      WHEN title LIKE '%Surulere%' THEN 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      WHEN title LIKE '%Lekki Phase 2%' THEN 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
      ELSE 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    END,
    'external/' || id || '/primary.jpg',
    true
  FROM properties
  WHERE user_id = test_user_id
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Successfully created test user and % properties', (SELECT COUNT(*) FROM properties WHERE user_id = test_user_id);

END $$;

-- Verify the data
SELECT
  'Total Properties:' as info,
  COUNT(*)::text as count
FROM properties
UNION ALL
SELECT
  'Featured Properties:',
  COUNT(*)::text
FROM properties
WHERE is_featured = true
UNION ALL
SELECT
  'For Sale:',
  COUNT(*)::text
FROM properties
WHERE transaction_type = 'sale'
UNION ALL
SELECT
  'For Rent:',
  COUNT(*)::text
FROM properties
WHERE transaction_type = 'rent';

-- Show all properties
SELECT
  title,
  city,
  property_type,
  transaction_type,
  to_char(price, 'FM₦999,999,999') as price,
  bedrooms,
  bathrooms,
  is_featured,
  status
FROM properties
ORDER BY is_featured DESC, created_at DESC;

