import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Snagging Bookings</h1>
        <p className="text-slate-600 mt-1">Track your property inspection bookings</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-slate-600 py-12">
            No bookings yet
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

