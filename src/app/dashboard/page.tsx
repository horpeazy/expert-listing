"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Eye, MessageSquare, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

export default function DashboardPage() {
  const { profile, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  const stats = [
    { title: "Total Listings", value: "0", icon: Home, color: "text-blue-600" },
    { title: "Total Views", value: "0", icon: Eye, color: "text-green-600" },
    { title: "Inquiries", value: "0", icon: MessageSquare, color: "text-purple-600" },
    { title: "Bookings", value: "0", icon: Calendar, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || "User"}!</h1>
          <p className="text-slate-600 mt-1">Here's what's happening with your properties</p>
        </div>
        <Link href="/dashboard/listings/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 text-center py-8">
            No recent activity to display
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

