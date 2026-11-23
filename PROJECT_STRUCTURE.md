# DateNexa Frontend and API Map

This repository is a Next.js App Router application. The frontend pages and the small server-side endpoints live in the same project; there is no separate `frontend/`, `backend/`, or MVC `controllers/` directory.

## Main folders

| Path | Purpose |
| --- | --- |
| `app/` | URL routes, shared layouts, global styles, and API route handlers |
| `components/` | Reusable page UI, forms, navigation, icons, and feature components |
| `lib/` | Language/theme providers, verification state, and demo data |
| `lib/i18n/bn.json` | Bengali interface strings |
| `lib/i18n/en.json` | English interface strings |
| `public/` | Static logos and payment brand images |

## Frontend routes

Route groups in parentheses organize files but do not appear in the URL.

| URL | Page file | Main components / purpose |
| --- | --- | --- |
| `/` | `app/(main)/page.js` | Feed, `PostComposer`, stories, feed cards, and special-post entry |
| `/create-listing` | `app/(main)/create-listing/page.js` | Dating/meeting, car show, and fitness/health post form |
| `/faq` | `app/(main)/faq/page.js` | DateNexa benefits and FAQ questions/answers |
| `/privacy` | `app/(main)/privacy/page.js` | Privacy and community guidance |
| `/report-problem` | `app/(main)/report-problem/page.js` | Support guidance and WhatsApp/Telegram links |
| `/search` | `app/(main)/search/page.js` | Search page and result UI |
| `/profile/[username]` | `app/(main)/profile/[username]/page.js` | Profile page; username is a dynamic URL segment |
| `/friend-requests` | `app/(main)/friend-requests/page.js` | Friend requests |
| `/friends` | `app/(main)/friends/page.js` | Friends list |
| `/messages` | `app/(main)/messages/page.js` | Messages list |
| `/notifications` | `app/(main)/notifications/page.js` | Notifications |
| `/settings` | `app/(settings)/settings/page.js` | Settings overview/profile form |
| `/settings/payment` | `app/(settings)/settings/payment/page.js` | bKash, Nagad, and debit-card UI |
| `/settings/security` | `app/(settings)/settings/security/page.js` | Password and security settings UI |
| `/settings/verification` | `app/(settings)/settings/verification/page.js` | Identity verification flow UI |
| `/login` | `app/(auth)/login/page.js` | Login screen |
| `/register` | `app/(auth)/register/page.js` | Registration and OTP UI |
| `/forgot-password` | `app/(auth)/forgot-password/page.js` | Password recovery screen |
| `/age` | `app/(auth)/age/page.js` | Age confirmation page |

Shared layouts:

- `app/layout.js` sets the document shell, font, global metadata, and `app/globals.css`.
- `app/(main)/layout.js` wraps feed and information routes with `LanguageProvider`, header, top contact bar, sidebar, mobile nav, and floating chat.
- `app/(settings)/layout.js` wraps settings routes with the shared header and settings sidebar.

## Server/API route files

| URL / action | File | What it does |
| --- | --- | --- |
| `POST /api/translate` | `app/api/translate/route.js` | Validates batches of text, applies an in-memory IP rate limit, and calls Google Cloud Translation using `GOOGLE_TRANSLATE_API_KEY`. |
| Age confirmation server action | `app/(auth)/age/actions.js` (`confirmAge`) | Sets the `age_verified` HttpOnly cookie, then redirects to `/register`. |

In App Router, `page.js` files render frontend routes and `route.js` files handle HTTP requests. This project does not currently have named MVC controller files or a separate backend service.

## Important current implementation limits

- `lib/mock-data.js` supplies demo profile, friend, chat, story, and post data.
- Login and registration currently validate in the browser and use demo navigation/OTP behavior; there is no auth API or database persistence in this repository.
- Profile photo/cover changes and verification demo state use browser storage. Production identity checks require a real verification backend/provider.
- Payment method Link/Unlink controls are UI state only; no payment gateway is connected.
- Special-post form shows a local draft confirmation and previews selected media, but its submit handler has a TODO for saving posts through an API.
- `/report-problem` opens WhatsApp or Telegram; it does not store a support ticket in this app.

## Main workflows

### Page navigation

```text
Browser URL
  -> matching app/**/page.js
  -> route-group layout (main or settings)
  -> page component
  -> feature components and shared providers
```

### Language selection

```text
LanguageSwitcher
  -> LanguageProvider
  -> bn.json / en.json for Bengali and English
  -> other selected language: POST /api/translate
  -> Google Cloud Translation API
  -> translated strings cached in localStorage
```

The translation API key belongs in a local `.env.local` file and must never be committed. `.env.example` documents the variable name only.

### Age confirmation

```text
/age page -> confirmAge server action -> age_verified cookie -> /register
```

### Special post

```text
Home / ListingPostLink -> /create-listing
  -> choose post type and audience
  -> enter title, details, budget, duration, and location
  -> optionally preview image/video
  -> current UI confirms a local draft; an API/database save is not implemented
```

### Profile and payment settings

```text
Account menu -> /settings or /settings/payment
  -> settings layout and sidebar
  -> profile/photo or payment controls
  -> current demo state is local/UI only unless a backend service is added
```

## Local commands

- `npm run dev` — start the development server.
- `npm run build` — create a production build.
- `npm run start` — serve a completed production build.
