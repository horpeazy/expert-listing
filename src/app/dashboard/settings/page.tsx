"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";

export default function SettingsPage() {
  const { profile } = useUser();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account settings</p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={profile?.full_name || ""} />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={profile?.email || ""} disabled />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue={profile?.phone || ""} />
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}

