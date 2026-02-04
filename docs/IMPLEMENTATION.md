# IMPLEMENTATION.md - Development Phases

## PROJECT OVERVIEW
**Business:** Labuan Bajo tour packages  
**Model:** Direct B2C self-operated tours  
**Target:** All segments (budget to luxury)  
**Design Reference:** https://www.helm.yt/ (adapt for tours)

---

## PHASE 0: Foundation & Database ⚡ CRITICAL
**Must complete first before any other phase**

### Tasks:
1. **Project Setup**
   - Create Next.js 14 project with TypeScript
   - Install dependencies: `prisma`, `@prisma/client`, `next-auth`, `zod`, `bcrypt`
   - Setup Tailwind CSS
   - Create `.env` file structure

2. **Database Schema (Prisma)**
   - Copy schema from `SCHEMA.md` (full Prisma schema provided separately)
   - Connect to Neon database
   - Run: `npx prisma db push`
   - Create seed script for initial packages (3-5 packages)

3. **Verify Setup**
   - Test database connection
   - Run seed: `npx prisma db seed`
   - Query test: Fetch all packages

### Deliverables:
- ✅ `prisma/schema.prisma` created
- ✅ Database migrated
- ✅ 3-5 packages seeded
- ✅ Basic API route to test DB: `/api/packages`

---

## PHASE 1: Core Pages 🎯 HIGH PRIORITY

### 1.1 Package Detail Page (`/packages/[slug]`)
**What to build:**
- Fetch package from database by slug
- Image gallery (carousel/lightbox)
- Package info: name, price, duration, rating
- Day-by-day itinerary (accordion)
- Inclusions/Exclusions lists
- Highlights
- Reviews section (fetch from DB)
- Related packages (same category)
- **Sticky booking sidebar:**
  - Date picker (unavailable dates grayed)
  - Guest selector (min-max validation)
  - Price calculator (updates on guest change)
  - "Book Now" CTA
- **Mobile:** Sticky bottom bar with price + CTA

**Files to create:**
- `app/(marketing)/packages/[slug]/page.tsx`
- `components/marketing/PackageGallery.tsx`
- `components/marketing/BookingSidebar.tsx`
- `lib/actions/packages.ts` (server actions)

### 1.2 Booking Flow (Multi-step)
**Routes:**
- `/booking/select` - Package + Date + Guests
- `/booking/details` - Guest info form
- `/booking/review` - Summary
- `/booking/payment` - Payment method
- `/booking/confirmation` - Success page

**Features:**
- Progress indicator component
- Form validation (Zod)
- Save to localStorage (persist on refresh)
- Save to database on step 2 completion
- Generate booking reference: `LBJ-YYYYMMDD-XXX`

**Files to create:**
- `app/(booking)/booking/[step]/page.tsx`
- `components/booking/ProgressBar.tsx`
- `components/booking/BookingForm.tsx`
- `lib/validations/booking.ts` (Zod schemas)
- `lib/actions/bookings.ts`

### 1.3 Package List/Search (`/packages`)
**What to build:**
- Grid view of all active packages
- Filters: price range, duration, category
- Sort: price, duration, popularity
- Search by name
- Pagination (12 per page)
- No results state

**Files to create:**
- `app/(marketing)/packages/page.tsx`
- `components/marketing/PackageCard.tsx`
- `components/marketing/FilterSidebar.tsx`

---

## PHASE 2: Trust & Info Pages 📄 MEDIUM PRIORITY

### 2.1 Static Pages
- **About Us** (`/about`)
- **How It Works** (`/how-it-works`)
- **FAQ** (`/faq`)

### 2.2 Destinations
- **Index** (`/destinations`) - Grid of all destinations
- **Detail** (`/destinations/[slug]`) - Destination info + packages

**Files to create:**
- `app/(marketing)/about/page.tsx`
- `app/(marketing)/how-it-works/page.tsx`
- `app/(marketing)/destinations/page.tsx`
- `app/(marketing)/destinations/[slug]/page.tsx`

---

## PHASE 3: Auth & User Dashboard 🔐 MEDIUM PRIORITY

### 3.1 Authentication (NextAuth.js)
- Email/password registration
- Email/password login
- Password reset flow
- Email verification
- Protected routes middleware

**Pages:**
- `/auth/login`
- `/auth/register`
- `/auth/verify-email`
- `/auth/forgot-password`

**Files to create:**
- `app/api/auth/[...nextauth]/route.ts`
- `lib/auth.ts` (NextAuth config)
- `app/(auth)/auth/login/page.tsx`
- `app/(auth)/auth/register/page.tsx`
- `middleware.ts` (route protection)

### 3.2 User Dashboard
- **Overview** (`/dashboard`) - Upcoming/past trips
- **Bookings** (`/dashboard/bookings`) - List all bookings
- **Booking Detail** (`/dashboard/bookings/[id]`) - Details + voucher
- **Profile** (`/dashboard/profile`) - Edit info

**Files to create:**
- `app/(dashboard)/dashboard/layout.tsx`
- `app/(dashboard)/dashboard/page.tsx`
- `app/(dashboard)/dashboard/bookings/page.tsx`
- `app/(dashboard)/dashboard/profile/page.tsx`

### 3.3 Email Automation
- Booking confirmation email
- Payment received email
- Trip reminder (H-3)

**Files to create:**
- `lib/email.ts` (email sender)
- `emails/booking-confirmation.tsx` (React Email)

---

## PHASE 4: Admin Panel 👨‍💼 MEDIUM PRIORITY

### 4.1 Admin Layout & Dashboard
- Sidebar navigation
- Stats cards (bookings, revenue, pending)
- Recent bookings table
- Chart: Bookings over time (Recharts)

### 4.2 Package Management (`/admin/packages`)
- Table: All packages with search/filter
- Create package form (modal or page)
- Edit package
- Soft delete (set isActive=false)
- Image upload (Cloudinary)

### 4.3 Booking Management (`/admin/bookings`)
- Table: All bookings with filters
- View booking details
- Update status
- Mark payment as received
- Export CSV

### 4.4 Other Admin Pages
- Destinations management
- Users list
- Reviews moderation
- Settings

**Files to create:**
- `app/(admin)/admin/layout.tsx`
- `app/(admin)/admin/page.tsx`
- `app/(admin)/admin/packages/page.tsx`
- `app/(admin)/admin/bookings/page.tsx`
- `components/admin/DataTable.tsx`

---

## PHASE 5: Payment Integration 💳 HIGH PRIORITY

### 5.1 Midtrans Setup
- Install Midtrans SDK
- Create API routes:
  - `/api/payments/create` - Create transaction
  - `/api/payments/notification` - Webhook handler
- Update payment status on callback
- Send confirmation email on success

### 5.2 Payment Flow
- Payment method selection (bank transfer, e-wallet, CC, QRIS)
- Midtrans Snap popup
- Handle success/pending/failed states
- Show payment instructions

**Files to create:**
- `lib/midtrans.ts`
- `app/api/payments/create/route.ts`
- `app/api/payments/notification/route.ts`
- `components/booking/PaymentOptions.tsx`

---

## PHASE 6: Optimization ⚡ HIGH PRIORITY

### 6.1 Performance
- Optimize images (Next.js Image)
- Lazy loading
- Code splitting
- Bundle analysis
- Lighthouse audit (target >85)

### 6.2 Mobile
- Test all pages on mobile
- Fix responsive issues
- Touch-friendly interactions
- Sticky CTAs

### 6.3 SEO
- Meta tags for all pages
- Dynamic meta for packages
- Schema.org markup (Product, Review)
- Sitemap.xml
- robots.txt

---

## PHASE 7: Marketing Features 📢 LOW PRIORITY

### 7.1 Essential
- WhatsApp floating button
- Promo code system
- Newsletter signup

### 7.2 Optional
- Exit-intent popup
- Social share buttons
- Blog (for SEO)

---

## PHASE 8: Testing & Deployment 🚀 CRITICAL

### 8.1 Testing
- End-to-end booking test
- Payment flow (sandbox)
- Admin panel CRUD operations
- Mobile testing
- Cross-browser testing

### 8.2 Deployment
- Setup production env vars
- Deploy to Vercel
- Run production migrations
- Seed production data
- Configure custom domain
- Setup SSL

### 8.3 Post-Deployment
- Setup error monitoring (Sentry)
- Google Analytics 4
- Uptime monitoring
- Database backups

---

## SUCCESS CRITERIA ✅

Project is complete when:
- [ ] User can browse packages
- [ ] User can book a package
- [ ] User receives confirmation email
- [ ] Payment integration works (sandbox)
- [ ] Admin can manage packages & bookings
- [ ] Mobile responsive (all pages)
- [ ] Lighthouse score >85
- [ ] Deployed to production
- [ ] End-to-end test successful

---

## NOTES
- Each phase builds on previous phases
- Don't skip Phase 0 (database setup)
- Test thoroughly after each phase
- Update checkpoint.md after each completion
- Commit frequently with meaningful messages
