import type { AnyNavigationItem, BreadcrumbItem, ChildNavigationItem, NavigationItem } from "../types";

/**
 * Navigation Items contains all main menu and sidebar items to display on the site
 */
export const navigation: NavigationItem[] = [
  {
    name: "About",
    url: "/about",
    pages: [
      { name: "About ITS JPO", url: "/about", isEnabled: true },
      { name: "Contact Us", url: "/about/contact-us" },
      { name: "Join Our Mailing List", url: "/about/contact-us/mailinglist" },
    ],
  },

  {
    name: "News & Info",
    url: "/news-info",
    pages: [
      { name: "Latest News from USDOT", url: "https://www.transportation.gov/newsroom", isExternal: true },
      { name: "Newsroom", url: "/news-info/newsroom" },
      { name: "Image Library", url: "/news-info/image-library" },
      { name: "Video Library", url: "/news-info/video-library" },
      {
        name: "Publication Editorial Guidelines",
        url: "/news-info/Publication-Editorial-Guidelines",
        isEnabled: true,
        pages: [
          { name: "Overview", url: "/news-info/Publication-Editorial-Guidelines" },
          { name: "508 Guidance", url: "/news-info/Publication-Editorial-Guidelines/Guidance" },
          { name: "Publications Checklist", url: "/news-info/Publication-Editorial-Guidelines/Checklist" },
        ],
      },
    ],
  },
  {
    name: "Research Areas",
    url: "/research-areas",
    pages: [
      {
        name: "Artificial Intelligence",
        url: "/research-areas/Artificial-Intelligence",
        isEnabled: true,
        pages: [
          { name: "Artificial Intelligence in Transportation", url: "/research-areas/Artificial-Intelligence" },
          { name: "Complete Streets Artificial Intelligence Initiative", url: "/research-areas/Artificial-Intelligence/Complete-Streets-AI" },
        ],
      },
      {
        name: "Automation Program",
        url: "/research-areas/automation-program",
        pages: [
          {
            name: "Overview",
            url: "/research-areas/automation-program",
          },
          {
            name: "Focus Areas",
            url: "/research-areas/automation-program/focus-areas",
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
          },
          {
            name: "Resources",
            url: "/research-areas/automation-program/resources",
            hasGeneratedChildItems: true,
          },
        ],
      },
      { name: "Interoperable Connectivity/Spectrum", url: "/research-areas/Interoperable-Connectivity-Spectrum" },
      {
        name: "Intersection Safety",
        url: "/research-areas/intersection-safety",
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
      },
      {
        name: "ITS4US Program",
        url: "/research-areas/ITS4US",
        isEnabled: true,
        pages: [
          { name: "ITS4US Home", url: "/research-areas/ITS4US" },
          { name: "Program Overview", url: "/research-areas/ITS4US/overview" },
          {
            name: "Deployments",
            url: "/research-areas/ITS4US/deployments",
            isEnabled: true,
            pages: [
              { name: "Heart of Iowa Regional Transit Agency", url: "/research-areas/ITS4US/deployments/iowa" },
              { name: "Georgia Department of Transportation", url: "/research-areas/ITS4US/deployments/georgia" },
              { name: "University of Washington", url: "/research-areas/ITS4US/deployments/washington" },
              { name: "Niagara Frontier Transportation Authority", url: "/research-areas/ITS4US/deployments/newYork" },
            ],
          },
          { name: "Videos", url: "/research-areas/ITS4US/videos" },
        ],
      },
      {
        name: "Vehicle-to-Everything (V2X)",
        url: "/research-areas/V2X-Deployment",
        pages: [
          { name: "Home", url: "/research-areas/V2X-Deployment" },
          {
            name: "Overview",
            url: "/research-areas/V2X-Deployment/overview",
            isEnabled: true,
            pages: [
              { name: "How V2X Works", url: "/research-areas/V2X-Deployment/overview/how-v2x-works" },
              { name: "Why V2X is Needed", url: "/research-areas/V2X-Deployment/overview/why-v2x" },
              {
                name: "V2X Applications and Use Cases",
                url: "/research-areas/V2X-Deployment/overview/v2x-applications",
                isEnabled: true,
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
                    name: "Mobility & Environment",
                    url: "/research-areas/V2X-Deployment/overview/v2x-applications/mobility-environment",
                  },
                  {
                    name: "Traffic Advisories & Warnings",
                    url: "/research-areas/V2X-Deployment/overview/v2x-applications/traffic-warnings",
                  },
                  {
                    name: "Data Collection",
                    url: "/research-areas/V2X-Deployment/overview/v2x-applications/data-collection",
                  },
                ],
              },
            ],
          },
          {
            name: "Research",
            url: "/research-areas/V2X-Deployment/research",
            isEnabled: true,
            pages: [
              { name: "LTE-V2X Analysis", url: "/research-areas/V2X-Deployment/research/lte-v2x" },
              { name: "DSRC V2X Analysis Archive", url: "/research-areas/V2X-Deployment/research/dsrc" },
              { name: "Interoperability Testing", url: "/research-areas/V2X-Deployment/research/interoperability" },
            ],
          },
          {
            name: "Deployment",
            url: "/research-areas/V2X-Deployment/deployment",
            isEnabled: true,
            pages: [
              { name: "V2X Accelerator (2024 – present)", url: "/research-areas/V2X-Deployment/deployment/accelerator" },
              { name: "Connected Vehicle Pilot Program", url: "https://its.dot.gov/scrc/#/technology-areas/v2x/cv-pilot-program", isExternal: true },
              { name: "Safety Pilot", url: "/research-areas/V2X-Deployment/deployment/safety-pilots" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Resources/Technical Assistance",
    url: "/resources",
    pages: [
      {
        name: "Architecture and Standards",
        url: "/resources/architecture-and-standards",
        isEnabled: true,
        pages: [
          { name: "Overview", url: "/resources/architecture-and-standards/" },
          { name: "National ITS Reference Architecture", url: "/resources/architecture-and-standards/reference-architecture" },
          { name: "Standards", url: "/resources/architecture-and-standards/standards" },

        ],
      },
      { name: "Cybersecurity", url: "/resources/Cybersecurity" },
      { name: "Deployment Evaluation", url: "/resources/Deployment-Evaluation" },
      { name: "National Transportation Library", url: "/resources/national-transportation-library" },
      {
        name: "Professional Capacity Building",
        url: "/resources/pcb",
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
            name: "Technical Assistance",
            pages: [
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
      },
      { name: "Smart Community Resource Center", url: "https://www.its.dot.gov/scrc", isExternal: true },
      { name: "ITS CodeHub", url: "https://www.its.dot.gov/code", isExternal: true },
      { name: "ITS DataHub", url: "https://www.its.dot.gov/data", isExternal: true },
    ],
  },
];

/** Check if there are any duplicate URLs in the navigation list */
function checkIfDuplicateExists(pages: AnyNavigationItem[]) {
  const urls = pages.map((page: ChildNavigationItem) => page.url);
  return new Set(urls).size !== urls.length;
}

/** Validate navigation across multiple dimensions:
 *  - Make sure there are no duplicate URLs in the same page list
 *  - Make sure that every child page includes the full parent page path
 */
export function validateNavigation(navigationItems: AnyNavigationItem[], parentItem?: AnyNavigationItem) {
  if (checkIfDuplicateExists(navigationItems)) {
    throw new Error(`Duplicate page routes exist under section: ${parentItem ? `${parentItem.name} (${parentItem.url})` : "Main"}`);
  }
  for (const item of navigationItems) {
    if (parentItem && !item.isExternal) {
      if (!item.url.startsWith(parentItem.url)) {
        throw new Error(`Page route for ${item.name} (${item.url}) does not include parent route: ${parentItem.url}`);
      }
    }
    if (item.pages) {
      validateNavigation(item.pages, item);
    }
  }
}

/**
 * Removes the trailing slash if it exists and trims the base path from the path name if it exists
 * @param pathname as string (Astro.url.pathname)
 * @returns
 */
export function getTrimmedPathname(pathname: string): string {
  const path = pathname.endsWith("/") ? pathname.slice(0, pathname.length - 1) : pathname;
  const basePath = import.meta.env.BASE_URL;
  const trimmedPath = basePath !== "/" ? path.replace(basePath, "") : path;
  return trimmedPath;
}

/**
 * Compare the pathname to see if it matches the passed-in page URL
 * This is necessary since discrepancies with slashes or base paths may exist
 * @param currentPath pathname from Astro.url.pathname
 * @param pageUrl Page URL passed in from navigation
 * @param startsWith True for compare starts with, False/undefined for compare entire path
 * @returns
 */
export function comparePathname(currentPath: string, pageUrl: string, startsWith?: boolean): boolean {
  return startsWith ? getTrimmedPathname(currentPath).startsWith(pageUrl) : getTrimmedPathname(currentPath) === pageUrl;
}

// Generate a breadcrumb item type from a navigation item
export function generateBreadcrumbItem(navigationItem: AnyNavigationItem) {
  return {
    name: navigationItem.name,
    url: navigationItem.url,
    isEnabled: navigationItem.isEnabled || false,
  };
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

  let navigationItem: AnyNavigationItem | undefined = navigation.find((section) => trimmedPathname.startsWith(section.url));

  while (navigationItem !== undefined) {
    // If it exists, add it to the current breadcrumb list
    breadcrumbs.push(generateBreadcrumbItem(navigationItem));

    // If it's an exact match, it's already been added
    // If it's not a match but there are no subpages, then there's nothing left to add
    if (trimmedPathname === navigationItem.url || !navigationItem.pages) break;

    // If it's not an exact match, look through child items to see if there's an exact match
    for (const page of navigationItem.pages) {
      // If there's a page with an exact match, continue
      if (trimmedPathname === page.url) {
        navigationItem = page;
      }
      if (trimmedPathname.startsWith(page.url)) {
        navigationItem = page;
      }
    }
  }

  // Catch undefined navigation item and return it
  return breadcrumbs;
}

/**
 * Attempts to locate the desired navigation section by pathname.
 * @param pathname as string
 * @return the navigation item with any nested pages
 */
export function findSection(pathname: string): AnyNavigationItem | undefined {
  // Trim path name in case any extra characters are included
  const trimmedPathname = getTrimmedPathname(pathname);

  let navigationItem: AnyNavigationItem | undefined = navigation.find((section) => trimmedPathname.startsWith(section.url));

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

export function findNavigationItem(pathname: string): [ChildNavigationItem | undefined, ChildNavigationItem | undefined, ChildNavigationItem | undefined] {
  const trimmedPathname = getTrimmedPathname(pathname);

  // Find the parent section--if it doesn't exist, then there's no matching navigation item
  const section = navigation.find((section) => trimmedPathname.startsWith(section.url));
  if (!section) return [undefined, undefined, undefined];

  for (const page of section.pages) {
    // if (trimmedPathname === page.url) return [page, undefined];
    if (trimmedPathname.startsWith(page.url)) {
      if (page.pages) {
        for (const subPage of page.pages) {
          if (trimmedPathname === subPage.url) return [page, subPage, undefined];
          if (trimmedPathname.includes(subPage.url) && subPage.pages) {
            for (const subSubPage of subPage.pages) {
              if (trimmedPathname === subSubPage.url) return [page, subPage, subSubPage];
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

export function findBreadcrumbItem(pathname: string): [NavigationItem | undefined, ChildNavigationItem | undefined, ChildNavigationItem | undefined, ChildNavigationItem | undefined] {
  const trimmedPathname = getTrimmedPathname(pathname);

  // Find the parent section--if it doesn't exist, then there's no matching navigation item
  const section = navigation.find((section) => trimmedPathname.startsWith(section.url));
  if (!section) return [undefined, undefined, undefined, undefined];

  for (const page of section.pages) {
    // if (trimmedPathname === page.url) return [page, undefined];
    if (trimmedPathname.startsWith(page.url)) {
      if (page.pages) {
        for (const subPage of page.pages) {
          if (trimmedPathname === subPage.url) return [section, page, subPage, undefined];
          if (trimmedPathname.includes(subPage.url) && subPage.pages) {
            for (const subSubPage of subPage.pages) {
              if (trimmedPathname === subSubPage.url) return [section, page, subPage, subSubPage];
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
