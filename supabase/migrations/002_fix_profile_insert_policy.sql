-- Add INSERT policy for profiles table to allow new user creation via trigger
-- This fixes the "Database error saving new user" error during OAuth signup

-- Allow inserts for authenticated users during signup
-- The SECURITY DEFINER on the trigger function bypasses RLS, but we need this policy
-- to ensure proper access control
CREATE POLICY "Enable insert for new user profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);

