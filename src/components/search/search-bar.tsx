"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { POPULAR_LOCATIONS } from "@/data/nigerian-states";
import { PROPERTY_TYPES } from "@/lib/constants";

export function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [transactionType, setTransactionType] = useState<"sale" | "rent">("sale");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (location) params.set("search", location);
    if (transactionType) params.set("transaction_type", transactionType);
    if (propertyType) params.set("property_type", propertyType);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="md:col-span-2">
          <Input
            placeholder="Enter city or area (e.g., Lekki, Lagos)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12"
          />
        </div>

        {/* Transaction Type */}
        <div>
          <Select value={transactionType} onValueChange={(value: "sale" | "rent") => setTransactionType(value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Buy or Rent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div>
          <Button onClick={handleSearch} className="w-full h-12" size="lg">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Popular Locations */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-slate-600">Popular:</span>
        {POPULAR_LOCATIONS.slice(0, 5).map((loc) => (
          <button
            key={`${loc.state}-${loc.city}`}
            onClick={() => {
              setLocation(`${loc.city}, ${loc.state}`);
            }}
            className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {loc.city}
          </button>
        ))}
      </div>
    </div>
  );
}

