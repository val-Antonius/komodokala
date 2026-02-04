# CONVERSATION-STARTER.md - How to Start with Cursor

Copy and paste this into your Cursor chat to begin:

---

## INITIAL MESSAGE TO CURSOR:

```
Hi! I'm building a travel agency website for Labuan Bajo tour packages. I have 3 important files in this project that contain all the rules, implementation plan, and database schema:

1. **RULES.md** - Development standards and coding guidelines you MUST follow
2. **IMPLEMENTATION.md** - The complete phases of development (Phase 0 to Phase 8)
3. **SCHEMA.md** - The complete Prisma database schema

Please read and understand these 3 files thoroughly:
- @RULES.md
- @IMPLEMENTATION.md  
- @SCHEMA.md

After reading them, please:
1. Confirm you understand the project structure
2. Confirm you understand the tech stack (Next.js 14, Prisma, Neon, Midtrans)
3. Confirm you understand the phase-by-phase approach
4. Tell me which phase we should start with (it should be Phase 0)

Important: After EVERY phase completion, you must update the checkpoint.md file with:
- What was completed
- Files created
- What works
- Known issues
- Next steps

Let's start building! 🚀
```

---

## AFTER CURSOR RESPONDS:

If Cursor confirms understanding, proceed with:

```
Perfect! Let's start with Phase 0: Foundation & Database Setup.

Here are my business details:

**BUSINESS INFO:**
Business Name: [Your Business Name, e.g., "Komodo Adventure Tours"]
Tagline: [Optional, e.g., "Explore Paradise with Expert Guides"]
Contact Email: [your-email@example.com]
Contact Phone: [+62 xxx-xxxx-xxxx]
WhatsApp: [+62 xxx-xxxx-xxxx]
Office Address: [if any, e.g., "Jl. Soekarno Hatta No. 1, Labuan Bajo"]

**DESTINATIONS:**
1. Komodo Island - See the famous Komodo dragons
2. Padar Island - Iconic three-colored beach viewpoint
3. Pink Beach - Unique pink sand beach, great snorkeling
4. Manta Point - Swimming with manta rays
5. Kanawa Island - Beautiful coral reefs
6. Taka Makassar - Stunning sandbar
[Add more if you have]

**INITIAL PACKAGES (for seed data):**

Package 1:
- Name: Komodo Express 2D1N
- Duration: 2 days, 1 night
- Price: Rp 1,500,000/person
- Min Pax: 2, Max Pax: 10
- Category: budget
- Destinations: Komodo Island, Pink Beach, Padar Island
- Description: Quick getaway to see Komodo dragons and explore Pink Beach

Package 2:
- Name: Padar Sunrise 3D2N
- Duration: 3 days, 2 nights
- Price: Rp 2,500,000/person
- Min Pax: 2, Max Pax: 8
- Category: standard
- Destinations: Padar Island, Komodo Island, Pink Beach, Manta Point
- Description: Comprehensive tour with sunrise at Padar and manta ray swimming

Package 3:
- Name: Ultimate Komodo 4D3N
- Duration: 4 days, 3 nights
- Price: Rp 4,200,000/person
- Min Pax: 2, Max Pax: 6
- Category: premium
- Destinations: All major spots including hidden gems
- Description: Complete exploration with luxury accommodations

[Add more packages if you want]

**NEON DATABASE:**
I have created a Neon database. Here's my connection string:
DATABASE_URL="[paste your Neon connection string here]"

Please proceed with Phase 0:
1. Initialize Next.js project
2. Setup Prisma with the schema from SCHEMA.md
3. Create seed file with the packages above
4. Run migrations and seed
5. Create a test API route to verify database connection
6. Update checkpoint.md when done

Go ahead!
```

---

## EXAMPLE CONVERSATION FLOW:

### You:
```
Phase 0 completed! Show me the checkpoint.md file.
```

### Cursor:
[Shows checkpoint with completed tasks]

### You:
```
Great! Now let's move to Phase 1.1: Package Detail Page.

Please build:
- Route: /packages/[slug]
- Fetch package from database by slug
- Show package details (name, price, duration, images)
- Create image gallery component (carousel)
- Show itinerary in accordion format
- Create booking sidebar (desktop) with:
  * Date picker
  * Guest selector (min-max validation)
  * Price calculator (updates on guest change)
  * "Book Now" button
- For mobile: Create sticky bottom bar with price + CTA

Follow the structure in RULES.md and update checkpoint.md when done.
```

### Cursor:
[Builds the package detail page]

### You:
```
The image gallery isn't working on mobile. Can you fix it?
```

### Cursor:
[Fixes the issue]

### You:
```
Perfect! Update checkpoint.md with what we completed, then let's move to Phase 1.2: Booking Flow.
```

---

## TIPS FOR SMOOTH WORKFLOW:

### DO:
✅ Always reference the files: `@RULES.md`, `@IMPLEMENTATION.md`, `@SCHEMA.md`
✅ Complete one phase fully before moving to next
✅ Ask Cursor to update checkpoint.md after each phase
✅ Test each feature before moving on
✅ Ask Cursor to explain if something is unclear
✅ Request code review before implementing

### DON'T:
❌ Skip Phase 0 (database setup)
❌ Rush through phases
❌ Forget to update checkpoint.md
❌ Skip testing
❌ Move forward with broken features

---

## COMMON PROMPTS YOU'LL USE:

**When starting a new phase:**
```
Let's start Phase [X]: [Phase Name]. 
Build [specific feature].
Follow RULES.md guidelines and update checkpoint.md when done.
```

**When something breaks:**
```
I'm getting this error: [paste error]
Can you debug and fix it?
```

**When you need explanation:**
```
Can you explain how [feature] works?
Why did you implement it this way?
```

**When code review needed:**
```
Before implementing, can you show me the plan/structure first?
```

**When testing:**
```
I tested [feature] and found these issues: [list issues]
Can you fix them?
```

**When moving to next phase:**
```
Phase [X] is complete and tested. Update checkpoint.md, then let's move to Phase [Y].
```

---

## CHECKPOINT UPDATES:

After EVERY phase, ask Cursor:

```
Please update checkpoint.md with:
1. Mark Phase [X] as completed ✅
2. List all files you created/modified
3. List what works
4. List any known issues
5. Add git commit message suggestion
6. Tell me what's next

Then show me the updated checkpoint.md
```

---

## TROUBLESHOOTING:

**If Cursor forgets the context:**
```
Please re-read @RULES.md, @IMPLEMENTATION.md, and @SCHEMA.md.
We are currently on Phase [X], working on [feature].
Continue from where we left off.
```

**If code doesn't follow rules:**
```
This doesn't follow the guidelines in @RULES.md.
Specifically: [point out which rule]
Please refactor according to the rules.
```

**If implementation skips steps:**
```
We need to follow @IMPLEMENTATION.md phase by phase.
We're still on Phase [X], don't skip to Phase [Y] yet.
Let's complete [current task] first.
```

---

## SUCCESS CHECKLIST:

- [ ] All 3 files (@RULES.md, @IMPLEMENTATION.md, @SCHEMA.md) are in project root
- [ ] checkpoint.md file created (copy from checkpoint-template.md)
- [ ] Initial conversation with Cursor completed
- [ ] Cursor confirmed understanding of all 3 files
- [ ] Phase 0 started

Good luck! 🚀
