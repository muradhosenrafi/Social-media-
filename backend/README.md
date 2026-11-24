# DateNexa backend

This Express and MongoDB service follows the reference repository's controller, model, database, route, and utility separation. It implements registration with email or phone, plus OTP verification and resend.

## Run locally

1. Install Node.js and start Docker Desktop.
2. From the project root, run `npm run db:up` to start the local MongoDB container. Its data is kept in the `datenexa_mongo_data` Docker volume.
3. Copy `backend/.env.example` to `backend/.env`. The local MongoDB URI is already set. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `EMAIL_FROM` for email signups. Port `465` uses implicit TLS; port `587` uses STARTTLS. For phone signups, configure `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_FROM_NUMBER` with an SMS-enabled Twilio number.
4. Run `npm run dev:backend` from the project root. In a second terminal, run `npm run dev` for the frontend.
5. If you add or change `NEXT_PUBLIC_API_URL` in the project root `.env.local`, set it to `http://localhost:5001` and restart the frontend. The code uses this as its default URL.

The API will not start until it can connect to MongoDB. `GET /health` reports the connected database name, whether the target is Atlas or local, and whether email OTP settings are present, without exposing credentials. The default `backend/.env` points to local Docker MongoDB; Atlas Compass will stay empty until `MONGODB_URI` is changed to the Atlas connection string from Atlas → Connect → Drivers. Use the intended database name (for example, `datenexa`) in the URI path and a database user created in Atlas. Keep the Atlas password in the ignored `backend/.env` only, URL-encoding special characters. Email and SMS codes will not send until the matching provider is configured. `utils/emailSender.js` sends registration and resend codes through Nodemailer SMTP; `utils/phoneSender.js` handles SMS. If email delivery fails, the pending registration is retained so the code can be resent or registration retried; pending records expire after 5 minutes. Editing `backend/.env` while using `npm run dev:backend` restarts the server automatically. OTP codes are hashed in the database. Bangladeshi local numbers beginning with `01` are normalized to `+880` before storage and SMS delivery. Stop local MongoDB with `npm run db:stop`.

## Auth endpoints

- `POST /api/auth/register` — accepts `name`, `firstName`, `lastName`, exactly one of `email` or `phone`, `password`, `gender`, and `dob` (`YYYY-MM-DD`). It stores a password hash and sends a six-digit code over the selected channel.
- `POST /api/auth/verify-otp` — accepts `email` or `phone` and `code`, then marks the account verified.
- `POST /api/auth/resend-otp` — accepts `email` or `phone` and sends a replacement code for a pending registration.

The public registration form uses the same field names and the OTP page calls the verify and resend endpoints.
