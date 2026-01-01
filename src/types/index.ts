export type UserRole = "user" | "agent" | "admin";

export type PropertyType =
  | "studio"
  | "apartment"
  | "detached"
  | "semi_detached"
  | "terrace"
  | "land"
  | "bungalow"
  | "maisonette";

export type TransactionType = "sale" | "rent";

export type PropertyStatus = "pending" | "approved" | "rejected" | "sold" | "rented";

export type SnaggingPackage = "basic" | "standard" | "premium";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type InquiryStatus = "new" | "read" | "responded" | "closed";

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  description?: string;
  property_type: PropertyType;
  transaction_type: TransactionType;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area_sqm?: number;
  address: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  features?: string[];
  status: PropertyStatus;
  is_featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  images?: PropertyImage[];
  user?: Profile;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  storage_path: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface Inquiry {
  id: string;
  property_id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
  property?: Property;
}

export interface SnaggingBooking {
  id: string;
  user_id?: string;
  full_name: string;
  email: string;
  phone: string;
  property_address: string;
  city: string;
  state: string;
  package_type: SnaggingPackage;
  preferred_date?: string;
  notes?: string;
  status: BookingStatus;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  search?: string;
  transaction_type?: TransactionType;
  property_type?: PropertyType[];
  city?: string;
  state?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  sort?: "newest" | "price_low_to_high" | "price_high_to_low";
  page?: number;
  limit?: number;
}

