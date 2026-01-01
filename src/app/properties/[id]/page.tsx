import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin, Phone, Mail } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// This will be replaced with actual data fetching
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-600 mb-6">
            <span>Home</span> / <span>Properties</span> / <span className="text-slate-900">Property {id}</span>
          </div>

          {/* Placeholder content */}
          <div className="text-center py-20">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Property Details</h1>
              <p className="text-slate-600">
                Property ID: {id}
                <br />
                <span className="text-sm">Property details will be displayed here once API is connected</span>
              </p>
              <Button onClick={() => window.history.back()}>
                Back to Properties
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

