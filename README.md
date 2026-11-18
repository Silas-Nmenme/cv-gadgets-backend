# CV GADGETS — Full-stack Nigerian electronics store

CV GADGETS is a responsive e-commerce storefront and Express/MongoDB API for phones, laptops, tablets, iPads, MacBooks, chargers and accessories. The storefront is in `frontend/`; the API, models, routes and services are in the project root.

## Technology

- Node.js 20+ and Express 4
- MongoDB with Mongoose
- Static HTML/CSS/JavaScript storefront (ES modules)
- Paystack payment initialization, verification and webhook handling
- Cloudinary product-image uploads
- Email verification, password reset and transactional email via SMTP

## Product catalogue

The live catalogue is intentionally empty until the store administrator adds real products and confirmed prices. No clothing products or invented gadget prices are seeded. In the admin dashboard, add products using the categories `phones`, `laptops`, `tablets`, `ipads`, `macbooks`, and `chargers`. Product records support brand, model, condition, warranty, technical specifications, storage/configuration options, colours, stock, regular price and optional discounted price.

Featured brands shown in the storefront are Apple, Samsung, HP, Dell and Lenovo. Admins can add additional brands and categories in product records.

## Local setup

1. Install Node.js 20 or newer and MongoDB (local or Atlas).
2. Copy `.env.example` to `.env` and fill in your private credentials. Do not commit `.env`.
3. Install backend dependencies: `npm ci`.
4. Start the API: `npm run dev` (default `http://localhost:3000`).
5. Serve the `frontend/` folder from a local static server (for example `npx serve frontend -l 5500`).
6. Add the local storefront origin to `FRONTEND_ORIGINS` and set `STOREFRONT_URL` to that origin.

The storefront uses a same-origin `/api` proxy in production. The Vercel rewrite in `frontend/vercel.json` routes API requests to `https://cv-gadgets-backend.vercel.app`. The deployed storefront origin is `https://cv-gadgets.vercel.app`; set the backend `STOREFRONT_URL` to that URL and include it in `FRONTEND_ORIGINS`. For production Paystack redirects, set `PAYSTACK_CALLBACK_URL` to `https://cv-gadgets.vercel.app/thank-you.html`. Keep the localhost values from `.env.example` when running locally.

## First administrator

Set a random `ADMIN_REGISTRATION_KEY` of at least 32 characters. Use the API's one-time `POST /api/auth/register-admin` endpoint with the key in the `x-admin-registration-key` header. Complete email OTP verification, sign in, then remove the bootstrap key from the backend environment. Do not expose this key in frontend code or source control.

## Payments

Paystack is implemented. Start with Paystack test credentials and verify the complete initialize/callback/webhook flow before switching to live keys. The backend verifies payment server-side and does not trust a browser success message. Bank transfer is enabled only when `BANK_TRANSFER_ENABLED` is not false and the bank name, account name and account number are configured. Pay-on-delivery availability is controlled by `PAY_ON_DELIVERY_ENABLED`. Flutterwave is not implemented in this codebase.

## Nigerian delivery and contact settings

- Set `SHOP_WHATSAPP_NUMBER` in international digits without a leading `+`. Leave it blank until the correct business number is supplied.
- Set `DELIVERY_FEE_LAGOS` and `DELIVERY_FEE_NATIONWIDE` to the actual approved rates before accepting live orders. They default to zero and must be configured; the site does not invent delivery prices.
- Set `SHOP_OWNER_EMAIL` for store notifications.
- Bank transfer is only offered after `BANK_TRANSFER_BANK_NAME`, `BANK_TRANSFER_ACCOUNT_NAME` and `BANK_TRANSFER_ACCOUNT_NUMBER` are configured. The same checks are enforced by the API.
- Add actual business address, support number, warranty and returns terms before launch. These details are not fabricated in this project.

## Product images

Configure Cloudinary with `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`. Admins can upload product images from the dashboard. Never put Cloudinary secrets in browser code.

## Email

Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` and `MAIL_FROM` in the deployed backend environment. Set `SHOP_OWNER_EMAIL` to the inbox that should receive administrator notifications. Signup verification and password reset require working SMTP delivery; other notifications are attempted before their API requests complete and delivery failures are logged. SMTP acceptance cannot guarantee inbox placement, so verify delivery with your mail provider.

## Tests

Run `npm test` to execute the existing API regression suite. The suite uses test doubles for external services; it does not verify real MongoDB, Paystack, Cloudinary or SMTP credentials.

## Important pre-launch checklist

- Replace the Vercel API proxy placeholder and set exact CORS origins.
- Configure MongoDB, SMTP, Cloudinary, Paystack and store contact settings.
- Enter actual products, prices, condition, specifications, warranty and stock through the admin dashboard.
- Set real delivery rates and publish the store's approved delivery, return, refund and warranty policies.
- Test orders and payments with provider test credentials before enabling live transactions.
- Rotate any credentials that may have been included in older project archives or source-control history.
# cv-gadgets-backend
