import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { SNAGGING_PACKAGES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

interface PackageCardsProps {
  onSelectPackage: (packageType: "basic" | "standard" | "premium") => void;
}

export function PackageCards({ onSelectPackage }: PackageCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(Object.entries(SNAGGING_PACKAGES) as Array<[keyof typeof SNAGGING_PACKAGES, typeof SNAGGING_PACKAGES[keyof typeof SNAGGING_PACKAGES]]>).map(([key, pkg]) => (
        <Card
          key={key}
          className={`relative ${pkg.popular ? "border-emerald-600 border-2 shadow-lg" : ""}`}
        >
          {pkg.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600">
              Most Popular
            </Badge>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">{pkg.name}</CardTitle>
            <div className="space-y-2">
              <p className="text-3xl font-bold">{formatPrice(pkg.price)}</p>
              <p className="text-sm text-slate-600">{pkg.description}</p>
              <p className="text-sm font-medium text-emerald-600">
                {pkg.turnaround} turnaround
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              variant={pkg.popular ? "default" : "outline"}
              onClick={() => onSelectPackage(key)}
            >
              Book {pkg.name}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

