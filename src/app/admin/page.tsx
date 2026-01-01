import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Calendar, Eye } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Properties", value: "0", icon: Home, color: "text-blue-600" },
    { title: "Pending Approval", value: "0", icon: Eye, color: "text-orange-600" },
    { title: "Total Users", value: "0", icon: Users, color: "text-green-600" },
    { title: "Pending Bookings", value: "0", icon: Calendar, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-600 mt-1">Manage your platform</p>
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

