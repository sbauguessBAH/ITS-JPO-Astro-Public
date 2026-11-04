# AI to SI Website Update Summary

Date: November 3, 2026

Source: `Copy of AI_to_SI_Language_Update_Tracker_ITS JPO_Website.xlsx`, including the guidance, website keyword scrub, and detailed content sheets.

## Scope

Updated website copy, including older ITS JPO newsletters, from **Artificial Intelligence / AI** to **Super Intelligence / SI**, following the workbook's specific exemptions for historical documents, existing awards, and third-party content. A newsletter's age alone does not exempt its agency-authored copy from this update.

The branch already contained the renamed `super-intelligence` directory and SI page filenames. This update completes the remaining copy and links; it does not claim those earlier file moves as new work.

42 existing files changed: 40 Astro files, the navigation data, and Astro configuration. This summary is the only new deliverable file. No dependencies, image assets, PDFs, or workbook cells were changed.

## Changes by Area

| Area / Review File | Changes | Tracker Reference |
| --- | --- | --- |
| [Homepage](src/pages/index.astro) | Research-area label and image alternative text now read `Super Intelligence (SI)`; the link uses the SI route. | Keyword Scrub row 3; Content Detail row 41 |
| [Homepage carousel](src/components/layout/RotatingHero.astro) | Current September digest promotional copy now says `SI procurement webinar`. | Content Detail row 44 |
| [Navigation](src/lib/navigation.ts) | Main research-area label now reads `Super Intelligence`; corrected `Get sI-Ready` to `Get SI-Ready`. Existing SI overview, focus-area, and contact routes are preserved. | Content Detail rows 11, 13, 16, 51 |
| [Contact Us](src/pages/about/contact-us/index.astro) | Lisa Randall's program area now reads `Super Intelligence`. Contact details are unchanged. | Keyword Scrub rows 4-5 |
| [SI landing page](src/pages/research-areas/super-intelligence/index.astro) | Page title, banner, transformation heading, program name, body copy, vision, mission, and focus-area labels/descriptions now use SI. Focus-area and webinar links point to renamed pages. Added a historical webinar-title note. | Content Detail rows 2-16 |
| [SI overview](src/pages/research-areas/super-intelligence/overview/index.astro) | Overview heading, tiles, descriptions, and links now use SI. | Content Detail rows 17-18, 47-50 |
| [How SI Works](src/pages/research-areas/super-intelligence/overview/how-si-works.astro) | Page title, banner, headings, and explanatory copy now use SI. | Keyword Scrub row 7; Content Detail row 47 |
| [Where SI Advances Transportation](src/pages/research-areas/super-intelligence/overview/where-si-advances-transportation.astro) | Page title, banner, headings, and explanatory copy now use SI. | Keyword Scrub row 7; Content Detail row 48 |
| [SI Use Cases](src/pages/research-areas/super-intelligence/overview/si-use-cases.astro) | Page title, banner, headings, and use-case copy now use SI. | Keyword Scrub row 7; Content Detail row 49 |
| [JPO Implementation Approach](src/pages/research-areas/super-intelligence/overview/jpo-implementation-approach.astro) | Program name, page title, introductory copy, and implementation objectives now use SI. | Content Detail rows 19-24, 52-55 |
| [Focus Areas](src/pages/research-areas/super-intelligence/focus-areas/index.astro) | Banner, card labels, descriptions, alternative text, and internal links now use SI. | Content Detail rows 25-26 |
| [Get SI-Ready](src/pages/research-areas/super-intelligence/focus-areas/get-si-ready.astro) | Current data integration, readiness, risk, TEVV, and procurement copy now use SI. Published resource names remain unchanged, with a historical-resource note. The official NIST AI Risk Management Framework name is retained. | Content Detail rows 27-29 |
| [Put SI into Practice](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/index.astro) | Current funding, innovation, prototype, deployment, and project-brief copy now use SI; planning/design links use the renamed route. | Content Detail rows 30-33 |
| [SI Transportation Planning and Design](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/index.astro) | Initiative heading, metadata, introductory copy, and acronym now use `SI TPD`; corrected the existing `Al TPD` / `Al-based` spellings in current prose. All project links point to existing SI routes. Awarded project titles and external award announcements remain unchanged, with a historical note. | Content Detail rows 34-37 |
| [Learn & Connect](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/index.astro) | Current implementation, readiness, CMM development, knowledge-sharing, and informational-material copy now use SI. Updated internal resource links; retained published report and webinar titles with a note. | Content Detail rows 38-40 |
| [SI Governance](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/si-governance.astro) | Page title, banner, headings, and governance explanation now use SI. External citations and URLs remain unchanged. | Keyword Scrub row 7 |
| [SI Definitions & Concepts](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/si-definitions-concepts.astro) | Page title, banner, and introductory copy now use SI. Sourced glossary entries remain verbatim, with a note explaining that this rename does not establish a new federal definition. | Keyword Scrub row 7; guidance exemptions |
| [SI Methods & Sub-Methods](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/si-methods-sub-methods.astro) | Page title, banner, headings, and current method descriptions now use SI. | Keyword Scrub row 7 |
| [Procurement Webinar](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/si-procurement-national-webinar.astro) | Program banner and generic page title use SI. Retained the historical event title, agenda, and materials; added an explicit historical-event note. | Content Detail rows 9-10 and reviewer comments |
| [SI Contact](src/pages/research-areas/super-intelligence/contact.astro) | Program banner and contact-page description now use SI. | Keyword Scrub row 7 |
| [Intersection Safety](src/pages/research-areas/intersection-safety/index.astro) | Solution and initiative copy, technology heading, icon alternative text, and `SI/ML` terminology updated. | Keyword Scrub row 16 |
| [Intersection Safety Challenge](src/pages/research-areas/intersection-safety/challenge.astro) | General challenge summary now uses SI. Submitted team/project names and descriptions retain their original wording, with a historical note. | Keyword Scrub row 17; guidance exemptions |
| [ITS4US](src/pages/research-areas/ITS4US/index.astro) | Technology bullet now reads `Super Intelligence (SI) and Machine Learning (ML)`. | Keyword Scrub row 19 |
| [PCB Early Career](src/pages/resources/pcb/early-career/index.astro) | ITS Careers and Student Competitions descriptive copy now use SI. | Keyword Scrub row 52 |
| [Newsletter Archive](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/index.astro) | July, August Flash, and September listing descriptions use SI. Removed the blanket notice exempting historical newsletter issues. | Newsletter scope clarified during review |
| [November Newsletter](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/november-2026.astro) | Webinar link updated to the renamed SI page. Existing content, formatting, and heading sizes are preserved. | Internal-link continuity |
| [Redirect Configuration](astro.config.mjs) | Added 27 canonical legacy AI-to-SI page redirects and corrected the older short planning/design alias. All 28 entries specify status 301. | Content Detail rows 3, 17, 20, 25, 28, 31, 35, 38 |

## Historical Project Pages

For each of these 11 existing award/project pages, updated the program banner and generic intelligence keyword, and added a historical-content note. Awarded titles, project descriptions, company names, logos, and contact information remain unchanged under the workbook's exemptions.

- [ACES](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/aces-comprehensive-streets.astro)
- [Complete Pavement Markings](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/complete-pavement-markings.astro)
- [CURBS-AID](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/curbs-aid-intelligent-design.astro)
- [Infrastructure Interventions](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/infrastructure-interventions-near-miss.astro)
- [Safe Routes for All](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/safe-routes-for-all.astro)
- [SAMMI](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/sammi-multimodal-mobility.astro)
- [Scalable and Sustainable Solutions](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/scalable-sustainable-si-solutions.astro)
- [Processing and Analysis Framework](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/si-processing-analysis-framework.astro)
- [Transportation Planning and Design](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/si-transportation-planning-design.astro)
- [Skylite Geo LLM](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/skylite-geollm-platform.astro)
- [Urbanomy](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/projects/urbanomy-si-decision-support.astro)

## Newsletter Scope Correction

Older mailing-list newsletters are included in the SI migration. Removed the blanket historical-newsletter notices from all four issues below; updated agency-authored prose, descriptive article headings, link labels, alternative text, and metadata wherever applicable. URLs, asset filenames, and article fragment IDs were not changed.

- [May](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/may-2026.astro): conference-booth promotional copy now refers to SI and V2X technology. The exact cited presentation title, `Bridging the Gap: USDOT Resources for Trustworthy AI Implementations`, remains unchanged.
- [July](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/july-2026.astro): program names, staff role, website-revamp story, decision-making technology, webinar summaries, recording-link labels, alternative text, and keywords now use SI. Exact quoted webinar/presentation titles retain their original wording.
- [August Flash](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/august-2026-flash.astro): procurement copy, keywords, description, alternative text, and the descriptive headline now use SI. The headline is `National Webinar on SI Procurement`, rather than a rewritten quotation of the original event title.
- [September](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/september-2026.astro): program references, the planning/design initiative, decision-making technology, procurement copy, descriptive headings, alternative text, and metadata now use SI. RIDOT's original third-party event/session names and exact cited presentation/resource titles retain their original wording.

The remaining AI wording in these newsletter pages is limited to specific source titles, third-party event/session names, and technical references such as URLs and fragment IDs, not a blanket historical exemption for newsletter content.

## Review Decisions and Remaining Work

- **Newsletter eligibility:** older newsletters remain in scope. Exemptions are applied to individual cited documents, titles, or third-party material, not automatically to an entire issue. This corrects the earlier broad historical-newsletter interpretation.
- **Historical webinar:** retained the recording promotion and original event title, rather than retroactively renaming it. The tracker reviewer suggested removing the past-event promotion; removal remains an editorial decision. Current surrounding promotional copy uses SI.
- **Glossary:** original sourced definitions and legal citations remain unchanged. An approved federal SI definition was not supplied in the workbook, so none was invented or substituted for the historical AI definition.
- **Images and multimedia:** existing graphics may still visibly contain AI text, including the planning/design logo and older resource thumbnails. Replacement artwork, edited recordings, and revised slide decks require approved source assets. File paths were deliberately not renamed.
- **External applications:** the Deployment Evaluation website and SCRC content are outside this repository's edited surfaces. The SCRC `About SCRC` / `What Are ITS?` findings and deeper external-site audit remain pending with their owners. External CodeHub/DataHub applications were not modified.
- **Hosting redirects:** Astro is configured for static output. Status 301 in configuration does not by itself prove an HTTP 301 on the production host; the hosting layer must honor permanent redirects. Legacy uppercase URL variants also need host-level normalization. Duplicate case/trailing-slash entries were avoided because they collide in Astro's static router.
- **Unchanged materials:** original PDFs, reports, regulations, contracts, grants, third-party company names such as `Opal AI Inc.` and `VELO.AI, INC.`, email addresses, external URLs, CSS classes, and source asset filenames remain unchanged.

## Verification

- Full Astro check for the initial migration, before the newsletter follow-up: **198 files, 0 errors, 0 warnings, 98 hints**. Existing unused-import and similar hints were not cleaned up as part of this language-only change.
- Initial migration compiler check: **all 40 changed Astro files compile**.
- Newsletter follow-up compiler check: **all five updated pages compile** (May, July, August Flash, September, and the archive index); the four blanket historical-newsletter notices were removed.
- Newsletter wording audit: **all seven newsletter pages reviewed**; remaining AI wording in rendered text and accessible labels matches the explicit list of retained cited titles and third-party event/session names.
- Link audit: **29 SI href references checked**, with existing destination pages.
- Redirect audit: **28 unique legacy redirect entries**, all status 301 and all pointing to existing SI pages.
- Local browser redirect checks: the legacy AI landing page and `overview/how-ai-works/` both returned **HTTP 301** and reached their SI destinations.
- Protected-reference comparison: **external URLs, email addresses, image imports, and stylesheet imports unchanged** in changed Astro files, apart from deliberately updated internal website routes.
- Source search: no old `/research-areas/artificial-intelligence` internal route references remain under `src`.
- Browser review: the SI landing page displays the updated program title, navigation, and focus-area labels. Desktop and mobile checks found no horizontal overflow; the mobile screenshot was reviewed.
- Production HTTP redirects, visual artwork updates, and external application changes were not verified by these checks.