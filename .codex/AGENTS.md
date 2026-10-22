# ITS JPO Astro Agent Guide

Use this file as the default operating context for AI coding agents working in this repository.

## Technologies In This Repository

- Astro 5 (static site output) with TypeScript.
- Vue 3 components are used for interactive UI.
- Astro React integration exists, but Astro and Vue patterns are primary.
- Bootstrap 5 and Sass are used for layout and styling.
- ESLint with Astro + TypeScript rules is configured.
- Content-driven pages use JSON and Astro content collections.

## Repository Structure

- `src/pages/`: Route files and page-level composition.
- `src/components/`: Reusable Astro and Vue UI components.
- `src/layouts/`: Shared page wrappers (`BaseLayout`, `PageLayout`, etc.).
- `src/content/`: Content and JSON data sources used by pages.
- `src/lib/`: Shared utilities (navigation, props, base URL helpers, toolkit mapping).
- `src/styles/`: Shared CSS files.
- `public/`: Static assets served directly.
- `README.md`: Project overview and common developer commands.

## Core Commands

Run from the repository root.

- `npm.cmd install`
- `npm.cmd run dev`
- `npm.cmd run build`
- `npm.cmd run preview`
- `npm.cmd run astro -- check`

## Accessibility Requirement (WCAG)

All UI and content changes must meet WCAG 2.1 AA standards at minimum.

When editing pages or components, enforce these checks:

- Use semantic HTML and correct heading order.
- Ensure keyboard access for controls, menus, dialogs, and filters.
- Provide accessible names and labels for form fields and interactive elements.
- Include and preserve `aria-*` relationships where needed (`aria-expanded`, `aria-controls`, `aria-labelledby`).
- Ensure sufficient color contrast and visible focus states.
- Provide descriptive alt text for meaningful images.
- Avoid relying on color alone to convey meaning.

If a feature cannot fully meet WCAG yet, call it out clearly in the change summary with a follow-up action.

## Working Conventions For Agents

- Prefer existing component and layout patterns over introducing new abstractions.
- Keep changes scoped; avoid broad refactors unless requested.
- Validate affected files after edits and run `npm.cmd run astro -- check` when feasible.
- Link to existing docs instead of duplicating them:
	- [README.md](../README.md)
	- [src/content.config.ts](../src/content.config.ts)
