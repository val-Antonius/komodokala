# RULES.md - Development Standards & Guidelines

## TECH STACK (MANDATORY)
- **Frontend:** Next.js 16+ (App Router) + TypeScript + Tailwind CSS
- **Database:** Neon PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js
- **Payment:** Midtrans
- **Deployment:** Vercel
- **Constraints:** Free tier resources only

## PROJECT STRUCTURE
```
src/
├── app/
│   ├── (marketing)/      # Public pages
│   ├── (booking)/        # Booking flow
│   ├── (dashboard)/      # User dashboard
│   ├── (admin)/          # Admin panel
│   ├── api/              # API routes
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── marketing/
│   ├── booking/
│   └── admin/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── validations.ts
└── types/
```

## CODE STANDARDS

### TypeScript
- Strict mode enabled
- No `any` types
- Use Zod for validation

### Components
- Server Components by default
- 'use client' only when needed
- Separate logic from UI

### API Routes
```typescript
// Always use this pattern
try {
  // validate input with Zod
  // business logic
  return NextResponse.json({ data })
} catch (error) {
  return NextResponse.json(
    { error: 'Message', code: 'CODE' },
    { status: 500 }
  )
}
```

### Database
- Use Prisma transactions for multi-step operations
- Implement soft deletes (isActive field)
- Use `select` to fetch only needed fields

### Security
- Validate ALL inputs (client + server)
- Never expose secrets in client code
- Hash passwords with bcrypt (min 10 rounds)
- Implement rate limiting

## INDONESIAN CONTEXT
- **Currency:** `Rp 1.500.000` (dot separator, no decimals)
- **Phone:** Store as `+62xxx` format
- **Language:** Indonesian primary, English secondary

## MOBILE-FIRST
- Design for 375px first
- Touch-friendly buttons (min 44px)
- Test on: iPhone SE, Galaxy S22
- No horizontal scroll

## CHECKPOINT RULES
After EVERY phase completion:
1. Update `checkpoint.md`:
   - What was completed
   - Files created/modified
   - What works
   - Known issues
   - Next steps
2. List all commands run
3. Provide testing steps
4. Git commit with message: `feat: [description]`

## TESTING CHECKLIST
Before moving to next phase:
- [ ] Feature works in dev
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Database operations work
- [ ] Error states handled
- [ ] Loading states implemented

## PERFORMANCE
- Use Next.js Image component
- Lazy load images
- Bundle size < 500KB
- Lighthouse score > 85
