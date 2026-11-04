# AI to SI Website Update Summary

Date: November 3, 2026

Source: `Copy of AI_to_SI_Language_Update_Tracker_ITS JPO_Website.xlsx`, including the guidance, website keyword scrub, and detailed content sheets.

## Scope

Updated website copy, including older ITS JPO newsletters and news announcements, from **Artificial Intelligence / AI** to **Super Intelligence / SI**, following both the "What Must Change" and "What Is Exempt" lists. A page, newsletter, or webinar's age alone does not exempt its current agency-authored website copy.

The branch already contained the renamed `super-intelligence` directory and SI page filenames. This update completes the remaining copy and links; it does not claim those earlier file moves as new work.

The initial migration covered 42 existing files. The subsequent exemption review revised **38 source files: 24 Astro pages and 14 Markdown content files**, plus this summary. No dependencies, image assets, PDFs, recordings, or workbook cells were changed.

## Exemption Rules Applied

- **Change:** current agency-authored titles, headings, paragraphs, promotional cards, summaries, metadata, and accessible labels on website pages, newsletters, news posts, training overviews, and webinar pages, including descriptions of past activity.
- **Previously issued regulations:** retain exact cited legal titles and original legal text rather than renaming the source instrument.
- **Existing contracts and grants:** retain original award/project titles and contractual company names. Current website explanations of those projects use SI; an award does not exempt all surrounding copy.
- **Historical documents and records:** preserve exact source quotations, cited archival report titles, sourced glossary definitions, original award tables, and verbatim speaker transcripts. Add a specific source or transcript note where needed, rather than exempting the entire page.
- **Third-party content:** preserve externally controlled names, direct quotations, source citations, company brands, and an external speaker's actual job title. Agency-authored descriptions around those references use SI.
- **Technical identifiers:** keep existing URLs, email addresses, CSS identifiers, fragment IDs, and asset filenames so links, downloads, styling, and contacts continue to work. A technical filename is not a reason to keep AI in a page's promotional copy.

## Changes by Area

| Area / Review File | Changes | Tracker Reference |
| --- | --- | --- |
| [Homepage](src/pages/index.astro) | Research-area label and image alternative text now read `Super Intelligence (SI)`; the link uses the SI route. | Keyword Scrub row 3; Content Detail row 41 |
| [Homepage carousel](src/components/layout/RotatingHero.astro) | Current September digest promotional copy now says `SI procurement webinar`. | Content Detail row 44 |
| [Navigation](src/lib/navigation.ts) | Main research-area label now reads `Super Intelligence`; corrected `Get sI-Ready` to `Get SI-Ready`. Existing SI overview, focus-area, and contact routes are preserved. | Content Detail rows 11, 13, 16, 51 |
| [Contact Us](src/pages/about/contact-us/index.astro) | Lisa Randall's program area now reads `Super Intelligence`. Contact details are unchanged. | Keyword Scrub rows 4-5 |
| [SI landing page](src/pages/research-areas/super-intelligence/index.astro) | Program copy, vision, mission, focus-area labels, and the webinar title and alt text use SI. Removed the blanket past-webinar exemption notice. Updated inactive program copy so it will not reintroduce AI if restored. | Content Detail rows 2-16; clarified exemption criteria |
| [SI overview](src/pages/research-areas/super-intelligence/overview/index.astro) | Overview heading, tiles, descriptions, and links now use SI. | Content Detail rows 17-18, 47-50 |
| [How SI Works](src/pages/research-areas/super-intelligence/overview/how-si-works.astro) | Page title, banner, headings, and explanatory copy now use SI. | Keyword Scrub row 7; Content Detail row 47 |
| [Where SI Advances Transportation](src/pages/research-areas/super-intelligence/overview/where-si-advances-transportation.astro) | Page title, banner, headings, and explanatory copy now use SI. | Keyword Scrub row 7; Content Detail row 48 |
| [SI Use Cases](src/pages/research-areas/super-intelligence/overview/si-use-cases.astro) | Page title, banner, headings, and use-case copy now use SI. | Keyword Scrub row 7; Content Detail row 49 |
| [JPO Implementation Approach](src/pages/research-areas/super-intelligence/overview/jpo-implementation-approach.astro) | Program name, page title, introductory copy, and implementation objectives now use SI. | Content Detail rows 19-24, 52-55 |
| [Focus Areas](src/pages/research-areas/super-intelligence/focus-areas/index.astro) | Banner, card labels, descriptions, alternative text, and internal links now use SI. | Content Detail rows 25-26 |
| [Get SI-Ready](src/pages/research-areas/super-intelligence/focus-areas/get-si-ready.astro) | Current data integration, readiness, risk, TEVV, procurement, and resource-card descriptions use SI. Promotional presentation labels use SI. Exact archival report names and the NIST AI Risk Management Framework name remain unchanged, with a narrower citation note. | Content Detail rows 27-29; clarified exemption criteria |
| [Put SI into Practice](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/index.astro) | Current funding, innovation, prototype, deployment, and project-brief copy now use SI; planning/design links use the renamed route. | Content Detail rows 30-33 |
| [SI Transportation Planning and Design](src/pages/research-areas/super-intelligence/focus-areas/put-si-into-practice/transportation-planning-design/index.astro) | Initiative heading, metadata, introductory copy, and acronym now use `SI TPD`; corrected the existing `Al TPD` / `Al-based` spellings in current prose. All project links point to existing SI routes. Awarded project titles and external award announcements remain unchanged, with a historical note. | Content Detail rows 34-37 |
| [Learn & Connect](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/index.astro) | Current readiness and resource summaries, webinar and slide-card headings, tags, alternative text, and promotional descriptions use SI. Original archival CMM report names and technical PDF paths remain unchanged. Removed the broad webinar-title exemption. | Content Detail rows 38-40; clarified exemption criteria |
| [SI Governance](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/si-governance.astro) | Page title, banner, headings, and governance explanation now use SI. External citations and URLs remain unchanged. | Keyword Scrub row 7 |
| [SI Definitions & Concepts](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/si-definitions-concepts.astro) | Page title, banner, and introductory copy now use SI. Sourced glossary entries remain verbatim, with a note explaining that this rename does not establish a new federal definition. | Keyword Scrub row 7; guidance exemptions |
| [SI Methods & Sub-Methods](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/si-methods-sub-methods.astro) | Page title, banner, headings, and current method descriptions now use SI. | Keyword Scrub row 7 |
| [Procurement Webinar](src/pages/research-areas/super-intelligence/focus-areas/learn-connect/si-procurement-national-webinar.astro) | Title, heading, agency staff roles, overview, takeaways, recording description, and iframe label use SI. Removed the blanket historical-event notice. Original recording and slide files remain unchanged; the Vermont speaker's externally controlled job title is retained. | Content Detail rows 9-10; clarified exemption criteria |
| [SI Contact](src/pages/research-areas/super-intelligence/contact.astro) | Program banner and contact-page description now use SI. | Keyword Scrub row 7 |
| [Intersection Safety](src/pages/research-areas/intersection-safety/index.astro) | Solution and initiative copy, technology heading, icon alternative text, and `SI/ML` terminology updated. | Keyword Scrub row 16 |
| [Intersection Safety Challenge](src/pages/research-areas/intersection-safety/challenge.astro) | Agency-authored summaries use SI. The exact InfraShield award title remains unchanged. The note now limits preservation to original team/award titles, not all project descriptions. | Keyword Scrub row 17; guidance exemptions |
| [ITS4US](src/pages/research-areas/ITS4US/index.astro) | Technology bullet now reads `Super Intelligence (SI) and Machine Learning (ML)`. | Keyword Scrub row 19 |
| [PCB Early Career](src/pages/resources/pcb/early-career/index.astro) | ITS Careers and Student Competitions descriptive copy now use SI. | Keyword Scrub row 52 |
| [Newsletter Archive](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/index.astro) | July, August Flash, and September listing descriptions use SI. Removed the blanket notice exempting historical newsletter issues. | Newsletter scope clarified during review |
| [November Newsletter](src/pages/about/contact-us/mailinglist/ITS-JPO-NOW/november-2026.astro) | Webinar link updated to the renamed SI page. Existing content, formatting, and heading sizes are preserved. | Internal-link continuity |
| [Redirect Configuration](astro.config.mjs) | Added 27 canonical legacy AI-to-SI page redirects and corrected the older short planning/design alias. All 28 entries specify status 301. | Content Detail rows 3, 17, 20, 25, 28, 31, 35, 38 |

## Historical Project Pages

For each of these 11 existing award/project pages, current agency-authored summaries, descriptive page titles, metadata, and technical explanations use SI. Exact original awarded titles, company names, logos, and contact information remain unchanged. The note now explicitly distinguishes contractual wording from surrounding website copy; project descriptions are no longer treated as automatically exempt.

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

The further exemption review also converted unquoted agency-authored session descriptions in September to SI. Exact quoted event/presentation titles retain their original wording. Remaining AI wording is limited to specific source references and technical identifiers, not a blanket historical exemption for newsletter content.

## Additional News and Training Changes

The conference schedule's current agency booth and topic descriptions now use SI: [ITSA Schedule](src/pages/about/itsa-schedule.astro). Its exact quoted presentation title remains a source reference. The homepage's remaining generic image label also now uses SI: [Homepage](src/pages/index.astro).

Updated current announcement prose and relevant metadata in these 13 Markdown news posts. Exact legal citations, direct attributed statements, original award tables, and archival report citations remain intact; specific source-preservation notes were added where applicable.

- [Complete Streets awards](src/content/posts/briefing-roomusdot-awards-2-million-12-small-businesses-csai-initiative.md)
- [ITS program webinar announcement](src/content/posts/meetingsai_its_webinar.htm.md)
- [Intersection Safety announcement](src/content/posts/press2022intersection_safety.htm.md)
- [Intersection Safety deadline](src/content/posts/press2023isc_1a_deadline.htm.md)
- [Intersection Safety competition](src/content/posts/press2023isc_competition.htm.md)
- [Intersection Safety webinar](src/content/posts/press2023isc_webinar.htm.md)
- [National Transportation Library publications](src/content/posts/press2023ntl_publications.htm.md)
- [Safety at intersections](src/content/posts/press2023safety_intersections.htm.md)
- [Deployment awards announcement](src/content/posts/Press20241029.md)
- [ITS-enabled webinar announcement](src/content/posts/press2024ai_its_webinar.htm.md)
- [Complete Streets initiative announcement](src/content/posts/press2024complete_streets_ai.htm.md)
- [Request for public input](src/content/posts/press2024dot_ai.htm.md)
- [Program manager vacancy](src/content/posts/press2024its_program_manager_vacancy.htm.md)

Updated the agency-authored [ATTRI training overview](src/content/pcb/trainings/transit-standards/transit-module-18.md) to use SI. Linked original presentation, transcript, and supplement files were not renamed or edited.

The [Crowdsourcing Part 2](src/pages/resources/pcb/trainings/cs4ops/part-2.astro) and [Part 4](src/pages/resources/pcb/trainings/cs4ops/part-4.astro) Q&A passages are explicitly identified as historical speaker transcripts. Those verbatim questions and answers retain their original terminology; this does not exempt ordinary training-page promotional copy.

## Review Decisions and Remaining Work

- **Newsletter eligibility:** older newsletters remain in scope. Exemptions are applied to individual cited documents, titles, or third-party material, not automatically to an entire issue. This corrects the earlier broad historical-newsletter interpretation.
- **Current webinar pages:** current agency-authored webinar titles, promotional headings, resource descriptions, and accessible labels use SI, including the landing-page spotlight. Past event dates alone no longer justify an exemption. Original recordings and specifically cited archival source materials remain unchanged.
- **Glossary:** original sourced definitions and legal citations remain unchanged. An approved federal SI definition was not supplied in the workbook, so none was invented or substituted for the historical AI definition.
- **Images and multimedia:** existing graphics may still visibly contain AI text, including the planning/design logo and older resource thumbnails. Replacement artwork, edited recordings, and revised slide decks require approved source assets. File paths were deliberately not renamed.
- **External applications:** the Deployment Evaluation website and SCRC content are outside this repository's edited surfaces. The SCRC `About SCRC` / `What Are ITS?` findings and deeper external-site audit remain pending with their owners. External CodeHub/DataHub applications were not modified.
- **Hosting redirects:** Astro is configured for static output. Status 301 in configuration does not by itself prove an HTTP 301 on the production host; the hosting layer must honor permanent redirects. Legacy uppercase URL variants also need host-level normalization. Duplicate case/trailing-slash entries were avoided because they collide in Astro's static router.
- **Unchanged materials:** original PDFs, reports, regulations, contracts, grants, third-party company names such as `Opal AI Inc.` and `VELO.AI, INC.`, email addresses, external URLs, CSS classes, and source asset filenames remain unchanged.

## Verification

- **Final exemption-review Astro check:** 198 files, **0 errors, 0 warnings, 98 hints**.
- **Focused Astro compilation:** 43 affected/reviewed pages compiled; the subsequent five exact-title/transcript-note corrections also compiled. Final source-title corrections are covered by the full check above.
- **Markdown checks:** all 14 edited Markdown files passed YAML parsing and Markdown rendering before writing. A saved-file check also rendered all 15 SI-bearing news/training files in the tested set successfully.
- **Preservation audit:** all 38 source files changed in this review retain their original URLs, email addresses, image imports, and stylesheet imports. Five direct attributed quotations and five AI-bearing original award titles were explicitly compared with the branch baseline and preserved.
- **Remaining-text audit:** rendered Astro copy and accessible labels were reviewed; remaining AI wording is confined to exact source citations/quotations, original awarded titles, company/external staff names, sourced glossary definitions, verbatim Q&A, and technical identifiers.

### Earlier Migration Checks

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