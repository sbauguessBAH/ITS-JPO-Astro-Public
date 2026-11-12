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
