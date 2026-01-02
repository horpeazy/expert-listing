"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, User } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      id: "shortlets", 
      label: "Shortlets", 
      href: "/properties?transaction_type=shortlet",
      icon: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240"
    },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F7] border-b border-[#EBEBEB] transition-all duration-300 ease-in-out"
      style={{
        height: isScrolled ? '80px' : 'auto'
      }}
    >
      <div className="px-10 md:px-20 mx-auto max-w-[2520px]">
        {/* Top Row: Logo, Search (when scrolled), Right Nav */}
        <div 
          className="flex items-center relative transition-all duration-300 ease-in-out"
          style={{
            height: isScrolled ? '80px' : '80px'
          }}
        >
          {/* Left: Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-all duration-300 ease-in-out">
            <div 
              className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ease-in-out"
              style={{
                width: isScrolled ? '48px' : '64px',
                height: isScrolled ? '48px' : '64px',
                padding: isScrolled ? '6px' : '8px'
              }}
            >
              <Image 
                src="/homeplug.jpg" 
                alt="Home Plug Realty" 
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Center: Compact Search (when scrolled) or Navigation Tabs */}
          {isScrolled ? (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2 px-6 py-2.5 bg-white border border-[#DDDDDD] rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              style={{
                animation: 'slideDown 0.3s ease-out'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#222222]">Anywhere</span>
              </div>
              <div className="w-px h-6 bg-[#DDDDDD]"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#222222]">Any type</span>
              </div>
              <div className="w-px h-6 bg-[#DDDDDD]"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#717171]">Add budget</span>
              </div>
              <div className="w-8 h-8 bg-[#FF385C] rounded-full flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'white', strokeWidth: '5.33333', overflow: 'visible' }}>
                  <path fill="none" d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 10 10"></path>
                </svg>
              </div>
            </button>
          ) : (
            <nav 
              className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2" 
              style={{ 
                marginTop: '22px', 
                marginBottom: '24px',
                width: '500px',
                height: '48px',
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
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
                            relative h-12 flex items-center justify-center gap-3 text-lg font-semibold transition-colors flex-1
                            ${activeTab === tab.id ? 'text-[#222222]' : 'text-[#717171] hover:text-[#222222]'}
                          `}
                        >
                          <span className="flex items-center justify-center" style={{ width: '56px', height: '56px' }}>
                            <Image 
                              src={tab.icon} 
                              alt="" 
                              width={56}
                              height={56}
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
          )}

          {/* Right: User Menu */}
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 pl-3 pr-1.5 py-1.5 border border-[#DDDDDD] rounded-full hover:shadow-md transition-shadow bg-white focus:outline-none focus:shadow-md">
                  <Menu className="w-4 h-4 text-[#222222]" />
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.full_name || "User"}
                      width={30}
                      height={30}
                      className="w-[30px] h-[30px] rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[30px] h-[30px] rounded-full bg-[#717171] flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2" sideOffset={8}>
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
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>

        {/* Bottom Row: Search Bar */}
        <div 
          className={`hidden md:flex justify-center transition-all duration-300 ease-in-out overflow-hidden ${
            isScrolled ? 'max-h-0 opacity-0 pb-0 pt-0' : 'max-h-96 opacity-100 pb-6 pt-4'
          }`}
        >
          <AirbnbSearch />
        </div>
      </div>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}

