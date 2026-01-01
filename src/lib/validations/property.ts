import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(200, "Title must be less than 200 characters"),
  description: z.string().min(50, "Description must be at least 50 characters").max(5000, "Description must be less than 5000 characters").optional(),
  property_type: z.enum(["studio", "apartment", "detached", "semi_detached", "terrace", "land", "bungalow", "maisonette"]),
  transaction_type: z.enum(["sale", "rent"]),
  price: z.number().positive("Price must be positive"),
  bedrooms: z.number().int().min(0).max(20).optional(),
  bathrooms: z.number().int().min(0).max(20).optional(),
  area_sqm: z.number().positive().optional(),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  features: z.array(z.string()).optional(),
});

export const propertyFilterSchema = z.object({
  search: z.string().optional(),
  transaction_type: z.enum(["sale", "rent"]).optional(),
  property_type: z.array(z.enum(["studio", "apartment", "detached", "semi_detached", "terrace", "land", "bungalow", "maisonette"])).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  bedrooms: z.number().int().optional(),
  bathrooms: z.number().int().optional(),
  sort: z.enum(["newest", "price_low_to_high", "price_high_to_low"]).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
export type PropertyFilterData = z.infer<typeof propertyFilterSchema>;

