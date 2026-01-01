import { Card, CardContent } from "@/components/ui/card";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings Management</h1>
        <p className="text-slate-600 mt-1">Manage snagging inspection bookings</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-slate-600 py-12">
            No bookings to review
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

