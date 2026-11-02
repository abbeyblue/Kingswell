# Kingswell Orion Ltd — website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion for React.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Checks: `npm run lint` and `npx tsc --noEmit`.

## Contact form

The form is validated in the browser and again on the server (`src/app/contact/actions.ts`).
It only sends when `CONTACT_FORM_ENDPOINT` is set (see `.env.example`); enquiries are POSTed as JSON,
with an optional `Authorization: Bearer $CONTACT_FORM_TOKEN` header.

- Not configured, development: an amber notice explains this; submitting says "Your message was not sent".
- Not configured, production: a notice says online enquiries are not yet available and the submit button is disabled.
- Configured: success is shown only when the endpoint returns a 2xx response; otherwise an error is shown.

The contact page reads the variable at build time, so set it **before** `npm run build`.

## Content rules

- All company copy is in `src/lib/content.ts` and comes only from `docs/handoff/company-profile-source.txt`.
- The logo is the supplied PNG at `public/brand/kingswell-orion-logo.png` (also used as `src/app/icon.png`). It is not redrawn.
- No Careers page, privacy/terms pages, contact details, addresses, clients, statistics or certifications — none are in the source.
- Regulated-industry services are always shown with the conditional-scope notice.

## Routes

`/`, `/about`, `/services`, `/industries`, `/quality-compliance`, `/contact`, and
`/services/it-consultancy-digital-transformation`, `/services/software-quality-assurance`,
`/services/regulatory-compliance-governance`, `/services/it-risk-management`, `/services/regulated-industry-quality`.
# Kingswell
