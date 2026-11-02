# Paste into Claude — MASTER IMPLEMENTATION PROMPT

You are a senior creative developer, UI/UX art director, motion designer, and production-minded Next.js engineer. **Implement a running, polished company website for Kingswell Orion Ltd.** Do not merely explain how to build it, output one long mockup image, or stop after the homepage. Make code changes in the project/workspace you have access to, run the application/build, and give me a route-by-route verification report.

## Assets and instruction priority
I will attach a zip called `kingswell_orion_handoff.zip` or upload its extracted contents. Read `01_DESIGN_SYSTEM_AND_PAGE_BLUEPRINT.md` first: that is the **approved creative specification**. Read `assets/company-profile-source.txt` as the **ONLY source of company facts**. Use `assets/kingswell-orion-approved-logo.png` as the **exact** logo. Use `assets/layout-reference-only.jpeg` ONLY for structural inspiration; never use any of its text, company details or imagery as source material. Use `assets/visual-direction-v3.png` ONLY for atmosphere. When visual mockups conflict with source facts, the original company profile wins. Never invent content.

## Product and tech
- Next.js App Router + TypeScript, Tailwind CSS, Motion/Framer Motion, accessible headless primitives where useful. Optional GSAP only for scroll sequences that genuinely need a pinned timeline; keep bundle lean. Use responsive CSS, semantic HTML, accessible interactions.
- Exact routes: `/`, `/about`, `/services`, `/industries`, `/quality-compliance`, `/contact`, plus five `/services/<slug>` routes as specified in blueprint.
- DO NOT build Careers, vacancies, careers navigation/CTA/route. No blog, invented case studies, awards, stats, team, client logos or testimonials.
- Generate a memorable editorial/motion-first result. NOT a generic SaaS marketing template. Strong dark cinematic hero, luminous detailed orbital/circuit motifs, kinetic oversized typography, beautifully composed light editorial sections, five-service interactive index, scroll-progress quality timeline and differentiated subpages.
- Integrate the **existing actual logo PNG** (not recreated in SVG/CSS/text), preserving artwork and aspect ratio. It is only 224x231 px: keep raster rendering modest and crisp, use `object-fit:contain` and never pretend to have created an official vector file. Use original asset and place in `/public/brand/`.
- Content MUST remain verifiably grounded in `assets/company-profile-source.txt`. Its proposed role, salary, SOC code and recruitment narrative are not public marketing content. Services identified as "may include" should not be exaggerated into proven track record. Healthcare/pharma/biotech/medical tech service support is explicitly conditional on competence and resources. No precise address, email, phone, ROI, number of customers or ISO claims unless in the supplied profile (they are not).

## Execution order
1. Inspect project structure; initialise Next.js if no app exists. Copy supplied assets.
2. Create design tokens, logo header/footer, desktop/mobile navigation and motion helpers with reduced-motion handling.
3. Implement homepage **completely**, with actual functioning kinetic entrance, orbital animation and scroll transformations.
4. Implement About, Services and all five service detail pages with differentiated layouts and copy from source.
5. Implement Industries with prominently honest conditional-capability wording; implement Quality & Compliance as interactive scroll-progression experience; implement Contact.
6. Implement desktop/tablet/mobile breakpoints and mobile-specific interaction solutions; no hover-only functionality.
7. Perform an explicit page-by-page visual pass at widths 1440px, 768px and 390px. Capture screenshots if tooling allows; if not, say so plainly, do not claim capture.
8. Run appropriate formatting, lint/typecheck and build commands; resolve any errors. Confirm all routes and internal links work.

## Functionality specifics
- Contact: build accessible validated form (full name/email/service/message). Do not fake message delivery. Configured backend/email provider can be implemented only through environment variables supplied by me; if missing, show a helpful 'Contact sending not configured' state in development and disable falsely successful production submission. No fabricated placeholder email as public contact data.
- Services: desktop hover/focus responsive service preview and actual route links; mobile accordion/tap with active labels.
- Quality timeline: scroll progress + accessible focus/click navigation; explain that sequence is a visual organisation of quality activities, not an asserted official mandatory workflow.
- Responsive nav: menu open/close, escape, focus, link navigation; sticky dark/light mode as sections change. Logo in every nav.
- Animations: hero 700–1100ms, staggered type 60–110ms, soft orbit drift 14–28 seconds, gentle transform/opacity, smooth site transitions, purposeful details. No motion sickness: reduced-motion support, no extreme scroll-jacking, no mandatory WebGL.
- Page metadata and canonical titles only use confirmed facts; no default template labels.

## Completion conditions and output
Supply: a file tree; complete implementation in workspace; package/dependency details; any `.env.example` needed; setup/run commands; route checklist with status; list of source-backed text choices and any data intentionally left blank; screenshot locations if captured; build/typecheck results. If a tool or workspace limitation prevents working execution, say exactly what was not executable and provide the closest usable source files; do NOT claim the site works without testing.

**Do not ask me to approve a generic starter before coding.** Build all specified pages using the supplied creative and factual sources. Use your own aesthetic judgement inside those constraints. Make each page visually distinctive and responsive.
