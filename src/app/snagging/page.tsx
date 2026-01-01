"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PackageCards } from "@/components/snagging/package-cards";
import { BookingForm } from "@/components/snagging/booking-form";
import { FAQ } from "@/components/snagging/faq";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, ClipboardCheck, FileText, Calendar } from "lucide-react";

export default function SnaggingPage() {
  const [selectedPackage, setSelectedPackage] = useState<"basic" | "standard" | "premium" | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleSelectPackage = (packageType: "basic" | "standard" | "premium") => {
    setSelectedPackage(packageType);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Property Snagging Services
            </h1>
            <p className="text-xl text-emerald-50 mb-8 max-w-3xl mx-auto">
              Protect your investment with expert property inspections. We catch the defects before you move in.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Calendar, title: "Book Inspection", description: "Choose your package and schedule" },
                { icon: ClipboardCheck, title: "Expert Assessment", description: "Professional inspection of your property" },
                { icon: FileText, title: "Detailed Report", description: "Receive comprehensive findings" },
                { icon: CheckCircle2, title: "Get It Fixed", description: "Present report to developer" },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Package</h2>
              <p className="text-lg text-slate-600">
                Select the inspection level that suits your needs
              </p>
            </div>
            <PackageCards onSelectPackage={handleSelectPackage} />
          </div>
        </section>

        {/* FAQ */}
        <FAQ />
      </main>
      <Footer />

      {/* Booking Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Your Snagging Inspection</DialogTitle>
          </DialogHeader>
          {selectedPackage && (
            <BookingForm
              selectedPackage={selectedPackage}
              onSuccess={handleBookingSuccess}
              onCancel={() => setShowBookingForm(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

