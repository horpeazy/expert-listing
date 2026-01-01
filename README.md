# Expert Listing - Nigerian Real Estate Platform

A modern, full-stack real estate marketplace focused on Nigeria, featuring property listings, search, and professional snagging (property inspection) services.

## 🚀 Features

### For Property Seekers
- Browse verified property listings across Nigeria
- Advanced search and filtering (location, price, type, bedrooms, etc.)
- Detailed property information with image galleries
- Direct contact with property owners/agents
- Book professional snagging inspections

### For Property Owners/Agents
- List properties for sale or rent
- Manage listings from dashboard
- Track inquiries and views
- Professional property management tools

### For Admins
- Review and approve property listings
- Manage users and roles
- Track snagging bookings
- Platform analytics

### Snagging Service
- Three-tier packages (Basic, Standard, Premium)
- Professional property inspections
- Detailed defect reports
- Pre-move-in quality assurance

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Email:** Resend
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Resend account (for emails)
- Vercel account (for deployment)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expert-listing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com): 
2. Go to Project Settings > API to get your credentials
3. Run the migration in `supabase/migrations/001_initial_schema.sql` in the SQL Editor
4. Create a storage bucket named `images` and make it public
5. Configure Google OAuth:
   - Go to Authentication > Providers > Google
   - Enable Google provider
   - Add your OAuth credentials

### 4. Set Up Resend

1. Create an account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain (or use their test domain)

### 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Expert Listing"

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables from `.env.local`
4. Deploy!

Vercel will automatically:
- Build your Next.js app
- Set up serverless functions
- Configure edge network
- Enable automatic deployments

### Post-Deployment

1. Update Supabase Auth:
   - Go to Authentication > URL Configuration
   - Add your Vercel URL to Site URL
   - Add `https://your-domain.vercel.app/auth/callback` to Redirect URLs

2. Update Google OAuth:
   - Add Vercel URL to authorized origins
   - Add callback URL to authorized redirect URIs

## 📁 Project Structure

```
expert-listing/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── properties/        # Property listings & details
│   │   ├── dashboard/         # User dashboard
│   │   ├── admin/             # Admin panel
│   │   ├── snagging/          # Snagging service page
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Header, Footer, etc.
│   │   ├── home/             # Homepage sections
│   │   ├── property/         # Property components
│   │   ├── search/           # Search & filters
│   │   ├── snagging/         # Snagging components
│   │   └── auth/             # Auth forms
│   ├── lib/                  # Utilities & config
│   │   ├── supabase/         # Supabase clients
│   │   ├── validations/      # Zod schemas
│   │   ├── utils.ts          # Helper functions
│   │   ├── constants.ts      # App constants
│   │   └── email.ts          # Email functions
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types
│   └── data/                 # Static data (states, cities)
├── supabase/
│   └── migrations/           # Database migrations
└── public/                   # Static assets
```

## 🗄️ Database Schema

The application uses PostgreSQL via Supabase with the following main tables:

- **profiles** - User information
- **properties** - Property listings
- **property_images** - Property photos
- **inquiries** - Property inquiries
- **snagging_bookings** - Snagging inspection bookings

See `supabase/migrations/001_initial_schema.sql` for the complete schema.

## 🔐 Authentication

- Email/Password authentication
- Google OAuth
- Protected routes with middleware
- Role-based access (user, agent, admin)

## 📧 Email Notifications

Automated emails for:
- Welcome messages
- Property inquiries
- Snagging confirmations
- Property approval/rejection

## 🎨 UI/UX

- Fully responsive design
- Mobile-first approach
- Accessible components (shadcn/ui)
- Modern Nigerian real estate aesthetic
- Dark mode support

## 🔍 SEO

- Server-side rendering
- Dynamic metadata
- OpenGraph images
- Sitemap generation

## 🧪 Testing Locally

1. Create a test user account
2. Add test properties
3. Test search and filters
4. Book a snagging inspection
5. Test admin features (change your role to 'admin' in the database)

## 📝 Environment-Specific Notes

### Development
- Uses localhost URLs
- Test email domain (Resend)
- Local Supabase Studio

### Production
- Custom domain
- Verified email domain
- Production Supabase project
- Analytics enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues or questions:
- Open a GitHub issue
- Email: support@expertlisting.ng

## 🎯 Roadmap

Future enhancements:
- [ ] Mortgage calculator
- [ ] Virtual property tours
- [ ] Agent verification system
- [ ] Mobile apps (iOS/Android)
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Property comparison tool
- [ ] Saved searches & alerts

---

Built with ❤️ for Nigerian real estate market
