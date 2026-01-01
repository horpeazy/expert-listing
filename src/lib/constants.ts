export const APP_NAME = "Expert Listing";
export const APP_DESCRIPTION = "Find Your Perfect Home in Nigeria";

export const SNAGGING_PACKAGES = {
  basic: {
    name: "Basic",
    price: 100000,
    description: "Budget-friendly option covering the fundamentals with fast turnaround",
    turnaround: "24-48 hours",
    features: [
      "Internal Walls Inspection",
      "Windows & Doors Check",
      "Basic Plumbing Assessment",
      "Carpentry & Joinery Review",
      "Digital Report",
    ],
  },
  standard: {
    name: "Standard",
    price: 200000,
    description: "Thorough inspection of major systems with detailed documentation",
    turnaround: "2-4 days",
    popular: true,
    features: [
      "Everything in Basic",
      "Electrical Systems Check",
      "Ceiling Integrity Assessment",
      "Detailed Plumbing Inspection",
      "Photo Documentation",
      "Recommendations Report",
    ],
  },
  premium: {
    name: "Premium",
    price: 400000,
    description: "Ultimate protection with cutting-edge inspection methods",
    turnaround: "3-5 days",
    features: [
      "Everything in Standard",
      "Thermal Imaging Scan",
      "Fire Protection Assessment",
      "A/C & Ventilation Check",
      "Appliance Testing",
      "Pool Inspection (if applicable)",
      "Video Walkthrough",
      "Priority Support",
    ],
  },
} as const;

export const PROPERTY_TYPES = [
  { value: "studio", label: "Studio Apartment" },
  { value: "apartment", label: "Apartment/Flat" },
  { value: "detached", label: "Detached House" },
  { value: "semi_detached", label: "Semi-Detached House" },
  { value: "terrace", label: "Terrace House" },
  { value: "bungalow", label: "Bungalow" },
  { value: "maisonette", label: "Maisonette" },
  { value: "land", label: "Land" },
] as const;

export const TRANSACTION_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
] as const;

export const PROPERTY_FEATURES = [
  "24/7 Security",
  "Swimming Pool",
  "Gym/Fitness Center",
  "Parking Space",
  "Generator",
  "Air Conditioning",
  "Balcony",
  "Garden",
  "Boys Quarters (BQ)",
  "Serviced",
  "Waterfront",
  "Gated Estate",
  "CCTV",
  "Elevator",
  "Smart Home",
  "Solar Power",
  "Borehole",
  "Children Playground",
] as const;

export const BEDROOMS_OPTIONS = [1, 2, 3, 4, 5, 6] as const;
export const BATHROOMS_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

