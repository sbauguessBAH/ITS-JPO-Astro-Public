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
    ]
  },
  {
    name: 'Research Areas',
    url: '/research-areas',
    pages: [
      { name: 'Automation Program', url: '/research-areas/automation' },
    ]
  },
  {
    name: 'News & Info',
    url: '/news-info',
    pages: [
      { name: 'Latest News from ITS JPO', url: '/news-info/news', hasGeneratedChildItems: true },
      { name: 'Image Library', url: '/news-info/image-library' },
    ]
  },
  {
    name: 'Resources/Technical Assistance',
    url: '/resources',
    pages: [
      { name: 'National Transportation Library', url: '/resources/national-transportation-library' },
      { name: 'Accelerating ITS Deployment', url: '/resources/accelerating', pages: [
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