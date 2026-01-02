# Home Plug Realty - Airbnb-Inspired Redesign Plan

## Design Vision

Transform Home Plug Realty into an **Airbnb-inspired** light theme real estate platform with:
- Clean, minimal white/light background
- **Red primary color** (Airbnb-style #FF385C)
- Centered search bar in header
- Horizontal scrolling property carousels
- Card-based property listings with hover effects
- Modern, clean typography

---

## Phase 1: Global Theme Reset (Light Mode + Red Primary)

### 1.1 Update `globals.css` - New Color Palette

```css
:root {
  /* Light Base */
  --background: 0 0% 100%;        /* Pure white */
  --foreground: 0 0% 13%;         /* Dark text */
  
  /* Airbnb Red Primary */
  --primary: 348 94% 60%;         /* #FF385C - Airbnb red */
  --primary-foreground: 0 0% 100%;
  
  /* Surfaces */
  --card: 0 0% 100%;              /* White cards */
  --card-foreground: 0 0% 13%;
  --border: 0 0% 90%;             /* Light gray borders */
  --muted: 0 0% 96%;              /* Light gray bg */
  
  /* Remove gold, use rose/coral accents */
  --accent: 348 94% 95%;          /* Light pink */
}
```

### 1.2 Update `layout.tsx`
- Remove `dark` class from HTML
- Keep light fonts (Outfit, or switch to Airbnb-like Cereal/Circular)

---

## Phase 2: Header Redesign (Airbnb-Style)

### 2.1 New Header Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]     │  Rent  Buy  Commercial  Snagging  │  [List Property] [Sign In] │
├─────────────────────────────────────────────────────────────────┤
│                    ┌─────────────────────────┐                  │
│                    │ Where │ Type │ 🔍 Search │                 │
│                    └─────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

### Features:
- White background with subtle bottom border
- Centered pill-shaped search bar
- Logo on left, navigation in center/right
- Search bar expands on click (like Airbnb)
- No glassmorphism - clean flat design

---

## Phase 3: Hero Section Removal

### 3.1 Replace Full-Screen Hero
- Remove parallax/video hero section
- Move search bar to header (always visible)
- Start with property categories/filters directly
- Clean, minimal approach like Airbnb homepage

---

## Phase 4: Property Cards Redesign

### 4.1 New Card Design (Airbnb-Style)
```
┌──────────────────────────┐
│  [Image Carousel]        │  ← Dots navigation
│  ◀ ●●●●● ▶              │
│──────────────────────────│
│  Apartment in Lekki      │  ← Location first
│  3 bedrooms · 2 baths    │  ← Specs
│  ₦3,500,000/year         │  ← Price
│  ★ 4.9                   │  ← Rating (if available)
└──────────────────────────┘
```

### Features:
- Image carousel with dot indicators
- Heart icon for favorites (top right)
- Clean typography
- Subtle hover shadow
- No 3D effects - flat design

---

## Phase 5: Homepage Sections (Airbnb-Style)

### 5.1 Section Structure
1. **Search Bar** (in header, always visible)
2. **Category Pills** - Horizontal scroll: "Apartments", "Houses", "Land", etc.
3. **Featured Properties** - Carousel with "Show all" link
4. **Properties by Location** - "Available in Lekki", "Available in VI"
5. **Why Home Plug** - Trust badges
6. **Footer**

### 5.2 Horizontal Carousels
- Properties scroll horizontally
- Arrow navigation on sides
- "Show all" link to full listing page
- Responsive: 1-4 cards visible based on screen

---

## Phase 6: Filter Bar (Category Pills)

### 6.1 Airbnb-Style Category Filters
```
┌──────────────────────────────────────────────────────────────┐
│ [Apartments] [Houses] [Duplexes] [Land] [Commercial] [All]  │
└──────────────────────────────────────────────────────────────┘
```

- Horizontal scrolling pills
- Icon + text for each category
- Red underline on active
- Sticky below header on scroll

---

## Phase 7: Search Bar Redesign

### 7.1 Airbnb-Style Pill Search
```
┌─────────────────────────────────────────────────────────┐
│  Where          │  Property Type  │  🔍               │
│  Search Lagos   │  Any            │  [Red Search Btn] │
└─────────────────────────────────────────────────────────┘
```

- Rounded pill shape
- Clean white with shadow
- Red search button
- Click to expand with more options

---

## Phase 8: Typography & Spacing

### 8.1 Fonts
- **Headings**: Outfit or Inter (clean sans-serif)
- **Body**: System fonts for performance
- **Remove**: Playfair Display (serif)

### 8.2 Spacing
- More whitespace
- Consistent 16px/24px/32px spacing rhythm
- Cards with 16px gap

---

## Phase 9: Remove Dark Theme Elements

### Remove:
- ❌ Dark backgrounds
- ❌ Glassmorphism
- ❌ Glowing effects
- ❌ Gradient orbs
- ❌ Emerald/gold colors
- ❌ Parallax effects
- ❌ Heavy animations

### Keep/Add:
- ✅ Light white backgrounds
- ✅ Red primary accents
- ✅ Subtle shadows
- ✅ Clean borders
- ✅ Simple hover states
- ✅ Smooth transitions (not heavy animations)

---

## Phase 10: Component Updates

### Files to Modify:

| File | Changes |
|------|---------|
| `globals.css` | Light theme, red primary |
| `layout.tsx` | Remove dark class |
| `header.tsx` | Airbnb-style centered search |
| `hero.tsx` | Remove or simplify drastically |
| `search-bar.tsx` | Pill-shaped, expandable |
| `property-card.tsx` | Flat design, image carousel |
| `featured-listings.tsx` | Horizontal carousel |
| `why-us.tsx` | Clean cards, no animations |
| `snagging-cta.tsx` | Light background |
| `footer.tsx` | Clean light footer |
| `page.tsx` | New section structure |

---

## Implementation Order

1. **Phase 1**: Global theme (colors, light mode) - 30 min
2. **Phase 2**: Header redesign - 45 min
3. **Phase 3**: Remove/simplify hero - 15 min
4. **Phase 4**: Property cards - 30 min
5. **Phase 5**: Homepage sections with carousels - 45 min
6. **Phase 6**: Category filter pills - 20 min
7. **Phase 7**: Search bar redesign - 30 min
8. **Phase 8**: Typography cleanup - 15 min
9. **Phase 9**: Remove dark elements - 20 min
10. **Phase 10**: Polish & testing - 30 min

**Total Estimated Time: ~5 hours**

---

## Color Palette (Final)

| Color | HSL | Hex | Usage |
|-------|-----|-----|-------|
| Background | 0 0% 100% | #FFFFFF | Page bg |
| Text | 0 0% 13% | #222222 | Main text |
| Primary (Red) | 348 94% 60% | #FF385C | CTAs, accents |
| Primary Light | 348 94% 95% | #FFEBEE | Hover states |
| Border | 0 0% 90% | #E5E5E5 | Dividers |
| Muted | 0 0% 96% | #F5F5F5 | Subtle bg |
| Secondary Text | 0 0% 45% | #717171 | Descriptions |

---

## Expected Result

A clean, modern real estate platform that:
- Looks and feels like Airbnb
- Has red as primary accent color
- Uses light/white theme throughout
- Features horizontal property carousels
- Has centered search bar in header
- Feels premium but approachable
- Is easy to navigate and use

Ready to implement? Say "go" and I'll start with Phase 1!

