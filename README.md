# ITSJPO Astro

## ITS JPO DOT Website

Welcome to the ITS JPO DOT Website project! This repository is dedicated to creating a collaborative platform for building and maintaining the ITS JPO DOT website. Our goal is to streamline the process of site development, making it easier for team members to contribute and create site builds efficiently.

### Key Features

- **Collaborative Development**: Leverage GitHub’s powerful collaboration tools to work together seamlessly.
- **Fast Site Builds**: Centeral location to speed up the build process, ensuring quick and reliable updates.
- **Modular Design**: Implement a modular architecture to simplify updates and maintenance.
- **Responsive Design**: Ensure the website is accessible and user-friendly across all devices.

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

## Safety Playbook Content Template

Safety Playbook entries are managed as Astro content collection markdown files in `src/content/safety-playbook/`.
Add new files using this frontmatter template:

```md
---
title: Example ITS Tool Name
category: Road Weather
shortDescription: One short summary used on cards.
additionalToolsSensors:
	- Sensor or supporting tool
location:
	- Urban
facility:
	- Intersection
safety:
	- Road Weather Safety
keywords:
	- Keyword phrase
resources:
	- label: Resource name
		url: https://example.com
order: 10
---
Write the long description and implementation details in markdown body content.
```

Notes:
- `category` is used as the primary filter.
- `location`, `facility`, and `safety` are multi-select filters.
- `order` is optional and controls display order before alphabetical title sorting.



