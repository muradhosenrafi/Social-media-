# DateNexa backend

This Express and MongoDB service follows the reference repository's controller, model, database, route, and utility separation. It implements registration with email or phone, plus OTP verification and resend.

## Run locally

1. Install Node.js and MongoDB, then open a terminal in `backend/`.
2. Copy `.env.example` to `.env`. Set `MONGODB_URI`; configure `SMTP_USER`, `SMTP_PASSWORD`, and `EMAIL_FROM` for email signups. For phone signups, configure `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_FROM_NUMBER` with an SMS-enabled Twilio number.
3. Run `npm install` once in `backend/`.
4. From the project root, run `npm run dev:backend`. In a second terminal, run `npm run dev` for the frontend.
5. If you add or change `NEXT_PUBLIC_API_URL` in the project root `.env.local`, set it to `http://localhost:5001` and restart the frontend. The code uses this as its default URL.

The API will not start until it can connect to MongoDB. Email and SMS codes will not send until the matching provider is configured. OTP codes are hashed in the database and expire after 5 minutes. The backend schedules deletion when a code expires, and MongoDB's TTL index provides cleanup if the backend restarts. Bangladeshi local numbers beginning with `01` are normalized to `+880` before storage and SMS delivery.

## Auth endpoints

- `POST /api/auth/register` — accepts `name`, `firstName`, `lastName`, exactly one of `email` or `phone`, `password`, `gender`, and `dob` (`YYYY-MM-DD`). It stores a password hash and sends a six-digit code over the selected channel.
- `POST /api/auth/verify-otp` — accepts `email` or `phone` and `code`, then marks the account verified.
- `POST /api/auth/resend-otp` — accepts `email` or `phone` and sends a replacement code for a pending registration.

The public registration form uses the same field names and the OTP page calls the verify and resend endpoints.
