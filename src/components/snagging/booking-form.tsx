"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { snaggingBookingSchema, type SnaggingBookingFormData } from "@/lib/validations/snagging";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NIGERIAN_STATES } from "@/data/nigerian-states";
import { SNAGGING_PACKAGES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface BookingFormProps {
  selectedPackage: "basic" | "standard" | "premium";
  onSuccess: () => void;
  onCancel: () => void;
}

export function BookingForm({ selectedPackage, onSuccess, onCancel }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const packageInfo = SNAGGING_PACKAGES[selectedPackage];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SnaggingBookingFormData>({
    resolver: zodResolver(snaggingBookingSchema),
    defaultValues: {
      package_type: selectedPackage,
    },
  });

  const selectedState = watch("state");
  const stateData = NIGERIAN_STATES.find((s) => s.name === selectedState);

  const onSubmit = async (data: SnaggingBookingFormData) => {
    setLoading(true);
    try {
      // API call will be implemented
      toast.success("Booking submitted successfully! We'll contact you soon.");
      onSuccess();
    } catch (error) {
      toast.error("Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-emerald-50 p-4 rounded-lg">
        <p className="font-semibold">{packageInfo.name} Package</p>
        <p className="text-2xl font-bold text-emerald-600">{formatPrice(packageInfo.price)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            {...register("full_name")}
            disabled={loading}
          />
          {errors.full_name && (
            <p className="text-sm text-red-500 mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="08012345678"
            {...register("phone")}
            disabled={loading}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="preferred_date">Preferred Inspection Date</Label>
          <Input
            id="preferred_date"
            type="date"
            {...register("preferred_date")}
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="property_address">Property Address *</Label>
        <Input
          id="property_address"
          {...register("property_address")}
          disabled={loading}
          placeholder="Full property address"
        />
        {errors.property_address && (
          <p className="text-sm text-red-500 mt-1">{errors.property_address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="state">State *</Label>
          <Select
            onValueChange={(value) => {
              setValue("state", value);
              setValue("city", "");
            }}
            disabled={loading}
          >
            <SelectTrigger>
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
          {errors.state && (
            <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="city">City *</Label>
          <Select
            onValueChange={(value) => setValue("city", value)}
            disabled={loading || !stateData}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {stateData?.cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          {...register("notes")}
          disabled={loading}
          placeholder="Any special requirements or notes..."
          rows={4}
        />
      </div>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Submitting..." : "Confirm Booking"}
        </Button>
      </div>
    </form>
  );
}

