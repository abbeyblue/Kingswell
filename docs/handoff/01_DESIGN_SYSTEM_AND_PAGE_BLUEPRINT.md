# Kingswell Orion Ltd — APPROVED-DIRECTION WEBSITE BLUEPRINT

Status: handoff-ready **design specification**, not a claim that exported, pixel-perfect individual page screenshots or the fully developed Next.js app already exist.

## Source of truth (non-negotiable)
Use `assets/company-profile-source.txt` for company facts and service descriptions and `assets/kingswell-orion-approved-logo.png` as the actual official-approved logo image. `assets/layout-reference-only.jpeg` is a layout reference ONLY: no text, claims, identities or brands from it can appear. `assets/visual-direction-v3.png` is an atmospheric visual-direction reference, not authoritative copy. Do not use speculative copy in generated mockups as factual text. Company name: **Kingswell Orion Ltd**. Ireland-based company providing/aiming to provide IT consultancy, software QA, regulatory compliance, digital transformation and technology risk management. Many services in the profile say **may include**: do not imply established casework/certification/capability without validation. Sector services explicitly conditional on resources, competence and client requirements.

## Locked decisions
- Careers page: **omit altogether**, including navigation/footer, open positions, careers CTAs and routes.
- Real logo: exact supplied PNG, **no tracing/redrawing, no fake typographic replacement**. The PNG is a compact original, 224x231 px; render at a sensible size (header 44–52px high and a contained background), preserve ratio; request higher-res asset before very large/print use rather than inventing a vector replacement. Do not crop away the wordmark for usage where full logo is specified. Favicons can provisionally reuse scaled PNG (ideally a verified crop later).
- Dark cinematic, premium, tactile aesthetic. NOT default SaaS layout, generic 3-up cards and generic glass blobs everywhere. White/light editorial interludes, purposeful contrast.
- No external research or autofilled company content. May use a design framework and libraries for development mechanics, not to source company claims.
- No invented email, phone, physical street address, company registration, awards, certifications, ISO compliance claims, clients, testimonials, statistics, project portfolio, employee count, team faces, social profiles or client outcomes.
- Contact form: frontend usable with validation, clear submit state, but only wire sending to a **configured** endpoint; if no endpoint or email supplied show a non-deceptive unavailable/demo state. Never imply an enquiry was delivered if not.
- Careers not available. Privacy/Terms must not include invented legal copy; either omit until supplied or render explicitly unpublished placeholders in development only, NOT production.

## Visual identity
Backgrounds: abyss `#061324`, midnight `#091E36`, deep section `#0B2846`; luminous accents cobalt `#0879F9`, cyan `#53BEFF`, pale ice `#CFE9FA`; paper `#F5F9FD`, ink `#10233C`. Typeface: clean contemporary sans with strong geometric weight (a legally distributable/open-source font is acceptable as design tooling); dense editorial display, generous line spacing. Visual motif: orbit/star **inspired by** approved logo, but **never replace or modify** logo artwork. Use procedural gradients, fine orbit paths, subtle grid, responsive line-work and supplied assets rather than fabricated photos of the company. Imagery is abstract and illustrative, never labelled company property/team.

## Global layout and interaction
Desktop reference target 1440px design canvas; mobile 390px; tablet 768px. Maximum content ~1240px. Header logo left, navigation right; Home, About, Services, Industries, Quality & Compliance, Contact. Sticky header moves between transparent-on-dark and opaque-on-light states. On mobile show approved logo compact and a keyboard accessible motion-aware full-screen menu. Footer repeated logo + concise description + navigation + genuine geographic scope "Ireland-based".

Motion: Framer Motion/Motion for React page transitions and scroll reveals, GSAP ScrollTrigger optional ONLY where necessary for pinned scenes and timeline. Animations should feel beautiful and legible, not frantic. Hero entrance 0.7–1.1 seconds; stagger 60–110ms; section appearance 0.4–0.7 seconds; hover 180–280ms; orbital drift 14–28 seconds; transform/opacity preferred, keep 60fps objective, pause offscreen, throttle pointer tracking. Mobile uses reduced parallax, no hover-only content, click/tap accessible interactions. Fully respect `prefers-reduced-motion` and provide keyboard focus states.

## Individual pages — desktop and mobile composition

### 01 Home `/`
Desktop: 100svh cinematic hero with approved logo header. Left 55% strong editorial text "Reliable Technology. Structured Quality." (brand positioning, not evidence of completed work). Short source-grounded supporting copy. Two routes: Explore Services and Contact. Right 45% interactive CSS/WebGL-optional sculptural orbital field: concentric trails and luminous star/dot references, NOT an attempt to reproduce a different logo. As users scroll, hero headline splits/releases upward and orbit layers shift subtly. Next section: large horizontal service index (numbered 01–05) that responds on hover with animated line/worked abstract motif, never generic repeated three-column cards; then bright editorial About panel, dark Quality process preview, industry disclaimer + Contact CTA. Mobile: stacked headline/short intro, orbit moves behind or below headline, accessible vertical service list/accordion; avoid clipped orb or tiny text.
Interactions: in-view sequential reveals, layered pointer parallax, orbit on endless slow rotation; on scroll service row progress underline; tactile magnetic-style CTA limited to desktop pointer devices.

### 02 About `/about`
Desktop: dark branded editorial header, large typographic manifesto using only source facts, with side abstract illustration of systems/quality layers (not purported photograph of office). Alternating paper and dark panels: overview; "How we focus our work" with documentation/quality/regulatory controls; compact focus cards quality / compliance / technology risk (these are *focus areas*, not formally asserted corporate values); mission-like ambitions MUST be labelled "Our focus" or "What we aim to deliver" instead of invented formal mission/vision statements. Mobile: one-column reading order with illustrations after heading; sticky mini section progress optional.
Interactions: kinetic type split lines, scroll-driven trace of connecting systems, focus items revealed in sequence.

### 03 Services `/services`
Desktop: huge blue-on-midnight entrance, interactive 5-item service rail or responsive 2/3 split. Hovering or focusing each item changes right-side abstract visual and 1–2 lines of grounded copy; clicking navigates to dedicated page; persist clear accessible non-motion controls. Below: service relationship map and next-steps CTA. Mobile: numbered stacked cards with accordion preview, tap to detail, zero hover dependence.
Interactions: shared-layout highlight indicator, smooth crossfade of abstract visuals, click expansion/page navigation.

### 04 Individual service detail — five actual pages
Slugs `/services/it-consultancy-digital-transformation`, `/services/software-quality-assurance`, `/services/regulatory-compliance-governance`, `/services/it-risk-management`, `/services/regulated-industry-quality`.
Each: oversized bespoke title on dark split hero + unique abstract illustration; an honest short source-derived summary; "Areas of support" bullet grid from original profile; a tasteful 3–6 step visual narrative **only** if the source supports the steps (don't imply mandatory project methodology); related service links + enquiry CTA. Mobile: vertically flowing body, sticky optional in-page service index only if it does not obstruct viewport.
- IT Consultancy: assessment, business analysis, digital transformation planning, software implementation and integration, process/workflow improvement, documentation, project coordination, performance evaluation.
- Software QA: QA procedures, software quality standards and assessments, quality-system documentation, testing governance/review, quality risk, reports and corrective action plans, continuous improvement.
- Regulatory Compliance & Governance: applicable requirements, compliance procedures, reporting, governance/risk reviews, monitoring and audit preparation, policies/controls review, CAPA management, monitor changes.
- IT Risk: IT risk assessments, risk management procedures, internal control evaluation, findings, mitigation, internal audits, corrective action monitoring.
- Regulated Industry Quality: *conditional specialist scope*: healthcare, pharmaceuticals, biotechnology, medical technology; quality documentation, regulatory reviews, computerised-system validation documentation, software QA for regulated applications, applicable GxP, data integrity, audit readiness, risk-based quality. Prominently display: "Specialist services are undertaken only where the necessary technical competence, resources and client requirements are in place." Do not claim any certification.

### 05 Industries `/industries`
Desktop: four immersive bands/tiles with abstract sector imagery: Healthcare, Pharmaceuticals, Biotechnology, Medical Technology. As user scrolls, reveal one at a time; each label shows only source-backed potential support scope. Global disclaimer near top AND bottom that such services are conditional. Do NOT use language "industries we serve" as a verified clientele claim, instead "Potential regulated-industry applications" or "Where specialist support may apply". Mobile: balanced vertical image/typography panels, no pinned animation traps.

### 06 Quality & Compliance `/quality-compliance`
Desktop: contrast-rich dark process stage on left, editorial content to right; scroll-progress line animates through: requirements → documented policies → risk assessments → internal audits/reviews → records/reporting → nonconformance investigation → CAPA → continuous improvement. This is a **visual organisation of stated activities**, not a claim of a mandatory service workflow. Off-white explanatory section on what the company profile says about quality/compliance focus. Mobile: interactive vertical timeline activated by intersection or tap; no horizontal scroll requirements.

### 07 Contact `/contact`
Desktop: asymmetrical split: deep blue luminous abstract shape/orbit on one side; elegant light or dark card for real enquiry form on the other. Fields name, email, enquiry service, message, optional phone only if clearly marked optional. Clear consent? Do not invent privacy policy or claim specific data handling; publish with real legal disclosures after supplied. Form accessibility/validation state; no fake success if integration missing. Ireland-based text only, no specific address.
Mobile: stacked visual minimalism, input sizes >=16px, clear error messages, form controls large enough to tap, correct tab order.

## Navigation / route verification
All defined routes implemented. No Careers link, route or SEO metadata. Brand logo always links Home. Service-to-detail routing works. Footer links only published pages. Canonical and OpenGraph metadata do not invent contact addresses, locations beyond Ireland, social accounts, testimonials or statistics.

## Deliverable acceptance criteria
[ ] exact approved logo used in every header/footer, not an SVG redraw.
[ ] six primary pages and five service detail pages are distinct, not clone templates.
[ ] all page sections responsive at 390/768/1440 widths.
[ ] true animated scroll interactions and meaningful hover/tap interactions.
[ ] mobile navigation works, keyboard navigation works, reduced-motion mode works.
[ ] no invented company information, recruitment content or unsupported client/industry claims.
[ ] contact form correctly distinguishes configured-live from preview/unconfigured modes.
[ ] run build, lint, accessibility tests if available and fix errors.
