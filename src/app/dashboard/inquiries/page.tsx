import { Card, CardContent } from "@/components/ui/card";

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inquiries</h1>
        <p className="text-slate-600 mt-1">Manage inquiries from potential buyers</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-slate-600 py-12">
            No inquiries yet
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

