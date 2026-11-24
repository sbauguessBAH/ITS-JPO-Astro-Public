# SI Updates Outside the AI Program

Date: November 4, 2026

Branch: `feature/si-outside-ai-program`

Base: `main`

Source: outside-program SI changes from `feature/ai-to-si` at `7eaf81f`. The original branch retains the complete SI migration and has not been changed by this split.

## Included

Agency-authored SI terminology updates outside the AI program, retaining the reviewed exemptions for exact source quotations, awarded project titles, legal citations, archival documents, and externally controlled names.

- [Homepage](src/pages/index.astro) and [carousel](src/components/layout/RotatingHero.astro): public-facing research-area and newsletter promotional wording.
- [Contact Us](src/pages/about/contact-us/index.astro): Lisa Randall's program-area description.
- [Newsletter archive](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/index.astro), [May](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/may-2026.astro), [July](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/july-2026.astro), [August Flash](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/august-2026-flash.astro), and [September](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/september-2026.astro): agency-authored SI wording, metadata, headings, labels, and descriptions.
- [ITSA schedule](src/pages/about/itsa-schedule.astro): agency booth and topic descriptions.
- [Intersection Safety](src/pages/research-areas/intersection-safety/index.astro) and [Challenge](src/pages/research-areas/intersection-safety/challenge.astro): agency-authored technology descriptions; original awarded titles remain intact.
- [ITS4US](src/pages/research-areas/ITS4US/index.astro) and [PCB Early Career](src/pages/resources/pcb/early-career/index.astro): general technology descriptions.
- News announcement copy under `src/content/posts/`: 13 reviewed Markdown posts, preserving attributed quotations, award tables, legal titles, and archival report citations.
- [ATTRI training overview](src/content/pcb/trainings/transit-standards/transit-module-18.md): agency-authored technology description.
- [Crowdsourcing Part 2](src/pages/resources/pcb/trainings/cs4ops/part-2.astro) and [Part 4](src/pages/resources/pcb/trainings/cs4ops/part-4.astro): specific historical-transcript notes; original speaker Q&A remains unchanged.

## Deferred and Unchanged

- All AI program pages remain exactly as on `main`, under their original artificial-intelligence paths. The `super-intelligence` directory and program-page renames are not included.
- [Navigation](src/lib/navigation.ts) remains exactly as on `main`, including the original AI program names and child-page links.
- [Astro configuration](astro.config.mjs) remains exactly as on `main`. The AI-to-SI program redirects are not included.
- Outside-page links continue to target existing AI program URLs, even where their surrounding public-facing copy uses SI. The homepage link and November newsletter webinar link do not depend on deferred SI routes.
- Assets, PDFs, videos, email addresses, technical identifiers, and externally controlled names were not renamed or edited as part of this split.

## First-Use Terminology

Updated November 5, 2026: the first reader-facing use of SI on each in-scope page is introduced as **Super Intelligence (SI)**. Later mentions may use SI alone. Metadata or a later expansion does not substitute for introducing the term in the visible content.

The schedule, newsletter/archive pages, and news introductions were checked in reading order. Where image alternative text appears before the visible introduction, it also spells out the term. The deferred AI program and quoted source titles remain unchanged.

Validation: all 13 in-scope Astro pages/components and eight Markdown pages containing reader-facing SI passed the first-use audit, including both earlier image alternative-text occurrences. Edited Astro pages compile, and the four updated Markdown introductions pass frontmatter parsing and rendering.

## Review

Compare this branch with `main` to review only the outside-program work. The complete program migration remains available separately on `feature/ai-to-si`.

The earlier full-program validation results belong to the original branch; they are not presented as verification of this isolated branch.

## Verification for This Branch

- 29 changed source files checked: 15 Astro files compiled and 14 Markdown files passed frontmatter parsing and rendering.
- AI program files, navigation, and redirect configuration verified identical to `main`.
- No outside-page links depend on the deferred `/research-areas/super-intelligence` routes.
- URLs, email addresses, source image imports, and stylesheet imports verified unchanged from `main`.
- Original `feature/ai-to-si` branch verified unchanged at `7eaf81f`.
- All 18 local review links in this summary resolve to existing files.
- Full Astro check: 199 files, 0 errors, 0 warnings, 101 hints.