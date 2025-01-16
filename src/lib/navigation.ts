import type { AnyNavigationItem, BreadcrumbItem, ChildNavigationItem, NavigationItem } from "../types";

/**
 * Navigation Items contains all main menu and sidebar items to display on the site
 */
export const navigation: NavigationItem[] = [
  {
    name: 'About',
    url: '/about',
    pages: [
      { name: 'About ITS JPO', url: '/about/its_jpo' },
      { name: 'Contact Us', url: '/about/contact-us', pages: [
        { name: 'ITS JPO Staff Listing', url: '/about/contact-us/staff-listing' },
        { name: 'Join Our Mailing List', url: '/about/contact-us/mailinglist' },
        { name: 'ITS Specialists in Field Offices', url: 'https://www.fhwa.dot.gov/resourcecenter/teams/operations/index.cfm', isExternal: true },
      ]},
      { name: 'Staff Presentations', url: '/about/staff-presentations' },
    ]
  },
  {
    name: 'Research Areas',
    url: '/research-areas',
    pages: [
      { name: 'ITS Deployments', url: '/research-areas/deployments', pages: [
        { name: 'ITS4US', url: '/research-areas/deployments/its4us', pages: [
          { name: 'ITS4US Home', url: '/research-areas/deployments/its4us' },
          { name: 'Program Overview', url: '/research-areas/deployments/its4us/overview' },
          { name: 'Deployments', url: '/research-areas/deployments/its4us/deployments' , pages: [
            { name: 'Deployments Overview', url: '/research-areas/deployments/its4us/deployments/' },
            { name: 'University of Washington', url: '/research-areas/deployments/its4us/deployments/washington' },
            { name: 'Heart of Iowa Regional Transit Agency', url: '/research-areas/deployments/its4us/deployments/iowa' },
            { name: 'Georgia Department of Transportation', url: '/research-areas/deployments/its4us/deployments/georgia' },
            { name: 'Niagara Frontier Transportation Authority', url: '/research-areas/deployments/its4us/deployments/newYork' },
          ] },
          { name: 'Resources', url: '/research-areas/deployments/its4us/resources' },
          { name: 'Webinars', url: '/research-areas/deployments/its4us/webinars' },
          { name: 'Newsroom', url: '/research-areas/deployments/its4us/in_the_media' },
        ]},
        { name: 'Vehicle-to-Everything', url: '/research-areas/deployments/v2x' },
        { name: 'Complete Streets Artificial Intelligence (CSAI) Initiative', url: 'https://its.dot.gov/csai/', isExternal: true },
        { name: 'Connected Vehicle Pilot Deployment (CVPD)', url: 'https://www.its.dot.gov/pilots/', isExternal: true },
        { name: 'ATTAIN/ATCMTD', url: 'https://www.itskrs.its.dot.gov/decision-support/infographic/atcmtd-grant-program', isExternal: true }
      ] },
      { name: 'Automation Program', url: '/research-areas/automation' },
      { name: 'Emerging and Enabling Technologies Program', url: '/research-areas/emerging-tech', pages: [
        { name: 'Intersection Safety Challenge', url: 'https://its.dot.gov/isc', isExternal: true },
        { name: 'ITS Cybersecurity Research', url: 'https://www.its.dot.gov/research_areas/cybersecurity/index.htm', isExternal: true },
      ] },
      { name: 'Research Program Archive', url: '/research-areas/archive', pages: [
        { name: 'AERIS', url: '/research-areas/archive/aeris' , pages: [
          { name: 'AERIS Research Program Overview', url: '/research-areas/archive/aeris/' },
          { name: 'Capstone Report (2009-2014)', url: '/research-areas/archive/aeris/capstone_report' },
          { name: 'Operational Scenarios and Apps', url: '/research-areas/archive/aeris/scenarios_applications' },
          { name: 'Analysis, Modeling, and Simulation', url: '/research-areas/archive/aeris/analysis' },
          { name: 'Prototypes', url: '/research-areas/archive/aeris/prototypes' },
          { name: 'Workshops and Webinars', url: '/research-areas/archive/aeris/webinars' },
          { name: 'Research Approach', url: '/research-areas/archive/aeris/approach' },
        ]},
        { name: 'ATTRI', url: '/research-areas/archive/attri' , pages: [
          { name: 'Wayfinding & Navigation', url: '/research-areas/archive/attri/wayfinding' },
          { name: 'Pre-Trip Concierge & Virtualization', url: '/research-areas/archive/attri/concierge' },
          { name: 'Safe Intersection Crossing', url: '/research-areas/archive/attri/street-crossing' },
          { name: 'Robotics & Automation', url: '/research-areas/archive/attri/automation' },
        ]},
        { name: 'MOD', url: '/research-areas/archive/mod', pages: [
          { name: 'Mobility On Demand (MOD)', url: '/research-areas/archive/mod/' },
        ]},
      ]}
    ]
  },
  {
    name: 'News & Info',
    url: '/news-info',
    pages: [
      { name: 'Latest News from ITS JPO', url: '/news-info/news', hasGeneratedChildItems: true },
      { name: 'ITS JPO Director\'s Blog', url: '/news-info/blog', hasGeneratedChildItems: true },
      { name: 'ITS Research Fact Sheets', url: '/news-info/fact-sheet' },
      { name: 'Infographics', url: '/news-info/infographics', hasGeneratedChildItems: true },
      { name: 'Videos', url: '/news-info/videos' },
      { name: 'Image Library', url: '/news-info/image-library' },
    ]
  },
  {
    name: 'Resources/Technical Assistance',
    url: '/resources',
    pages: [
      { name: 'Training', url: '/resources/training', pages: [
        { name: 'ITS Professional Capacity Building', url: '/resources/training/pcb', pages: [
          { name: 'ITS PCB Home', url: '/resources/training/pcb' },
          { name: 'Trainings', url: '/resources/training/pcb/trainings', hasGeneratedChildItems: true },
          { name: 'Microlearning Videos', url: '/resources/training/pcb/microlearning'},
          { name: 'Academic Resources', url: '/resources/training/pcb/academic-resources', hasGeneratedChildItems: true },
          { name: 'Peer Exchanges', url: '/resources/training/pcb/peer-exchanges', hasGeneratedChildItems: true  },
          { name: 'V2X Tools', url: '/resources/training/pcb/v2x-tools', pages: [
            { name: 'Tools', url: '/resources/training/pcb/v2x-tools' },
            { name: 'Equipment and Loan Desk', url: '/resources/training/pcb/v2x-tools/equipment-loan-desk' },
            { name: 'Connected and Automated Vehicle Education (CAVe)-in-a-box', url: '/resources/training/pcb/v2x-tools/cave' },
          ] },
          { name: 'Webinars', url: '/resources/training/pcb/webinars' },
        ] }
      ] },
      { name: 'National Transportation Library', url: '/resources/national-transportation-library' },
      { name: 'Smart Community Resource Center', url: 'https://www.its.dot.gov/scrc/index.html#/', isExternal: true },
      { name: 'Accelerating ITS Deployment', url: '/resources/accelerating', pages: [
        { name: 'ITS Deployment Evaluation', url: 'https://www.its.dot.gov/pilots/index.htm', isExternal: true },
        { name: 'Architecture, Standards, and Cybersecurity (ASC)', url: '/resources/accelerating/asc', pages: [
          { name: "ASC Home", url: "/resources/accelerating/asc" },
          { name: "ITS Reference Architecture", url: "/resources/accelerating/asc/reference-architecture" },
          { name: "ITS Standards", url: "/resources/accelerating/asc/standards", hasGeneratedChildItems: true, 
          //   pages: [
          //   { name: "About ITS Standards Program", url: "/resources/accelerating/asc/standards" },
          //   { name: "Emerging Technology", url: "/resources/accelerating/asc/standards/emerging-technology" },
          //   { name: "Public Mobility", url: "/resources/accelerating/asc/standards/public-mobility" },
          //   { name: "Operations/Safety", url: "/resources/accelerating/asc/standards/operations-safety" },
          //   { name: "Data/Trusted Exchanges", url: "/resources/accelerating/asc/standards/data-trusted-exchanges" },
          //   { name: "Vehicle-to-Everything (V2X)", url: "/resources/accelerating/asc/standards/v2x" },
          //   { name: "Vulnerable Road User (VRU)", url: "/resources/accelerating/asc/standards/vru" },
          //   { name: "Cybersecurity Controls", url: "/resources/accelerating/asc/standards/cybersecurity-controls" },
          //   { name: "Positioning, Navigation, and Timing (PNT)", url: "/resources/accelerating/asc/standards/pnt" },
          //   { name: "Supply Chain", url: "/resources/accelerating/asc/standards/supply-chain" },
          //   { name: "Automation", url: "/resources/accelerating/asc/standards/automation" }
          // ]
          },
          { name: "ITS Cybersecurity", url: "/resources/accelerating/asc/cybersecurity" },
          { name: "Enabling Legislation & Policy", url: "/resources/accelerating/asc/legislation-and-policy" },
          { name: "Resources and Tools", url: "/resources/accelerating/asc/resources-and-tools" },
          { name: "Contacts", url: "/resources/accelerating/asc/contacts" }
        ]},
        { name: 'ITS Data', url: '/resources/accelerating/data-program', pages: [
          { name: 'Data Home', url: '/resources/accelerating/data-program' },
          { name: 'Program Resources and Tools', url: '/resources/accelerating/data-program/resources-tools', pages: [
            { name: 'ITS DataHub', url: '/resources/accelerating/data-program/resources-tools/DataHub' },
            { name: 'ITS CodeHub', url: '/resources/accelerating/data-program/resources-tools/CodeHub' },
            { name: 'Vehicle-to-Everything (V2X) Hub', url: '/resources/accelerating/data-program/resources-tools/V2XHub' },
            { name: 'Reference Documents, Guidelines, and Templates', url: '/resources/accelerating/data-program/resources-tools/reference' },
            { name: 'Publications', url: '/resources/accelerating/data-program/resources-tools/publications' },
          ] },
          { name: 'Research Projects', url: '/resources/accelerating/data-program/research-projects', pages: [
            { name: 'Data Exchanges', url: '/resources/accelerating/data-program/research-projects/data-exchanges' },
            { name: 'Data Governance, Stewardship, and Preservation Methods', url: '/resources/accelerating/data-program/research-projects/data-governance' },
            { name: 'Data Valuation Index (DVI)', url: '/resources/accelerating/data-program/research-projects/DVI' },
            { name: 'Gap Analysis for High-Value Data Sets', url: '/resources/accelerating/data-program/research-projects/gap-analysis' },
            { name: 'Data and Innovation Research', url: '/resources/accelerating/data-program/research-projects/research' },
            { name: 'Research, Operational, and AI Data Integration Initiative (ROADII)', url: '/resources/accelerating/data-program/research-projects/ROADII' },
            { name: 'Data Management Capability Maturity Models (CMMs)', url: '/resources/accelerating/data-program/research-projects/CMMs' },
            { name: 'AI-Enabled ITS Capability Maturity Model (CMM)', url: '/resources/accelerating/data-program/research-projects/AI-CMM' },
          ]},
          { name: 'Get Involved', url: '/resources/accelerating/data-program/get-involved' },
        ]},
        { name: 'ITS CodeHub', url: 'https://www.its.dot.gov/code', isExternal: true },
        { name: 'ITS DataHub', url: 'https://www.its.dot.gov/data', isExternal: true },
      ]}
    ]
  },
]

/** Check if there are any duplicate URLs in the navigation list */
function checkIfDuplicateExists(pages: AnyNavigationItem[]) {
  const urls = pages.map((page: ChildNavigationItem) => page.url);
  return new Set(urls).size !== urls.length
}

/** Validate navigation across multiple dimensions:
 *  - Make sure there are no duplicate URLs in the same page list
 *  - Make sure that every child page includes the full parent page path
 */
export function validateNavigation(navigationItems: AnyNavigationItem[], parentItem?: AnyNavigationItem) {
  if (checkIfDuplicateExists(navigationItems)) {
    throw new Error(`Duplicate page routes exist under section: ${parentItem ? `${parentItem.name} (${parentItem.url})` : "Main"}`)
  }
  for (const item of navigationItems) {
    if (parentItem && !item.isExternal) {
      if (!item.url.startsWith(parentItem.url)) {
        throw new Error(`Page route for ${item.name} (${item.url}) does not include parent route: ${parentItem.url}`)
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
  return startsWith ? getTrimmedPathname(currentPath).startsWith(pageUrl) : getTrimmedPathname(currentPath) === pageUrl
}

/**
 * Check if there is a page under the navigation item with the smae URL
 * If so, that means the navigation item should be selectable as it will navigate
 * to the current page
 * @param navigationItem Current navigation item
 */
export function hasMatchingPageOrGeneratedChildItems(navigationItem: AnyNavigationItem) {
  // Can use some since navigation validation ensures no duplicates
  if (navigationItem.pages?.some(page => page.url === navigationItem.url)) return true;
  if (navigationItem.hasGeneratedChildItems) return true;
  return false;
}

export function generateBreadcrumbItem(navigationItem: AnyNavigationItem) {
  return {
    name: navigationItem.name, 
    url: navigationItem.url, 
    isDisabled: navigationItem.isDisabled || !hasMatchingPageOrGeneratedChildItems(navigationItem)
  }
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

  let navigationItem: AnyNavigationItem | undefined = 
    navigation.find(section => trimmedPathname.startsWith(section.url));

  while (navigationItem !== undefined) {
    // If it exists, add it to the current breadcrumb list
    breadcrumbs.push(generateBreadcrumbItem(navigationItem))

    // If it's an exact match, it's already been added
    // If it's not a match but there are no subpages, then there's nothing left to add
    if (trimmedPathname === navigationItem.url || !navigationItem.pages) break;

    // If it's not an exact match, look through child items to see if there's an exact match
    for (const page of navigationItem.pages) {
      // If there's a page with an exact match, continue
      if (trimmedPathname === page.url) {
        navigationItem = page;
      };
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

  let navigationItem: AnyNavigationItem | undefined = 
    navigation.find(section => trimmedPathname.startsWith(section.url));

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
  return navigationItem
}

export function findNavigationItem(pathname: string): [ChildNavigationItem | undefined, ChildNavigationItem | undefined, ChildNavigationItem | undefined] {
  const trimmedPathname = getTrimmedPathname(pathname);

  // Find the parent section--if it doesn't exist, then there's no matching navigation item
  const section = navigation.find(section => trimmedPathname.startsWith(section.url));
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
  const section = navigation.find(section => trimmedPathname.startsWith(section.url));
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