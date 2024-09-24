/**
 * Child navigation items show up in the main navigation menu dropdown and the sidebar
 * They don't have to have child pages defined
 * If they do have child pages, tabs will be generated for that page
 */
export type ChildNavigationItem = {
  name: string;
  url: string;
  isExternal?: boolean;
  pages?: ChildNavigationItem[];
}

/**
 * Navigation items that show up in the main navigation menu need to have children defined
 * since none of these navigation items are pages on their own
 */
export type NavigationItem = ChildNavigationItem & { pages: ChildNavigationItem[] }

/**
 * Navigation Items contains all main menu and sidebar items to display on the site
 */
export const navigation: NavigationItem[] = [
  {
    name: 'About ITS JPO',
    url: '/about',
    pages: [
      { name: 'ITS Joint Program Office', url: '/about/its_jpo' },
      { name: 'Strategic Plan', url: '/about/stratplan2020' },
      { name: 'History of Intelligent Transportation Systems', url: '/about/history' },
      { name: 'ITS Program Advisory Committee', url: '/about/itspac' },
      { name: 'Frequently Asked Questions', url: '/about/faqs' },
      { name: 'Site Map', url: '/about/site-map' }
    ]
  },
  {
    name: 'Research',
    url: '/research',
    pages: [
      { name: 'Accelerating ITS Deployment', url: '/research/accelerating' },
      { name: 'Automation', url: '/research/automation' },
      { name: 'ITS4US', url: '/research/ITS4US' },
      { name: 'ITS Cybersecurity Research', url: 'https://www.its.dot.gov/research_areas/cybersecurity/index.htm', isExternal: true },
      { name: 'ITS Data Program', url: '/research/data_program' },
      { name: 'Emerging and Enabling Technologies', url: '/research/emerging-tech' },
      { name: 'National Transportation Library', url: '/research/national-transportation-library' }
    ]
  },
  {
    name: 'ITS Deployment',
    url: '/deployment',
    pages: [
      { name: 'ITS4US', url: '/research/ITS4US/' },
      { name: 'Vehicle-to-Everything', url: '/deployment/V2X' },
      { name: 'Connected Vehicle Pilots', url: 'https://www.its.dot.gov/pilots/index.htm', isExternal: true },
      { name: 'Connected Vehicle Deployment Assistance', url: 'https://www.its.dot.gov/pilots/events.htm', isExternal: true },
      { name: 'Connected Vehicle Applications', url: 'https://www.its.dot.gov/pilots', isExternal: true },
      { name: 'Sample Deployment Concepts', url: 'https://www.its.dot.gov/pilots', isExternal: true },
      { name: 'Connected Vehicle Publications', url: 'https://www.its.dot.gov/pilots', isExternal: true },
      { name: 'National ITS Architecture', url: 'https://www.its.dot.gov/pilots', isExternal: true },
      { name: 'Smart Communities', url: '/deployment/smart-communities' },
      { name: 'Smart Community Resource Center', url: 'https://www.its.dot.gov/scrc', isExternal: true },
      { name: 'Intersection Safety Challenge', url: 'https://its.dot.gov/isc', isExternal: true },
    ]
  },
  {
    name: 'News & Information',
    url: '/new-info',
    pages: [
      { name: 'Latest News from ITS JPO', url: '/news-info/news' },
      { name: 'ITS JPO Director\'s Blog', url: '/news-info/blog' },
      { name: 'ITS Research Fact Sheet', url: '/news-info/fact-sheet' },
      { name: 'Infographics', url: '/news-info/infographics' },
      { name: 'Videos', url: '/news-info/video' },
      { name: 'Image Library', url: '/news-info/image-library' },
    ]
  },
  {
    name: 'Technology Transfer',
    url: '#',
    pages: [
      { name: 'ITS Deployment Evaluation', url: 'https://www.itskrs.its.dot.gov/', isExternal: true },
      { name: 'ITS Professional Capacity Building', url: 'https://www.pcb.its.dot.gov/default.aspx', isExternal: true },
      { name: 'ITS Standards Program', url: 'https://www.standards.its.dot.gov/', isExternal: true },
      { name: 'Smart Community Resource Center', url: 'https://www.its.dot.gov/scrc/index.html#/', isExternal: true },
      { name: 'Intersection Safety Challenge', url: 'https://its.dot.gov/isc/', isExternal: true },
    ]
  },
  {
    name: 'Resources',
    url: '/resources',
    pages: [
      { name: 'ITS CodeHub', url: 'https://www.its.dot.gov/code/index.htm', isExternal: true },
      { name: 'ITS DataHub', url: 'https://www.its.dot.gov/code/index.htm', isExternal: true },
      { name: 'ITS Deployment Evaluation', url: 'https://www.its.dot.gov/pilots/index.htm', isExternal: true },
      { name: 'ITS Deployment Statistics', url: 'https://www.its.dot.gov/pilots/events.htm', isExternal: true },
      { name: 'Security Credential Management System (SCMS)', url: '/resources/SCMS' },
      { name: 'Architecture, Standards, and Cybersecurity (ASC)', url: '/resources/asc', pages: [
        { name: "ASC Home", url: "/resources/asc" },
        { name: "ITS Standards", url: "/resources/asc/standards" },
        { name: "ITS Reference Architecture", url: "/resources/asc/reference-architecture" },
        { name: "ITS Cybersecurity", url: "/resources/asc/cybersecurity" },
        { name: "Enabling Legislation & Policy", url: "/resources/asc/legislation-and-policy" },
        { name: "Resources and Tools", url: "/resources/asc/resources-and-tools" },
        { name: "Contacts", url: "/resources/asc/contacts" }
      ]}
    ]
  },
  {
    name: 'Contact Us',
    url: '/contact-us',
    pages: [
      { name: 'Its JPO Staff Listing', url: '/research/ITS4US' },
      { name: 'Join Our Mailing List', url: '/deployment/V2X' },
      { name: 'Its Specialists in Field Offices', url: 'https://www.fhwa.dot.gov/resourcecenter/teams/operations/index.cfm', isExternal: true },
    ]
  },
]

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

export function findNavigationItem(pathname: string): NavigationItem | ChildNavigationItem | undefined {
  const trimmedPathname = getTrimmedPathname(pathname);

  // Find the parent section--if it doesn't exist, then there's no matching navigation item
  const section = navigation.find(section => trimmedPathname.startsWith(section.url));
  if (!section) return undefined;

  // While the current navigation item has children and there is no exact match found, go down the tree
  let navigationItem: NavigationItem | ChildNavigationItem = section;
  while (navigationItem) {
    // If it's an exact match, return the current item from the function
    if (navigationItem.url === trimmedPathname) return navigationItem;
    
    // If there are child pages, then look through them to see if there's one that matches
    if (!navigationItem.pages) return undefined;

    
  }
}