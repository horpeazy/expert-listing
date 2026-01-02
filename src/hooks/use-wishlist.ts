"use client";

import { useState, useEffect } from "react";

interface WishlistItem {
  id: string;
  addedAt: number;
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("homeplug_wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse wishlist:", e);
      }
    }
    setLoading(false);
  }, []);

  // Save to localStorage when wishlist changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("homeplug_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, loading]);

  const addToWishlist = (propertyId: string) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === propertyId)) return prev;
      return [...prev, { id: propertyId, addedAt: Date.now() }];
    });
  };

  const removeFromWishlist = (propertyId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== propertyId));
  };

  const isInWishlist = (propertyId: string) => {
    return wishlist.some((item) => item.id === propertyId);
  };

  const toggleWishlist = (propertyId: string) => {
    if (isInWishlist(propertyId)) {
      removeFromWishlist(propertyId);
    } else {
      addToWishlist(propertyId);
    }
  };

  return {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    loading,
  };
}

