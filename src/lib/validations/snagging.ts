import { z } from "zod";

export const snaggingBookingSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^(\+234|0)[789]\d{9}$/, "Invalid Nigerian phone number"),
  property_address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  package_type: z.enum(["basic", "standard", "premium"]),
  preferred_date: z.string().optional(),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
});

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^(\+234|0)[789]\d{9}$/, "Invalid Nigerian phone number").optional(),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000, "Message must be less than 2000 characters"),
});

export type SnaggingBookingFormData = z.infer<typeof snaggingBookingSchema>;
export type InquiryFormData = z.infer<typeof inquirySchema>;

