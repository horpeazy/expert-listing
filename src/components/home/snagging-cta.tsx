"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function SnaggingCTA() {
  const features = [
    "Comprehensive property inspection",
    "Detailed report with photos",
    "Expert recommendations",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 border border-primary/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Premium Service
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Say goodbye to property surprises
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Professional property snagging that catches defects developers hope you'll miss,
                ensuring your dream home meets the highest standards.
              </p>

              <div className="space-y-3 mb-8">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/snagging">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                  >
                    Book Inspection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/snagging">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto rounded-full px-8"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-muted-foreground">
                Prices start from just <span className="font-bold text-foreground">₦100,000</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
