"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ShowAllProperties() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[2520px] px-4 md:px-10 lg:px-20">
        <div className="flex justify-center">
          <Link 
            href="/properties" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#FF385C] text-[#FF385C] rounded-full font-semibold hover:bg-[#FF385C] hover:text-white transition-all shadow-sm hover:shadow-md"
          >
            Show all properties
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

