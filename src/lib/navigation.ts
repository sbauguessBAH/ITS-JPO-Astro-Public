import type {
  AnyNavigationItem,
  BreadcrumbItem,
  ChildNavigationItem,
  NavigationItem,
} from "../types";

/**
 * Navigation Items contains all main menu and sidebar items to display on the site
 */
export const navigation: NavigationItem[] = [
  {
    name: "About",
    pages: [
      { isEnabled: true, name: "About ITS JPO", url: "/about" },
      { name: "Contact Us", url: "/about/contact-us" },
      {
        isEnabled: true,
        name: "ITS Program Advisory Committee (ITSPAC)",
        pages: [
          { name: "ITSPAC Home", url: "/about/itspac" },
          { name: "Charter", url: "/about/itspac/charter" },
        ],
        url: "/about/itspac",
      },
      {
        isEnabled: true,
        name: "Join Our Mailing List",
        pages: [
          {
            name: "ITS JPO NOW",
            pages: [
              {
                name: "May 2026",
                url: "/about/contact-us/mailinglist/ITS-JPO-NOW/may-2026",
              },
            ],
            url: "/about/contact-us/mailinglist/ITS-JPO-NOW",
          },
        ],
        url: "/about/contact-us/mailinglist",
      },
    ],
    url: "/about",
  },

  {
    name: "News & Info",
    pages: [
      {
        isExternal: true,
        name: "Latest News from USDOT",
        url: "https://www.transportation.gov/newsroom",
      },
      { name: "Image Library", url: "/news-info/image-library" },
      { name: "Video Library", url: "/news-info/video-library" },
      {
        isEnabled: true,
        name: "Publication Editorial Guidelines",
        url: "/news-info/Publication-Editorial-Guidelines",
      },
    ],
    url: "/news-info",
  },
  {
    name: "Research Areas",
    pages: [
      {
        isEnabled: true,
        name: "Artificial Intelligence",
        pages: [
          { name: "Home", url: "/research-areas/Artificial-Intelligence" },
          {
            isEnabled: true,
            name: "Overview",
            pages: [
              {
                name: "How Does AI Work",
                url: "/research-areas/Artificial-Intelligence/overview/how-ai-works",
              },
              {
                name: "Where Can AI Advance Transportation",
                url: "/research-areas/Artificial-Intelligence/overview/where-ai-advances-transportation",
              },
              {
                name: "What Are AI Transportation Use Cases",
                url: "/research-areas/Artificial-Intelligence/overview/ai-use-cases",
              },
              {
                name: "What Is The JPO AI Implementation Approach",
                url: "/research-areas/Artificial-Intelligence/overview/jpo-implementation-approach",
              },
            ],
            url: "/research-areas/Artificial-Intelligence/overview",
          },
          {
            isEnabled: true,
            name: "Focus Areas",
            pages: [
              {
                name: "Get AI-Ready",
                url: "/research-areas/Artificial-Intelligence/focus-areas/get-ai-ready",
              },
              {
                name: "Put AI into Practice",
                url: "/research-areas/Artificial-Intelligence/focus-areas/put-ai-into-practice",
              },
              {
                isEnabled: true,
                name: "Learn & Connect",
                pages: [
                  {
                    name: "AI Governance",
                    url: "/research-areas/Artificial-Intelligence/focus-areas/learn-connect/ai-governance",
                  },
                  {
                    name: "AI Definitions & Concepts",
                    url: "/research-areas/Artificial-Intelligence/focus-areas/learn-connect/ai-definitions-concepts",
                  },
                  {
                    name: "AI Methods & Sub-Methods",
                    url: "/research-areas/Artificial-Intelligence/focus-areas/learn-connect/ai-methods-sub-methods",
                  },
                ],
                url: "/research-areas/Artificial-Intelligence/focus-areas/learn-connect",
              },
            ],
            url: "/research-areas/Artificial-Intelligence/focus-areas",
          },
        ],
        url: "/research-areas/Artificial-Intelligence",
      },
      {
        name: "Automation Program",
        pages: [
          {
            name: "Overview",
            url: "/research-areas/automation-program",
          },
          {
            name: "Focus Areas",
            pages: [
              {
                name: "Cooperative Driving Automation (CDA)",
                url: "/research-areas/automation-program/focus-areas/cda",
              },
              {
                name: "Analysis, Modeling and Simulation (AMS)",
                url: "/research-areas/automation-program/focus-areas/ams",
              },
              {
                name: "Human Factors",
                url: "/research-areas/automation-program/focus-areas/human-factors",
              },
              {
                name: "Automated Driving System (ADS) Integration",
                url: "/research-areas/automation-program/focus-areas/ads",
              },
            ],
            url: "/research-areas/automation-program/focus-areas",
          },
          {
            hasGeneratedChildItems: true,
            name: "Resources",
            url: "/research-areas/automation-program/resources",
          },
        ],
        url: "/research-areas/automation-program",
      },
      {
        name: "Interoperable Connectivity/Spectrum",
        url: "/research-areas/Interoperable-Connectivity-Spectrum",
      },
      {
        name: "Intersection Safety",
        pages: [
          {
            name: "Overview",
            url: "/research-areas/intersection-safety",
          },
          {
            name: "Intersection Safety Challenge",
            url: "/research-areas/intersection-safety/challenge",
          },
          {
            name: "Intersection Safety Systems",
            url: "/research-areas/intersection-safety/systems",
          },
        ],
        url: "/research-areas/intersection-safety",
      },
      {
        isEnabled: true,
        name: "ITS4US Program",
        pages: [
          { name: "ITS4US Home", url: "/research-areas/ITS4US" },
          { name: "Program Overview", url: "/research-areas/ITS4US/overview" },
          {
            isEnabled: true,
            name: "Deployments",
            pages: [
              {
                name: "Heart of Iowa Regional Transit Agency",
                url: "/research-areas/ITS4US/deployments/iowa",
              },
              {
                name: "Georgia Department of Transportation",
                url: "/research-areas/ITS4US/deployments/georgia",
              },
              {
                name: "University of Washington",
                url: "/research-areas/ITS4US/deployments/washington",
              },
              {
                name: "Niagara Frontier Transportation Authority",
                url: "/research-areas/ITS4US/deployments/newYork",
              },
            ],
            url: "/research-areas/ITS4US/deployments",
          },
          { name: "Videos", url: "/research-areas/ITS4US/videos" },
          { name: "Documentation", url: "/research-areas/ITS4US/documents" },
          {
            name: "Upcoming Activities",
            url: "/research-areas/ITS4US/upcoming",
          },
        ],
        url: "/research-areas/ITS4US",
      },
      {
        name: "Vehicle-to-Everything (V2X)",
        pages: [
          { name: "Home", url: "/research-areas/V2X-Deployment" },
          {
            isEnabled: true,
            name: "Overview",
            pages: [
              {
                name: "How V2X Works",
                url: "/research-areas/V2X-Deployment/overview/how-v2x-works",
              },
              {
                name: "Why V2X is Needed",
                url: "/research-areas/V2X-Deployment/overview/why-v2x",
              },
              {
                isEnabled: true,
                name: "V2X Applications and Use Cases",
                pages: [
                  {
                    name: "Safety",
                    url: "/research-areas/V2X-Deployment/overview/v2x-applications/safety",
                  },
                  {
                    name: "Commercial Vehicle",
                    url: "/research-areas/V2X-Deployment/overview/v2x-applications/commercial-vehicle",
                  },
                  {
                    name: "Mobility",
                    url: "/research-areas/V2X-Deployment/overview/v2x-applications/mobility",
                  },
                  {
                    name: "Data Collection",
                    url: "/research-areas/V2X-Deployment/overview/v2x-applications/data-collection",
                  },
                ],
                url: "/research-areas/V2X-Deployment/overview/v2x-applications",
              },
            ],
            url: "/research-areas/V2X-Deployment/overview",
          },
          {
            isEnabled: true,
            name: "Research",
            pages: [
              {
                name: "LTE-V2X Analysis",
                url: "/research-areas/V2X-Deployment/research/lte-v2x",
              },
              {
                name: "DSRC V2X Analysis Archive",
                url: "/research-areas/V2X-Deployment/research/dsrc",
              },
              {
                name: "Interoperability Testing",
                url: "/research-areas/V2X-Deployment/research/interoperability",
              },
            ],
            url: "/research-areas/V2X-Deployment/research",
          },
          {
            isEnabled: true,
            name: "Deployment",
            pages: [
              {
                name: "V2X Accelerator (2024 – present)",
                pages: [
                  {
                    name: "Overview",
                    url: "/research-areas/V2X-Deployment/deployment/accelerator",
                  },
                  {
                    name: "Documentation",
                    url: "/research-areas/V2X-Deployment/deployment/accelerator/documentation",
                  },
                  {
                    name: "Maricopa County",
                    url: "/research-areas/V2X-Deployment/deployment/accelerator/maricopa-county",
                  },
                  {
                    name: "Texas A&M",
                    url: "/research-areas/V2X-Deployment/deployment/accelerator/texas-am",
                  },
                  {
                    name: "Utah DOT",
                    url: "/research-areas/V2X-Deployment/deployment/accelerator/utah-dot",
                  },
                ],
                url: "/research-areas/V2X-Deployment/deployment/accelerator",
              },
              {
                isExternal: true,
                name: "Connected Vehicle Pilot Program",
                url: "https://its.dot.gov/scrc/#/technology-areas/v2x/cv-pilot-program",
              },
              {
                name: "Safety Pilot",
                url: "/research-areas/V2X-Deployment/deployment/safety-pilots",
              },
            ],
            url: "/research-areas/V2X-Deployment/deployment",
          },
          {
            isEnabled: true,
            name: "Contact",
            url: "/research-areas/V2X-Deployment/V2X-contact",
          },
        ],
        url: "/research-areas/V2X-Deployment",
      },
    ],
    url: "/research-areas",
  },
  {
    name: "Resources/Technical Assistance",
    pages: [
      {
        isEnabled: true,
        name: "Architecture and Standards",
        pages: [
          { name: "Overview", url: "/resources/architecture-and-standards" },
          {
            name: "National ITS Reference Architecture",
            url: "/resources/architecture-and-standards/reference-architecture",
          },
          {
            name: "Standards",
            url: "/resources/architecture-and-standards/standards",
          },
        ],
        url: "/resources/architecture-and-standards",
      },
      { name: "Cybersecurity", url: "/resources/Cybersecurity" },
      {
        name: "Deployment Evaluation",
        url: "/resources/Deployment-Evaluation",
      },
      {
        name: "National Transportation Library",
        url: "/resources/national-transportation-library",
      },
      {
        name: "Professional Capacity Building",
        pages: [
          {
            name: "Overview",
            url: "/resources/pcb",
          },
          {
            hasGeneratedChildItems: true,
            name: "Trainings",
            url: "/resources/pcb/trainings",
          },
          {
            name: "Microlearning Videos",
            url: "/resources/pcb/microlearning",
          },
          {
            name: "Early Career Development",
            pages: [
              {
                name: "Introduction to Intelligent Transportation Systems (ITS)",
                url: "/resources/pcb/early-career/introduction-to-its",
              },
              {
                name: "Applying Systems Engineering to ITS Projects",
                url: "/resources/pcb/early-career/applying-se-to-its-projects",
              },
            ],
            url: "/resources/pcb/early-career",
          },
          {
            name: "Technical Assistance",
            pages: [
              {
                name: "V2X Interoperability Help Desk",
                url: "/resources/pcb/technical-assistance/help-desk",
              },
              {
                name: "Connected and Automated Vehicle Education (CAVe)",
                url: "/resources/pcb/technical-assistance/cave",
              },
              {
                name: "Accelerating V2X Cohort",
                url: "/resources/pcb/technical-assistance/v2x-cohort",
              },
            ],
            url: "/resources/pcb/technical-assistance",
          },
          {
            hasGeneratedChildItems: true,
            name: "Peer Exchanges",
            url: "/resources/pcb/peer-exchanges",
          },
          // {
          //   name: 'Academic Resources',
          //   url: '/resources/pcb/academic-resources',
          //   hasGeneratedChildItems: true
          // },
          // {
          //   name: 'Accelerating V2X Cohort',
          //   url: '/resources/pcb/v2x-cohort'
          // },
          // {
          //   name: 'Webinars',
          //   url: 'https://www.its.dot.gov/pcb/itscourses/default.aspx',
          //   isExternal: true
          //  }
        ],
        url: "/resources/pcb",
      },
      {
        isExternal: true,
        name: "Smart Community Resource Center",
        url: "https://www.its.dot.gov/scrc",
      },
      {
        isExternal: true,
        name: "ITS CodeHub",
        url: "https://www.its.dot.gov/code",
      },
      {
        isExternal: true,
        name: "ITS DataHub",
        url: "https://www.its.dot.gov/data",
      },
    ],
    url: "/resources",
  },
];

/**
 * Compare the pathname to see if it matches the passed-in page URL
 * This is necessary since discrepancies with slashes or base paths may exist
 * @param currentPath pathname from Astro.url.pathname
 * @param pageUrl Page URL passed in from navigation
 * @param startsWith True for compare starts with, False/undefined for compare entire path
 * @returns
 */
export function comparePathname(
  currentPath: string,
  pageUrl: string,
  startsWith?: boolean,
): boolean {
  return startsWith
    ? getTrimmedPathname(currentPath).startsWith(pageUrl)
    : getTrimmedPathname(currentPath) === pageUrl;
}

export function findBreadcrumbItem(
  pathname: string,
): [
  NavigationItem | undefined,
  ChildNavigationItem | undefined,
  ChildNavigationItem | undefined,
  ChildNavigationItem | undefined,
] {
  const trimmedPathname = getTrimmedPathname(pathname);

  // Find the parent section--if it doesn't exist, then there's no matching navigation item
  const section = navigation.find((section) =>
    trimmedPathname.startsWith(section.url),
  );
  if (!section) return [undefined, undefined, undefined, undefined];

  for (const page of section.pages) {
    // if (trimmedPathname === page.url) return [page, undefined];
    if (trimmedPathname.startsWith(page.url)) {
      if (page.pages) {
        for (const subPage of page.pages) {
          if (trimmedPathname === subPage.url)
            return [section, page, subPage, undefined];
          if (trimmedPathname.includes(subPage.url) && subPage.pages) {
            for (const subSubPage of subPage.pages) {
              if (trimmedPathname === subSubPage.url)
                return [section, page, subPage, subSubPage];
            }
          }
        }
      } else {
        return [section, page, undefined, undefined];
      }
    }
  }
  return [section, undefined, undefined, undefined];
}

/**
 * Will return list of breadcrumb items for a given path
 * TODO: Could be made more efficient but this is generated
 * during the build step so it doesn't really matter for user experience
 * @param pathname pathname from Astro.url.pathname
 * @returns list of breadcrumb items to get to the current path
 */
export function findBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const trimmedPathname = getTrimmedPathname(pathname);

  const breadcrumbs: BreadcrumbItem[] = [];

  let navigationItem: AnyNavigationItem | undefined = navigation.find(
    (section) => trimmedPathname.startsWith(section.url),
  );

  while (navigationItem !== undefined) {
    // If it exists, add it to the current breadcrumb list
    breadcrumbs.push(generateBreadcrumbItem(navigationItem));

    // If it's an exact match, it's already been added
    // If it's not a match but there are no subpages, then there's nothing left to add
    if (trimmedPathname === navigationItem.url || !navigationItem.pages) break;

    let nextItem: AnyNavigationItem | undefined = undefined;
    for (const page of navigationItem.pages) {
      if (trimmedPathname === page.url) {
        nextItem = page;
        break;
      }
      if (trimmedPathname.startsWith(page.url)) {
        nextItem = page;
      }
    }
    if (!nextItem) break; // No child matched — stop instead of looping forever
    navigationItem = nextItem;
  }

  // Catch undefined navigation item and return it
  return breadcrumbs;
}

export function findNavigationItem(
  pathname: string,
): [
  ChildNavigationItem | undefined,
  ChildNavigationItem | undefined,
  ChildNavigationItem | undefined,
] {
  const trimmedPathname = getTrimmedPathname(pathname);

  // Find the parent section--if it doesn't exist, then there's no matching navigation item
  const section = navigation.find((section) =>
    trimmedPathname.startsWith(section.url),
  );
  if (!section) return [undefined, undefined, undefined];

  for (const page of section.pages) {
    // if (trimmedPathname === page.url) return [page, undefined];
    if (trimmedPathname.startsWith(page.url)) {
      if (page.pages) {
        for (const subPage of page.pages) {
          if (trimmedPathname === subPage.url)
            return [page, subPage, undefined];
          if (trimmedPathname.includes(subPage.url) && subPage.pages) {
            for (const subSubPage of subPage.pages) {
              if (trimmedPathname === subSubPage.url)
                return [page, subPage, subSubPage];
            }
          }
        }
      } else {
        return [page, undefined, undefined];
      }
    }
  }
  return [undefined, undefined, undefined];
}

/**
 * Attempts to locate the desired navigation section by pathname.
 * @param pathname as string
 * @return the navigation item with any nested pages
 */
export function findSection(pathname: string): AnyNavigationItem | undefined {
  // Trim path name in case any extra characters are included
  const trimmedPathname = getTrimmedPathname(pathname);

  let navigationItem: AnyNavigationItem | undefined = navigation.find(
    (section) => trimmedPathname.startsWith(section.url),
  );

  while (navigationItem !== undefined) {
    // If the item is an exact match, return it now
    if (trimmedPathname === navigationItem.url) return navigationItem;

    // If there are no child pages, there's nothing left to match. Return undefined;
    if (!navigationItem.pages) return undefined;

    // If it's not an exact match, look through child items to see if there's an exact match
    for (const page of navigationItem.pages) {
      if (trimmedPathname === page.url) return page;
      if (trimmedPathname.startsWith(page.url)) {
        navigationItem = page;
      }
    }
  }

  // Catch undefined navigation item and return it
  return navigationItem;
}

// Generate a breadcrumb item type from a navigation item
export function generateBreadcrumbItem(navigationItem: AnyNavigationItem) {
  return {
    isEnabled: navigationItem.isEnabled || false,
    name: navigationItem.name,
    url: navigationItem.url,
  };
}

/**
 * Removes the trailing slash if it exists and trims the base path from the path name if it exists
 * @param pathname as string (Astro.url.pathname)
 * @returns
 */
export function getTrimmedPathname(pathname: string): string {
  const path = pathname.endsWith("/")
    ? pathname.slice(0, pathname.length - 1)
    : pathname;
  const basePath = import.meta.env.BASE_URL;
  const trimmedPath = basePath !== "/" ? path.replace(basePath, "") : path;
  return trimmedPath;
}

/** Validate navigation across multiple dimensions:
 *  - Make sure there are no duplicate URLs in the same page list
 *  - Make sure that every child page includes the full parent page path
 */
export function validateNavigation(
  navigationItems: AnyNavigationItem[],
  parentItem?: AnyNavigationItem,
) {
  if (checkIfDuplicateExists(navigationItems)) {
    throw new Error(
      `Duplicate page routes exist under section: ${parentItem ? `${parentItem.name} (${parentItem.url})` : "Main"}`,
    );
  }
  for (const item of navigationItems) {
    if (parentItem && !item.isExternal) {
      if (!item.url.startsWith(parentItem.url)) {
        throw new Error(
          `Page route for ${item.name} (${item.url}) does not include parent route: ${parentItem.url}`,
        );
      }
    }
    if (item.pages) {
      validateNavigation(item.pages, item);
    }
  }
}

/** Check if there are any duplicate URLs in the navigation list */
function checkIfDuplicateExists(pages: AnyNavigationItem[]) {
  const urls = pages.map((page: ChildNavigationItem) => page.url);
  return new Set(urls).size !== urls.length;
}
