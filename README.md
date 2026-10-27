# Gentle Touch — live booking starter

Mobile-friendly Next.js + Supabase booking site with service selection, date/time availability, real database booking creation, and a protected admin dashboard.

## What is included
- Customer booking flow and server-side validation.
- Sample massage/wellness services and PHP prices.
- Availability lookup and a database uniqueness rule to prevent duplicate active slots.
- Admin sign-in through Supabase Auth.
- Admin-only booking list, status updates, deletion and CSV export.
- Supabase schema and Vercel deployment configuration instructions.

## 1. Create Supabase project
1. Create a project at https://supabase.com/.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Project Settings -> API, copy the Project URL, anon/public key and service_role key.
4. Copy `.env.example` to `.env.local` and fill in all values. Never expose `SUPABASE_SERVICE_ROLE_KEY` in a `NEXT_PUBLIC_` variable or commit `.env.local`.

## 2. Create the admin login
1. In Supabase Dashboard -> Authentication -> Users, create an admin user with the business owner's email and a strong password.
2. Copy that user's UUID.
3. In SQL Editor run:
   `insert into public.admin_users (user_id) values ('PASTE-AUTH-USER-UUID-HERE');`
4. Only add trusted administrators. The admin API checks both the Supabase Auth session and membership in this table.

## 3. Run locally
Install Node.js 20 or newer. In this folder run:
```bash
npm install
cp .env.example .env.local
# edit .env.local and fill in your Supabase values
npm run dev
```
Open http://localhost:3000. Admin page is http://localhost:3000/admin.

## 4. Deploy on Vercel
1. Push this project to a private GitHub repository.
2. Import the repository at https://vercel.com/new.
3. Add these Environment Variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only secret)
   - `BUSINESS_TIME_ZONE` = `Asia/Manila`
4. Deploy. Test a customer booking and then sign in to `/admin`.
5. Add a custom domain in Vercel when ready.

## Before accepting real customers
- Confirm the service menu, prices, actual business hours, address, contact information, cancellation policy and privacy notice with the client.
- The starter assumes each time label is a single bookable slot. If services can overlap or there are multiple therapists/rooms, implement resource-aware availability and duration-overlap checks before launch.
- Add rate limiting/CAPTCHA to public booking creation to reduce spam.
- Configure email/SMS notifications (e.g. Resend/Twilio) and test delivery. The starter does not send notifications or take payment.
- Decide whether pending bookings block a slot; currently they do, until cancelled.
- Review privacy, retention, consent and applicable Philippine data-protection requirements with the business.
- Use strong unique admin passwords and enable MFA in Supabase where available.
- Verify `npm run build` and test on mobile before launch.

## API summary
- `GET /api/bookings?date=YYYY-MM-DD` — returns booked time labels for a date.
- `POST /api/bookings` — validates input and creates a booking.
- `POST /api/admin/login` — signs in an admin and checks admin membership.
- `GET /api/admin/bookings` — lists bookings (Bearer token required).
- `PATCH /api/admin/bookings` — changes status (Bearer token required).
- `DELETE /api/admin/bookings?id=UUID` — deletes a booking (Bearer token required).

This is a starter implementation, not a hosted or audited production service. Configure and test the Supabase project before sharing the URL with customers.
