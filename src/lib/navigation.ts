/**
 * Child navigation items show up in the main navigation menu dropdown and the sidebar
 * They don't have to have child pages defined
 * If they do have child pages, tabs will be generated for that page
 */
export type ChildNavigationItem = {
  name: string;
  url: string;
  isExternal?: boolean;
  isDisabled?: boolean;
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
      { name: 'ITS Program Advisory Committee', url: '/about/itspac', pages: [
        { name: 'ITSPAC Home', url: '/about/itspac' },
        { name: 'Membership', url: '/about/itspac/membership' },
        { name: 'Charter', url: '/about/itspac/charter' },
        { name: 'Committee Meeting Information (Coming Soon)', url: '/about/itspac/committee-meeting', isDisabled: true },
        { name: 'Historical Archive', url: '/about/itspac/archive' },
        { name: 'Ethics Guidelines', url: '/about/itspac/itspac_ethics' }
      ]},
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
      { name: 'ITS4US', url: '/research/ITS4US', pages: [
        { name: 'ITS4US Home', url: '/research/ITS4US' },
        { name: 'Program Overview', url: '/research/ITS4US/overview' },
        { name: 'Publications', url: '/research/ITS4US/publications' },
        { name: 'Webinars', url: '/research/ITS4US/webinars' },
        { name: 'Featured Links', url: '/research/ITS4US/featured_links' },
        { name: 'ITS4US in the Media', url: '/research/ITS4US/in_the_media' },
        { name: 'Phase 1 Awardees', url: '/research/ITS4US/phase1_awardees' },
      ]},
      { name: 'ITS Cybersecurity Research', url: 'https://www.its.dot.gov/research_areas/cybersecurity/index.htm', isExternal: true },
      { name: 'ITS Data Program', url: '/research/data_program', pages: [
        { name: 'Data Program Home', url: '/research/data_program' },
        { name: 'Program Resources and Tools', url: '/research/data_program/resources_tools', pages: [
          { name: 'Program Resources and Tools', url: '/research/data_program/resources_tools' },
          { name: 'ITS DataHub', url: '/research/data_program/resources_tools/CodeHub' },
          { name: 'ITS CodeHub', url: '/research/data_program/resources_tools/DataHub' },
          { name: 'Vehicle-to-Everything (V2X) Hub', url: '/research/data_program/resources_tools/V2XHub' },
          { name: 'Reference Documents, Guidelines, and Templates', url: '/research/data_program/resources_tools/reference' },
          { name: 'Publications', url: '/research/data_program/resources_tools/publications' },
        ] },
        { name: 'Research Projects', url: '/research/data_program/research_projects', pages: [
          { name: 'Research Projects', url: '/research/data_program/research_projects' },
          { name: 'Data Exchanges', url: '/research/data_program/research_projects/data-exchanges' },
          { name: 'Gap Analysis for High-Value Data Sets', url: '/research/data_program/research_projects/gap-analysis' },
          { name: 'Data Valuation Index (DVI)', url: '/research/data_program/research_projects/DVI' },
          { name: 'Data Management Capability Maturity Models (CMMs)', url: '/research/data_program/research_projects/CMMs' },
          { name: 'Data Governance, Stewardship, and Preservation Methods', url: '/research/data_program/research_projects/data-governance' },
          { name: 'Data and Innovation Research', url: '/research/data_program/research_projects/research' },
          { name: 'Research, Operational, and AI Data Integration Initiative (ROADII)', url: '/research/data_program/research_projects/ROADII' },
          { name: 'AI-Enabled ITS Capability Maturity Model (CMM)', url: '/research/data_program/research_projects/AI-CMM' },
        ]},
        { name: 'News and Events', url: '/research/data_program/data-news' },
        { name: 'Get Involved', url: '/research/data_program/get-involved' },
      ]},
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
    url: '/news-info',
    pages: [
      { name: 'Latest News from ITS JPO', url: '/news-info/news' },
      { name: 'ITS JPO Director\'s Blog', url: '/news-info/blog' },
      { name: 'ITS Research Fact Sheets', url: '/news-info/fact-sheet' },
      { name: 'Infographics', url: '/news-info/infographics' },
      { name: 'Videos', url: '/news-info/videos' },
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
      { name: 'ITS CodeHub', url: 'https://www.its.dot.gov/code', isExternal: true },
      { name: 'ITS DataHub', url: 'https://www.its.dot.gov/data', isExternal: true },
      { name: 'ITS Deployment Evaluation', url: 'https://www.its.dot.gov/pilots/index.htm', isExternal: true },
      { name: 'ITS Deployment Statistics', url: 'https://www.its.dot.gov/pilots/events.htm', isExternal: true },
      { name: 'Security Credential Management System (SCMS)', url: '/resources/scms' },
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
      { name: 'Its JPO Staff Listing', url: '/contact-us/staff-listing' },
      { name: 'Join Our Mailing List', url: '/contact-us/mailinglist' },
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