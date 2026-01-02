"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-foreground border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-sm border border-gray-200">
                <img 
                  src="/logo.jpg" 
                  alt="Home Plug Realty" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-primary font-bold text-lg flex items-center justify-center h-full">HP</span>';
                  }}
                />
              </div>
              <div>
                <span className="font-bold text-base text-foreground">Home Plug Realty</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your reliable property solutions partner in Lagos, Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/properties?transaction_type=rent", label: "Rent" },
                { href: "/properties?transaction_type=sale", label: "Buy" },
                { href: "/properties?show_commercial=true", label: "Commercial" },
                { href: "/snagging", label: "Snagging Service" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex space-x-3 mb-4">
              {[
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Instagram, href: "https://instagram.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
              ].map(({ Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <a href="mailto:info@homeplugrealty.ng" className="hover:text-primary transition-colors">
                  info@homeplugrealty.ng
                </a>
              </p>
              <p className="text-muted-foreground">
                <a href="tel:+2349021983732" className="hover:text-primary transition-colors">
                  +234 902 198 3732
                </a>
              </p>
              <p className="text-muted-foreground">Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} <span className="font-semibold text-foreground">Home Plug Realty</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
