"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Heart, User } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useWishlist } from "@/hooks/use-wishlist";

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const { wishlistCount } = useWishlist();

  const navItems = [
    {
      id: "explore",
      label: "Explore",
      icon: Search,
      href: "/properties",
      show: true,
    },
    {
      id: "wishlists",
      label: "Wishlists",
      icon: Heart,
      href: "/wishlists",
      show: true,
      badge: wishlistCount > 0 ? wishlistCount : null,
    },
    {
      id: "profile",
      label: user ? "Profile" : "",
      icon: User,
      href: user ? "/dashboard" : undefined,
      show: !!user,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 md:hidden" style={{ backgroundColor: '#FFFFFF', opacity: 1 }}>
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          if (!item.show) return null;
          
          const isActive = pathname === item.href || 
                          (item.id === "explore" && pathname === "/");
          
          return (
            <Link
              key={item.id}
              href={item.href || "#"}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full relative transition-colors ${
                isActive ? "text-[#FF385C]" : "text-[#717171]"
              }`}
            >
              <item.icon className="w-6 h-6" />
              {item.label && (
                <span className="text-xs font-medium">{item.label}</span>
              )}
              {item.badge && (
                <span className="absolute top-1 right-1/4 bg-[#FF385C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

