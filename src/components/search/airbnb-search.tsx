"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { POPULAR_LOCATIONS } from "@/data/nigerian-states";

const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment", featured: true },
  { value: "detached", label: "House", featured: true },
  { value: "studio", label: "Studio", featured: true },
  { value: "semi_detached", label: "Duplex", featured: false },
  { value: "commercial", label: "Commercial", featured: false },
  { value: "land", label: "Land", featured: false },
];

const PRICE_PRESETS = [
  { label: "Under ₦5M", min: 0, max: 5000000 },
  { label: "₦5M - ₦20M", min: 5000000, max: 20000000 },
  { label: "₦20M - ₦50M", min: 20000000, max: 50000000 },
  { label: "Above ₦50M", min: 50000000, max: null },
];

export function AirbnbSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isExpanded] = useState(false); // Always collapsed
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveSection(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("search", location);
    if (propertyType) params.set("property_type", propertyType);
    if (minPrice) params.set("min_price", minPrice);
    if (maxPrice) params.set("max_price", maxPrice);
    
    router.push(`/properties?${params.toString()}`);
    setActiveSection(null);
  };

  const handleLocationSelect = (city: string, state: string) => {
    setLocation(`${city}, ${state}`);
    setActiveSection(null);
  };

  const handlePropertyTypeSelect = (value: string) => {
    setPropertyType(value);
    setActiveSection(null);
  };

  const handlePricePreset = (min: number, max: number | null) => {
    setMinPrice(min.toString());
    setMaxPrice(max ? max.toString() : "");
    setActiveSection(null);
  };

  const getPropertyTypeLabel = () => {
    const type = PROPERTY_TYPES.find(t => t.value === propertyType);
    return type ? type.label : "Property type";
  };

  const getPriceLabel = () => {
    if (!minPrice && !maxPrice) return "Add budget";
    if (minPrice && !maxPrice) return `Above ₦${(parseInt(minPrice) / 1000000).toFixed(1)}M`;
    if (!minPrice && maxPrice) return `Under ₦${(parseInt(maxPrice) / 1000000).toFixed(1)}M`;
    return `₦${(parseInt(minPrice) / 1000000).toFixed(1)}M - ₦${(parseInt(maxPrice) / 1000000).toFixed(1)}M`;
  };

  // Always show collapsed state - Exact Airbnb CSS
  return (
    <div ref={containerRef} className="relative w-full max-w-[850px]">
      <div className="flex items-center justify-between w-full h-[66px] gap-3 bg-white border border-[#DDDDDD] rounded-[32px] hover:shadow-md transition-all pl-6 pr-2">
        {/* Where Section */}
        <button
          onClick={() => setActiveSection(activeSection === "where" ? null : "where")}
          className="flex-1 text-left"
        >
          <div className="text-xs font-semibold text-[#222222] mb-0.5">Where</div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search destinations"
            className="w-full text-sm text-[#222222] placeholder:text-[#717171] bg-transparent outline-none"
            onFocus={() => setActiveSection("where")}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-[#DDDDDD]" />

        {/* Property Type Section */}
        <button
          onClick={() => setActiveSection(activeSection === "type" ? null : "type")}
          className="flex-1 text-left"
        >
          <div className="text-xs font-semibold text-[#222222] mb-0.5">Property Type</div>
          <div className="text-sm text-[#717171]">{getPropertyTypeLabel()}</div>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-[#DDDDDD]" />

        {/* Price Section */}
        <button
          onClick={() => setActiveSection(activeSection === "price" ? null : "price")}
          className="flex-1 text-left"
        >
          <div className="text-xs font-semibold text-[#222222] mb-0.5">Price</div>
          <div className="text-sm text-[#717171]">{getPriceLabel()}</div>
        </button>

        {/* Search Button - Exact Airbnb concentric circle */}
        <button
          onClick={handleSearch}
          className="w-12 h-12 bg-[#FF385C] hover:bg-[#E31C5F] flex items-center justify-center rounded-full transition-colors flex-shrink-0 text-white"
          aria-label="Search"
        >
          <div className="flex items-center justify-center rounded-full" style={{ borderRadius: '50px' }}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'white', strokeWidth: 4, overflow: 'visible' }}>
              <path d="m20.666 20.666 10 10"></path>
              <path d="m24.0002 12.6668c0 6.2593-5.0741 11.3334-11.3334 11.3334-6.2592 0-11.3333-5.0741-11.3333-11.3334 0-6.2592 5.0741-11.3333 11.3333-11.3333 6.2593 0 11.3334 5.0741 11.3334 11.3333z" fill="none"></path>
            </svg>
          </div>
        </button>
      </div>

      {/* Where Dropdown */}
      {activeSection === "where" && (
        <div className="absolute top-full left-0 mt-3 w-[400px] bg-white rounded-[24px] shadow-2xl border border-gray-200 p-6 z-50">
          <h3 className="text-sm font-semibold text-[#222222] mb-3">Popular locations</h3>
          <div className="space-y-2">
            {POPULAR_LOCATIONS.slice(0, 6).map((loc) => (
              <button
                key={`${loc.city}-${loc.state}`}
                onClick={() => {
                  handleLocationSelect(loc.city, loc.state);
                  handleSearch();
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="text-sm font-medium text-[#222222]">{loc.city}</div>
                <div className="text-xs text-[#717171]">{loc.state}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Property Type Dropdown */}
      {activeSection === "type" && (
        <div className="absolute top-full left-1/4 mt-3 w-[360px] bg-white rounded-[24px] shadow-2xl border border-gray-200 p-6 z-50">
          {/* Featured Options - Pills */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-[#222222] mb-3">Popular</h3>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.filter(t => t.featured).map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    handlePropertyTypeSelect(type.value);
                    handleSearch();
                  }}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all ${
                    propertyType === type.value 
                      ? "bg-[#222222] text-white border-[#222222]" 
                      : "bg-white text-[#222222] border-[#DDDDDD] hover:border-[#222222]"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* All Options */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-[#717171] mb-2">All Types</h3>
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => {
                  handlePropertyTypeSelect(type.value);
                  handleSearch();
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                  propertyType === type.value ? "bg-[#F7F7F7] font-semibold" : "hover:bg-[#F7F7F7]"
                }`}
              >
                <div className="text-sm text-[#222222]">{type.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Dropdown */}
      {activeSection === "price" && (
        <div className="absolute top-full right-0 mt-3 w-[350px] bg-white rounded-[24px] shadow-2xl border border-gray-200 p-6 z-50">
          <h3 className="text-sm font-semibold text-[#222222] mb-4">Price range</h3>
          
          {/* Quick Presets */}
          <div className="space-y-2 mb-4">
            {PRICE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handlePricePreset(preset.min, preset.max);
                  handleSearch();
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="text-sm font-medium text-[#222222]">{preset.label}</div>
              </button>
            ))}
          </div>

          {/* Custom Inputs */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#717171] mb-1 block">Min</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="₦ Min"
                  className="w-full px-3 py-2 border border-[#DDDDDD] rounded-lg text-sm text-[#222222] outline-none focus:border-[#222222]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#717171] mb-1 block">Max</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="₦ Max"
                  className="w-full px-3 py-2 border border-[#DDDDDD] rounded-lg text-sm text-[#222222] outline-none focus:border-[#222222]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

