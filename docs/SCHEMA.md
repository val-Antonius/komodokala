# SCHEMA.md - Complete Prisma Database Schema

Copy this entire schema to `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// CORE MODELS
// ============================================

model Package {
  id           String        @id @default(cuid())
  name         String
  slug         String        @unique
  description  String        @db.Text
  shortDesc    String?       @db.VarChar(200)
  duration     Int           // days
  maxPax       Int
  minPax       Int           @default(1)
  price        Int           // IDR per person
  images       String[]
  itinerary    Json          // [{day: 1, title: "", description: ""}]
  inclusions   String[]
  exclusions   String[]
  highlights   String[]
  boatType     String?
  difficulty   String?       // easy/moderate/challenging
  category     String        // budget/standard/premium
  isActive     Boolean       @default(true)
  featured     Boolean       @default(false)
  destinations Destination[] @relation("PackageDestinations")
  bookings     Booking[]
  reviews      Review[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  @@index([slug])
  @@index([category])
  @@index([isActive])
}

model Destination {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String    @db.Text
  images      String[]
  coordinates String?   // lat,lng
  packages    Package[] @relation("PackageDestinations")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
}

model Booking {
  id            String        @id @default(cuid())
  bookingRef    String        @unique // LBJ-20260204-001
  packageId     String
  package       Package       @relation(fields: [packageId], references: [id])
  userId        String?
  user          User?         @relation(fields: [userId], references: [id])
  guestName     String
  guestEmail    String
  guestPhone    String
  guestCountry  String?
  travelDate    DateTime
  numGuests     Int
  basePrice     Int           // price per person at booking time
  totalPrice    Int           // basePrice * numGuests
  specialReq    String?       @db.Text
  dietaryReq    String?
  status        BookingStatus @default(PENDING)
  paymentStatus PaymentStatus @default(PENDING)
  payments      Payment[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([bookingRef])
  @@index([userId])
  @@index([status])
  @@index([paymentStatus])
  @@index([travelDate])
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

enum PaymentStatus {
  PENDING
  PARTIAL
  PAID
  REFUNDED
}

model Payment {
  id            String    @id @default(cuid())
  bookingId     String
  booking       Booking   @relation(fields: [bookingId], references: [id])
  amount        Int
  paymentMethod String    // bank_transfer/gopay/ovo/credit_card/qris
  transactionId String?   @unique
  status        String    // pending/success/failed/expired
  paidAt        DateTime?
  expiresAt     DateTime?
  paymentProof  String?   // URL for bank transfer proof
  notes         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([bookingId])
  @@index([status])
}

// ============================================
// USER & AUTH MODELS
// ============================================

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified DateTime?
  password      String?   // hashed, null for OAuth
  phone         String?
  image         String?
  country       String?
  role          UserRole  @default(USER)
  bookings      Booking[]
  reviews       Review[]
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([email])
  @@index([role])
}

enum UserRole {
  USER
  ADMIN
}

model Review {
  id         String   @id @default(cuid())
  packageId  String
  package    Package  @relation(fields: [packageId], references: [id])
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  rating     Int      // 1-5
  comment    String   @db.Text
  images     String[]
  isVerified Boolean  @default(false) // from actual bookings
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([packageId])
  @@index([userId])
  @@index([rating])
}

// ============================================
// NEXTAUTH MODELS
// ============================================

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

## After copying the schema:

1. **Install Prisma:**
```bash
npm install prisma @prisma/client
npm install -D prisma
```

2. **Initialize Prisma:**
```bash
npx prisma init
```

3. **Update .env file:**
```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

4. **Push schema to database:**
```bash
npx prisma db push
```

5. **Generate Prisma Client:**
```bash
npx prisma generate
```

6. **Create seed file** (`prisma/seed.ts`):
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create destinations
  const komodo = await prisma.destination.create({
    data: {
      name: 'Komodo Island',
      slug: 'komodo-island',
      description: 'Home of the famous Komodo dragons, the largest lizards on Earth.',
      images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19'],
    },
  })

  const padar = await prisma.destination.create({
    data: {
      name: 'Padar Island',
      slug: 'padar-island',
      description: 'Famous for its iconic viewpoint with three different colored beaches.',
      images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4'],
    },
  })

  const pinkBeach = await prisma.destination.create({
    data: {
      name: 'Pink Beach',
      slug: 'pink-beach',
      description: 'Unique pink sand beach, perfect for snorkeling.',
      images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19'],
    },
  })

  // Create packages
  await prisma.package.create({
    data: {
      name: 'Komodo Express 2D1N',
      slug: 'komodo-express-2d1n',
      description: 'Quick getaway to see Komodo dragons and explore Pink Beach. Perfect for those with limited time.',
      shortDesc: 'Quick 2-day tour to Komodo Island and Pink Beach',
      duration: 2,
      minPax: 2,
      maxPax: 10,
      price: 1500000,
      category: 'budget',
      difficulty: 'easy',
      boatType: 'Shared boat',
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Labuan Bajo to Komodo Island',
          description: 'Departure from Labuan Bajo harbor, sailing to Komodo Island. Trekking to see Komodo dragons. Lunch on boat. Snorkeling at Pink Beach. Dinner and overnight on boat.',
        },
        {
          day: 2,
          title: 'Return to Labuan Bajo',
          description: 'Sunrise at Padar Island viewpoint. Breakfast on boat. Return sailing to Labuan Bajo. Arrive around 12:00 PM.',
        },
      ],
      inclusions: [
        'Boat rental',
        'Professional guide',
        'Snorkeling equipment',
        'Meals (3x meals)',
        'Mineral water',
        'National park entrance fees',
      ],
      exclusions: [
        'Personal expenses',
        'Travel insurance',
        'Tips for guide and crew',
      ],
      highlights: [
        'See real Komodo dragons in wild',
        'Snorkel at Pink Beach',
        'Sunrise at Padar Island',
      ],
      destinations: {
        connect: [{ id: komodo.id }, { id: pinkBeach.id }, { id: padar.id }],
      },
    },
  })

  await prisma.package.create({
    data: {
      name: 'Padar Sunrise 3D2N',
      slug: 'padar-sunrise-3d2n',
      description: 'Explore the best of Komodo National Park with comfortable accommodation and comprehensive itinerary.',
      shortDesc: '3-day comprehensive tour of Komodo National Park',
      duration: 3,
      minPax: 2,
      maxPax: 8,
      price: 2500000,
      category: 'standard',
      difficulty: 'moderate',
      boatType: 'Semi-private boat',
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Labuan Bajo - Komodo Island',
          description: 'Depart from harbor, visit Komodo Island for dragon trekking, snorkel at Pink Beach, overnight on boat.',
        },
        {
          day: 2,
          title: 'Padar - Manta Point',
          description: 'Sunrise hike at Padar Island, swimming with manta rays at Manta Point, explore Kanawa Island, overnight on boat.',
        },
        {
          day: 3,
          title: 'Return Journey',
          description: 'Morning snorkeling, return to Labuan Bajo, arrive around 1:00 PM.',
        },
      ],
      inclusions: [
        'Private boat charter',
        'Experienced guide & crew',
        'Full snorkeling equipment',
        'All meals (8x meals)',
        'Drinking water & snacks',
        'Park entrance fees',
        'Life jackets',
      ],
      exclusions: [
        'Personal expenses',
        'Travel insurance',
        'Tips',
        'Alcoholic beverages',
      ],
      highlights: [
        'Sunrise at Padar Island',
        'Swimming with manta rays',
        'Multiple snorkeling spots',
        'Komodo dragon encounter',
      ],
      destinations: {
        connect: [{ id: komodo.id }, { id: padar.id }, { id: pinkBeach.id }],
      },
    },
  })

  console.log('✅ Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

7. **Add seed script to package.json:**
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

8. **Install ts-node:**
```bash
npm install -D ts-node
```

9. **Run seed:**
```bash
npx prisma db seed
```

10. **Verify data:**
```bash
npx prisma studio
```
This will open Prisma Studio in your browser where you can view all seeded data.
