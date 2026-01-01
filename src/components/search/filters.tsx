"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PROPERTY_TYPES, BEDROOMS_OPTIONS, BATHROOMS_OPTIONS } from "@/lib/constants";
import { NIGERIAN_STATES } from "@/data/nigerian-states";
import { Separator } from "@/components/ui/separator";

interface FiltersProps {
  filters: {
    search?: string;
    transaction_type?: "sale" | "rent";
    property_type?: string[];
    state?: string;
    city?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    bathrooms?: number;
  };
  onChange: (filters: any) => void;
  onReset: () => void;
}

export function Filters({ filters, onChange, onReset }: FiltersProps) {
  const selectedState = NIGERIAN_STATES.find((s) => s.name === filters.state);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Filters</h3>
      </div>

      {/* Transaction Type */}
      <div>
        <Label>Transaction Type</Label>
        <Select
          value={filters.transaction_type}
          onValueChange={(value) =>
            onChange({ ...filters, transaction_type: value as "sale" | "rent" })
          }
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Buy or Rent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Location */}
      <div>
        <Label>State</Label>
        <Select
          value={filters.state}
          onValueChange={(value) =>
            onChange({ ...filters, state: value, city: undefined })
          }
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {NIGERIAN_STATES.map((state) => (
              <SelectItem key={state.name} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedState && (
        <div>
          <Label>City</Label>
          <Select
            value={filters.city}
            onValueChange={(value) => onChange({ ...filters, city: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {selectedState.cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Separator />

      {/* Price Range */}
      <div>
        <Label>Price Range</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.min_price || ""}
            onChange={(e) =>
              onChange({
                ...filters,
                min_price: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.max_price || ""}
            onChange={(e) =>
              onChange({
                ...filters,
                max_price: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div>
        <Label>Bedrooms</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {BEDROOMS_OPTIONS.map((num) => (
            <Button
              key={num}
              variant={filters.bedrooms === num ? "default" : "outline"}
              size="sm"
              onClick={() =>
                onChange({
                  ...filters,
                  bedrooms: filters.bedrooms === num ? undefined : num,
                })
              }
            >
              {num}+
            </Button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <Label>Bathrooms</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {BATHROOMS_OPTIONS.slice(0, 5).map((num) => (
            <Button
              key={num}
              variant={filters.bathrooms === num ? "default" : "outline"}
              size="sm"
              onClick={() =>
                onChange({
                  ...filters,
                  bathrooms: filters.bathrooms === num ? undefined : num,
                })
              }
            >
              {num}+
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Property Types */}
      <div>
        <Label className="mb-3 block">Property Type</Label>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={type.value}
                checked={filters.property_type?.includes(type.value)}
                onCheckedChange={(checked) => {
                  const current = filters.property_type || [];
                  onChange({
                    ...filters,
                    property_type: checked
                      ? [...current, type.value]
                      : current.filter((t) => t !== type.value),
                  });
                }}
              />
              <label
                htmlFor={type.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Reset Button */}
      <Button variant="outline" className="w-full" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  );
}

