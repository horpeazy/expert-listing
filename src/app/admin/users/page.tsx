import { Card, CardContent } from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users Management</h1>
        <p className="text-slate-600 mt-1">Manage platform users and their roles</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-slate-600 py-12">
            User management features will be available once API is connected
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

