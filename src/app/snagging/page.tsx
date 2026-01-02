"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PackageCards } from "@/components/snagging/package-cards";
import { BookingForm } from "@/components/snagging/booking-form";
import { FAQ } from "@/components/snagging/faq";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, ClipboardCheck, FileText, Calendar } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/reveal";

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
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-32 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-playfair leading-tight">
                Professional Property Snagging Services
              </h1>
            </motion.div>
            <motion.p
              className="text-xl text-emerald-50 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Protect your investment with expert property inspections. We catch the defects before you move in.
            </motion.p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-playfair gradient-text">
                How It Works
              </h2>
            </FadeIn>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Calendar, title: "Book Inspection", description: "Choose your package and schedule", color: "emerald" },
                { icon: ClipboardCheck, title: "Expert Assessment", description: "Professional inspection of your property", color: "gold" },
                { icon: FileText, title: "Detailed Report", description: "Receive comprehensive findings", color: "emerald" },
                { icon: CheckCircle2, title: "Get It Fixed", description: "Present report to developer", color: "gold" },
              ].map((step, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="text-center relative"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative ${
                        step.color === "emerald" ? "bg-emerald-500/10" : "bg-gold/10"
                      }`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className={`w-10 h-10 ${
                        step.color === "emerald" ? "text-emerald-500" : "text-gold"
                      }`} />
                    </motion.div>
                    <h3 className="font-semibold text-xl mb-3 text-white">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent" />
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Packages */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair gradient-text">
                  Choose Your Package
                </h2>
                <p className="text-lg text-slate-400">
                  Select the inspection level that suits your needs
                </p>
              </div>
            </FadeIn>
            <PackageCards onSelectPackage={handleSelectPackage} />
          </div>
        </section>

        {/* FAQ */}
        <FAQ />
      </main>

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

