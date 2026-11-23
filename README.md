# ITSJPO Astro

## ITS JPO DOT Website

Welcome to the ITS JPO DOT Website project! This repository is dedicated to creating a collaborative platform for building and maintaining the ITS JPO DOT website. Our goal is to streamline the process of site development, making it easier for team members to contribute and create site builds efficiently.

### Key Features

- **Collaborative Development**: Leverage GitHub’s powerful collaboration tools to work together seamlessly.
- **Fast Site Builds**: Centeral location to speed up the build process, ensuring quick and reliable updates.
- **Modular Design**: Implement a modular architecture to simplify updates and maintenance.
- **Responsive Design**: Ensure the website is accessible and user-friendly across all devices.

### Newsroom filters

The In the News filters use a native text input and the local Vue
[MultiSelect](src/components/MultiSelect.vue), with no UI-library dependency.
The multiselect accepts string options and a string-array `v-model`, plus an
`id` and accessible `label`. Its presentation follows the Safety-Playbook branch's
checkbox dropdown: a rounded trigger displaying "All" or the selected option names,
a rotating chevron, and a Clear action inside the scrollable menu. Selected names
wrap rather than being truncated. Clicking an option's text or checkbox toggles it.
It retains native checkboxes,
arrow/Home/End navigation, and Escape, Tab-away, or outside-click dismissal.
The existing `in-the-news-filter-change` event still supplies `technologyAreas`
and `searchQuery` to the archive. Field and dropdown styling is maintained in the
component and the [archive page](src/pages/news-outreach-tools/newsroom/in-the-news/index.astro).

### Advanced Analytics and Super Intelligence program

The program pages are maintained in
[src/pages/research-areas/super-intelligence](src/pages/research-areas/super-intelligence).
Current program copy uses the approved SI terminology; historical publication,
webinar, contract, and project names retain their original AI terminology.
Existing document filenames and external resource links remain unchanged.

Legacy program URLs redirect to the corresponding new pages through
[astro.config.mjs](astro.config.mjs). The withdrawn program Contact page redirects
to the program home. Agency Case Studies is available under Learn & Connect,
linked from the SI home spotlight and the Learn & Connect resource card.
Its Nebraska and North Carolina PDF downloads are imported from
[src/assets/documents/advanced-analytics-and-si](src/assets/documents/advanced-analytics-and-si).

Run the program's route and content regression checks with
`node --test tests/super-intelligence.test.mjs`.

### Site-wide search

The shared DOT banner includes a search form on desktop and mobile.
Submitting opens `/search/?q=...`, with relevance-ranked page titles, excerpts,
and a Load more action. Queries can be shared or refined on the results page.

[Pagefind](https://pagefind.app/) indexes rendered HTML after both production
build commands. Search runs locally in the browser, with no search backend or
external search service. It includes published page text, including generated
content pages, but not PDF/document contents, external sites, or text loaded
only by client-side scripts. Shared header, navigation, sidebars, footer,
redirects, the 404 page, and the results page are excluded.

The [index configuration](pagefind.yml) controls shared element exclusions.
[BaseLayout](src/layouts/BaseLayout.astro) marks searchable pages; use
`searchable={false}` for utility pages that should not appear in results.
Changes become searchable after the next build.

To test full search, run `npm run build`, then `npm run preview`. Astro's dev
server alone does not generate a current index. Deploy the **entire** build
output, including `dist/pagefind/`; generated search assets are not committed.
Search requires JavaScript and reports asset/network failures explicitly.
The form, index requests, and result links support the configured `BASE_URL`.
After building, run `node --test tests/site-search.test.mjs` to check the actual
index coverage, exclusions, rendered page text, and shared search forms.

## Commands

All commands are run from the root of the project, from a terminal:
Required Node V19 or above (V22 recomended).

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
