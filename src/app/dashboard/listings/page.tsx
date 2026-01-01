"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Listings</h1>
          <p className="text-slate-600 mt-1">Manage your property listings</p>
        </div>
        <Link href="/dashboard/listings/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
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
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No listings yet
            </h3>
            <p className="text-slate-600 mb-6">
              Get started by adding your first property listing
            </p>
            <Link href="/dashboard/listings/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Listing
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

