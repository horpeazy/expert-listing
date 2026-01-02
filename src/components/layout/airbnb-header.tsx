"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Key, Home, Bed } from "lucide-react";
import { AirbnbSearch } from "@/components/search/airbnb-search";

export function AirbnbHeader() {
  const router = useRouter();
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

  const tabs = [
    { 
      id: "rent", 
      label: "Rent", 
      href: "/properties?transaction_type=rent",
      icon: Key
    },
    { 
      id: "buy", 
      label: "Buy", 
      href: "/properties?transaction_type=sale",
      icon: Home
    },
    { 
      id: "shortlets", 
      label: "Shortlets", 
      href: "/properties?transaction_type=shortlet",
      icon: Bed
    },
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#EBEBEB] transition-all duration-300 ease-in-out"
      style={{
        height: isScrolled ? '80px' : 'auto',
        backgroundColor: '#F7F7F7',
        opacity: 1
      }}
    >
      <div className="mx-auto max-w-[2520px]">
        {/* Mobile: Search Bar + Tabs */}
        <div className="flex md:hidden flex-col w-full bg-[#F7F7F7]">
          {/* Search Bar */}
          <div className={`px-4 transition-all duration-300 ${
            isScrolled ? 'pt-2 pb-3' : 'pt-3 pb-4'
          }`}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-3 w-full px-4 bg-white border border-[#DDDDDD] rounded-full shadow-sm hover:shadow-md transition-all duration-300 ${
                isScrolled ? 'py-2' : 'py-3'
              }`}
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentColor', strokeWidth: '3', overflow: 'visible' }}>
                <path fill="none" d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 10 10"></path>
              </svg>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-semibold text-[#222222]">Start your search</span>
                <span className="text-xs text-[#717171]">Anywhere • Any type • Any budget</span>
              </div>
            </button>
          </div>

          {/* Horizontal Tabs */}
          <div className={`flex items-center justify-around border-b border-gray-200 transition-all duration-300 ${
            isScrolled ? 'pb-2' : 'pb-1'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  router.push(tab.href);
                }}
                className={`flex flex-col items-center px-4 transition-all duration-300 ${
                  isScrolled ? 'py-3' : 'py-1'
                } ${activeTab === tab.id ? 'text-[#222222]' : 'text-[#717171]'}`}
              >
                <div className="flex flex-col items-center relative">
                  {/* Icon - Hide on scroll */}
                  <div className={`transition-all duration-300 ${
                    isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
                  }`}>
                    <tab.icon 
                      className="mb-[-4px]" 
                      size={40}
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  {/* Text - Always visible */}
                  <span className={`font-medium leading-tight transition-all duration-300 ${
                    isScrolled ? 'text-base' : 'text-sm'
                  }`}>
                    {tab.label}
                  </span>
                  
                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 bg-[#FF385C]" 
                      style={{ height: '3px', bottom: '-4px' }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Top Row with Logo, Search (when scrolled), Navigation Tabs */}
        <div 
          className="hidden md:flex items-center relative px-4 md:px-10 lg:px-20 transition-all duration-300 ease-in-out"
          style={{
            height: isScrolled ? '64px' : '64px'
          }}
        >
          {/* Left: Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-all duration-300 ease-in-out">
            <div 
              className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ease-in-out"
              style={{
                width: isScrolled ? '40px' : '48px',
                height: isScrolled ? '40px' : '48px',
                padding: isScrolled ? '4px' : '6px'
              }}
            >
              <Image 
                src="/homeplug.jpg" 
                alt="Home Plug Realty" 
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop: Compact Search (when scrolled) or Navigation Tabs */}
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
                          <span className="flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
                            <tab.icon 
                              size={40}
                              strokeWidth={1.5}
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

        </div>

        {/* Bottom Row: Search Bar (Desktop Only) */}
        <div 
          className={`hidden md:flex justify-center px-4 md:px-10 lg:px-20 transition-all duration-300 ease-in-out overflow-hidden ${
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

