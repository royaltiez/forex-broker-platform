# PrimeTrade Platform

This is a full-stack website starter for a regulated broker-style platform with:
- user registration
- login/logout
- dashboard
- tasks and rewards
- transaction history
- payment flow (Stripe-ready)
- admin dashboard
- support pages
- legal pages

## Requirements
- Node.js 18+
- PostgreSQL
- Stripe account (for live payments)
- A legal and compliance review before production

## Setup

1. Install dependencies:
   npm install

2. Create a PostgreSQL database and update .env:
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/forex_broker?schema=public"
   JWT_SECRET="..."
   STRIPE_SECRET_KEY="..."
   STRIPE_WEBHOOK_SECRET="..."
   STRIPE_PUBLISHABLE_KEY="..."
   APP_URL="http://localhost:3000"

3. Run Prisma migrations:
   npx prisma generate
   npx prisma migrate dev --name init

4. Seed admin user:
   npm run db:seed

5. Start the app:
   npm run dev

Open:
- http://localhost:3000
- http://localhost:3000/login
- http://localhost:3000/register

Admin account:
- email: admin@company.com
- password: Admin123!

## Notes
- Stripe secret keys live on the server only.
- Do not expose API keys in frontend code.
- Payment logic should be reviewed under your Stripe account rules and local legal requirements before going live.
- Use a regulated white-label or partner infrastructure for real financial operations.
- KYC, AML, sanctions screening, and compliance review are required before production deployment in real finance workflows.
