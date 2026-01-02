"use client";

import { Shield, Home, Award } from "lucide-react";

export function WhyUs() {
  const features = [
    {
      icon: Shield,
      title: "Trusted & Registered",
      description: "A fully registered real estate company you can trust for all your property needs in Lagos",
    },
    {
      icon: Home,
      title: "Comprehensive Services",
      description: "Complete property solutions - rentals, sales, and professional real estate advisory",
    },
    {
      icon: Award,
      title: "Lagos Market Expertise",
      description: "Deep knowledge of Lagos property market across mainland and island areas",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 max-w-[2520px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Why choose Home Plug Realty?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for real estate in Lagos, Nigeria
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 text-center border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
