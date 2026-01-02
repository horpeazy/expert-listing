"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Globe, Menu, User } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { AirbnbSearch } from "@/components/search/airbnb-search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AirbnbHeader() {
  const router = useRouter();
  const { user, profile, signOut } = useUser();
  const [activeTab, setActiveTab] = useState("rent");

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const tabs = [
    { 
      id: "rent", 
      label: "Rent", 
      href: "/properties?transaction_type=rent",
      icon: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240"
    },
    { 
      id: "buy", 
      label: "Buy", 
      href: "/properties?transaction_type=sale",
      icon: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/e47ab655-027b-4679-b2e6-df1c99a5c33d.png?im_w=240"
    },
    { 
      id: "snagging", 
      label: "Snagging", 
      href: "/snagging",
      icon: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240"
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EBEBEB]">
      <div className="px-6 mx-auto max-w-[2520px]">
        {/* Top Row: Logo, Tabs, Right Nav */}
        <div className="h-20 flex items-center relative">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-sm border border-gray-200">
              <Image 
                src="/homeplug.jpg" 
                alt="Home Plug Realty" 
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Center: Navigation Tabs */}
          <nav 
            className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2" 
            style={{ 
              marginTop: '22px', 
              marginBottom: '24px',
              width: '500px',
              height: '48px',
              transition: 'opacity 0.175s cubic-bezier(0, 0, 1, 1)'
            }}
            role="tablist"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  router.push(tab.href);
                }}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`
                  relative h-12 flex items-center justify-center gap-2 text-sm font-semibold transition-colors flex-1
                  ${activeTab === tab.id ? 'text-[#222222]' : 'text-[#717171] hover:text-[#222222]'}
                `}
              >
                <span className="flex items-center justify-center" style={{ width: '48px', height: '48px' }}>
                  <Image 
                    src={tab.icon} 
                    alt="" 
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                    style={{ display: 'block' }}
                  />
                </span>
                <span className="whitespace-nowrap">{tab.label}</span>
                {activeTab === tab.id && (
                  <span 
                    className="absolute left-0 right-0 bg-[#222222]" 
                    style={{ 
                      bottom: '0px',
                      height: '3px',
                      borderRadius: '1.5px 1.5px 0 0'
                    }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Navigation */}
          <div className="flex items-center gap-2 ml-auto">
          {/* List Property Button */}
          <Link href={user ? "/dashboard/listings/new" : "/register"}>
            <button className="hidden lg:block px-4 py-3 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors">
              List your property
            </button>
          </Link>

          {/* Globe Button */}
          <button className="hidden lg:flex items-center justify-center w-10 h-10 hover:bg-[#F7F7F7] rounded-full transition-colors">
            <Globe className="w-4 h-4 text-[#222222]" />
          </button>

          {/* Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 pl-3 pr-1.5 py-1.5 border border-[#DDDDDD] rounded-full hover:shadow-md transition-shadow bg-white">
                <Menu className="w-4 h-4 text-[#222222]" />
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name || "User"}
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full"
                  />
                ) : (
                  <div className="w-[30px] h-[30px] rounded-full bg-[#717171] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              {user ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{profile?.full_name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/listings" className="cursor-pointer">My Listings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/bookings" className="cursor-pointer">Bookings</Link>
                  </DropdownMenuItem>
                  {profile?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="cursor-pointer font-semibold">Sign up</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer">Log in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/properties?transaction_type=rent" className="cursor-pointer">Rent</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/properties?transaction_type=sale" className="cursor-pointer">Buy</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/snagging" className="cursor-pointer">Snagging Service</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>

        {/* Bottom Row: Search Bar */}
        <div className="hidden md:flex justify-center pb-4 pt-1">
          <AirbnbSearch />
        </div>
      </div>
    </header>
  );
}

