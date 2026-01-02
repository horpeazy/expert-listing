-- Seed 15 Properties for Home Plug Realty with balanced transaction types
-- Run this in Supabase SQL Editor

DO $$
DECLARE
  test_user_id UUID := '12345678-1234-1234-1234-123456789012';
BEGIN
  -- User already exists, just clean up old properties and add new ones
  -- Delete existing properties to start fresh
  DELETE FROM property_images WHERE property_id IN (SELECT id FROM properties WHERE user_id = test_user_id);
  DELETE FROM properties WHERE user_id = test_user_id;

  -- Insert 15 diverse properties (5 sale, 5 rent, 5 shortlet)
  INSERT INTO properties (
    user_id, title, slug, description, property_type, transaction_type,
    price, bedrooms, bathrooms, area_sqm, address, city, state,
    latitude, longitude, features, is_featured, status
  ) VALUES
  
  -- SALE PROPERTIES (5)
  
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
  
  -- Property 2: Waterfront Mansion (Featured)
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
    6.4392,
    3.4242,
    '["Private Jetty", "Infinity Pool", "Home Cinema", "Wine Cellar", "Smart Home", "Generator", "24/7 Security"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 3: Duplex in Ajah
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
    'Thomas Estate',
    'Ajah',
    'Lagos',
    6.4695,
    3.5750,
    '["Gated Estate", "Parking Space", "Balcony", "Modern Kitchen", "Generator"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 4: Luxury Penthouse
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
    'Parkview Estate',
    'Ikoyi',
    'Lagos',
    6.4549,
    3.4390,
    '["Penthouse", "City Views", "Private Terrace", "Jacuzzi", "Premium Finishes", "24/7 Security", "Gym"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 5: Modern Terrace
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
    6.4623,
    3.5670,
    '["Smart Home", "Swimming Pool", "Gym", "24hr Power", "Modern Kitchen", "Parking"]'::jsonb,
    true,
    'approved'
  ),

  -- RENT PROPERTIES (5)
  
  -- Property 6: Serviced Apartment Victoria Island (Featured)
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
    6.4280,
    3.4219,
    '["Serviced", "Air Conditioning", "24hr Power", "Gym Access", "Security", "Parking"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 7: 2 Bedroom in Ikeja GRA
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
    'GRA, Ikeja',
    'Ikeja',
    'Lagos',
    6.6018,
    3.3515,
    '["24hr Power", "Security", "Parking", "Modern Kitchen", "Air Conditioning"]'::jsonb,
    false,
    'approved'
  ),
  
  -- Property 8: Studio in Yaba
  (
    test_user_id,
    'Affordable Studio Apartment in Yaba',
    'affordable-studio-apartment-yaba',
    'Affordable studio apartment perfect for students or young professionals. Located in the vibrant Yaba area, close to universities, tech hubs, and entertainment spots. Fully furnished with modern amenities.',
    'studio',
    'rent',
    600000,
    1,
    1,
    45,
    'Herbert Macaulay Way',
    'Yaba',
    'Lagos',
    6.5142,
    3.3781,
    '["Furnished", "Wi-Fi", "Air Conditioning", "Security", "Close to Tech Hubs"]'::jsonb,
    false,
    'approved'
  ),
  
  -- Property 9: Detached Bungalow
  (
    test_user_id,
    '4 Bedroom Detached Bungalow in Magodo',
    '4-bedroom-detached-bungalow-magodo',
    'Well-maintained detached bungalow in a serene environment. Features spacious compound, BQ, modern fittings, and ample parking. Perfect for families seeking comfort and tranquility.',
    'detached',
    'rent',
    2500000,
    4,
    3,
    280,
    'Magodo Phase 2',
    'Magodo',
    'Lagos',
    6.5833,
    3.3833,
    '["Boys Quarter", "Compound", "Parking Space", "Security", "Generator"]'::jsonb,
    false,
    'approved'
  ),
  
  -- Property 10: 2 Bedroom in Surulere
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
    'Bode Thomas Street',
    'Surulere',
    'Lagos',
    6.4964,
    3.3615,
    '["Parking Space", "Security", "Proximity to Transport", "Modern Kitchen"]'::jsonb,
    false,
    'approved'
  ),

  -- SHORTLET PROPERTIES (5)
  
  -- Property 11: Luxury Shortlet Victoria Island
  (
    test_user_id,
    'Luxury 2 Bedroom Shortlet in Victoria Island',
    'luxury-2-bedroom-shortlet-victoria-island',
    'Fully furnished luxury apartment available for shortlet. Perfect for business travelers and tourists. Features modern amenities, 24-hour power, high-speed WiFi, smart TV, and proximity to major business districts.',
    'apartment',
    'shortlet',
    150000,
    2,
    2,
    110,
    'Adeola Odeku Street',
    'Victoria Island',
    'Lagos',
    6.4281,
    3.4219,
    '["Fully Furnished", "24hr Power", "WiFi", "Smart TV", "Air Conditioning", "Security", "Daily Cleaning"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 12: Lekki Shortlet
  (
    test_user_id,
    '3 Bedroom Shortlet Apartment in Lekki Phase 1',
    '3-bedroom-shortlet-apartment-lekki-phase-1',
    'Beautifully furnished 3 bedroom apartment for shortlet. Ideal for families and corporate stays. Features include swimming pool access, gym, 24-hour security, and DSTV subscription.',
    'apartment',
    'shortlet',
    200000,
    3,
    3,
    150,
    'Lekki Phase 1',
    'Lekki',
    'Lagos',
    6.4474,
    3.5423,
    '["Fully Furnished", "Swimming Pool", "Gym", "24/7 Security", "DSTV", "WiFi", "Generator"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 13: Budget Shortlet Ikeja
  (
    test_user_id,
    'Comfortable 1 Bedroom Shortlet in Ikeja',
    'comfortable-1-bedroom-shortlet-ikeja',
    'Affordable and comfortable 1 bedroom apartment for shortlet. Perfect for solo travelers or couples. Located close to the airport, shopping malls, and entertainment centers.',
    'apartment',
    'shortlet',
    80000,
    1,
    1,
    65,
    'Allen Avenue',
    'Ikeja',
    'Lagos',
    6.6018,
    3.3515,
    '["Furnished", "WiFi", "Air Conditioning", "DSTV", "24hr Power", "Close to Airport"]'::jsonb,
    false,
    'approved'
  ),
  
  -- Property 14: Ikoyi Luxury Shortlet
  (
    test_user_id,
    'Premium 2 Bedroom Shortlet in Ikoyi',
    'premium-2-bedroom-shortlet-ikoyi',
    'Exquisite 2 bedroom shortlet apartment in prestigious Ikoyi. Features luxury furnishings, modern appliances, 24-hour concierge service, and stunning city views. Perfect for executive stays.',
    'apartment',
    'shortlet',
    300000,
    2,
    2,
    130,
    'Banana Island Road',
    'Ikoyi',
    'Lagos',
    6.4549,
    3.4390,
    '["Luxury Furnished", "Concierge Service", "City Views", "WiFi", "Smart Home", "24/7 Security", "Gym"]'::jsonb,
    true,
    'approved'
  ),
  
  -- Property 15: Ajah Budget Shortlet
  (
    test_user_id,
    'Cozy Studio Shortlet in Ajah',
    'cozy-studio-shortlet-ajah',
    'Neat and comfortable studio apartment for shortlet in Ajah. Ideal for budget-conscious travelers. Fully furnished with essential amenities, WiFi, and 24-hour security.',
    'studio',
    'shortlet',
    60000,
    0,
    1,
    40,
    'Badore Road',
    'Ajah',
    'Lagos',
    6.4695,
    3.5750,
    '["Furnished", "WiFi", "Air Conditioning", "Security", "24hr Power"]'::jsonb,
    false,
    'approved'
  );

  -- Step 5: Now insert property images for all 15 properties
  INSERT INTO property_images (property_id, url, is_primary, display_order)
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Luxury 4 Bedroom Duplex in Lekki Phase 1'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = '3 Bedroom Serviced Apartment in Victoria Island'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = '5 Bedroom Waterfront Mansion in Banana Island'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Modern 2 Bedroom Flat in Ikeja GRA'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Affordable Studio Apartment in Yaba'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Spacious 3 Bedroom Duplex in Ajah'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Luxury 4 Bedroom Penthouse in Ikoyi'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = '4 Bedroom Detached Bungalow in Magodo'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = '2 Bedroom Apartment in Surulere'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Contemporary 3 Bedroom Terrace in Lekki Phase 2'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Luxury 2 Bedroom Shortlet in Victoria Island'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = '3 Bedroom Shortlet Apartment in Lekki Phase 1'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Comfortable 1 Bedroom Shortlet in Ikeja'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Premium 2 Bedroom Shortlet in Ikoyi'
  
  UNION ALL
  
  SELECT 
    id as property_id,
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' as url,
    true as is_primary,
    1 as display_order
  FROM properties 
  WHERE user_id = test_user_id AND title = 'Cozy Studio Shortlet in Ajah';

END $$;

-- Verify the data was inserted
SELECT 
  'Properties created:',
  COUNT(*)::text
FROM properties;

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
WHERE transaction_type = 'rent'
UNION ALL
SELECT 
  'Shortlets:',
  COUNT(*)::text
FROM properties
WHERE transaction_type = 'shortlet';

-- Display all properties
SELECT 
  title,
  property_type,
  transaction_type,
  to_char(price, 'FM₦999,999,999') as price,
  bedrooms,
  bathrooms,
  city,
  is_featured,
  status
FROM properties
ORDER BY transaction_type, is_featured DESC, price DESC;

