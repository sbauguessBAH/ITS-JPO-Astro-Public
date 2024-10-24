import type { ChildNavigationItem, NavigationItem } from "../types";

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
          { name: 'Publications', url: '/research-areas/deployments/its4us/publications' },
          { name: 'Webinars', url: '/research-areas/deployments/its4us/webinars' },
          { name: 'Featured Links', url: '/research-areas/deployments/its4us/featured_links' },
          { name: 'ITS4US in the Media', url: '/research-areas/deployments/its4us/in_the_media' },
          { name: 'Phase 1 Awardees', url: '/research-areas/deployments/its4us/phase1_awardees' },
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
      { name: 'Research Program Archive', url: '', pages: [
        { name: 'AERIS', url: '' },
        { name: 'ATTRI', url: '' },
        { name: 'MOD', url: '' },
      ]}
    ]
  },
  {
    name: 'News & Info',
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
    name: 'Resources/Technical Assistance',
    url: '/resources',
    pages: [
      { name: 'Training', url: '/resources/training', pages: [
        { name: 'ITS Professional Capacity Building', url: '/resources/training/pcb' }
      ] },
      { name: 'National Transportation Library', url: '/resources/national-transportation-library' },
      { name: 'Smart Community Resource Center', url: 'https://www.its.dot.gov/scrc/index.html#/', isExternal: true },
      { name: 'Accelerating ITS Deployment', url: '/resources/accelerating', pages: [
        { name: 'ITS Deployment Evaluation', url: 'https://www.its.dot.gov/pilots/index.htm', isExternal: true },
        { name: 'Architecture, Standards, and Cybersecurity (ASC)', url: '/resources/accelerating/asc', pages: [
          { name: "ASC Home", url: "/resources/asc" },
          { name: "ITS Standards", url: "/resources/asc/standards" },
          { name: "ITS Reference Architecture", url: "/resources/asc/reference-architecture" },
          { name: "ITS Cybersecurity", url: "/resources/asc/cybersecurity" },
          { name: "Enabling Legislation & Policy", url: "/resources/asc/legislation-and-policy" },
          { name: "Resources and Tools", url: "/resources/asc/resources-and-tools" },
          { name: "Contacts", url: "/resources/asc/contacts" }
        ]},
        { name: 'ITS Data Program', url: '/resources/accelerating/data-program', pages: [
          { name: 'Data Program Home', url: '/resources/accelerating/data-program' },
          { name: 'Program Resources and Tools', url: '/resources/accelerating/data-program/resources-tools', pages: [
            { name: 'ITS DataHub', url: '/resources/accelerating/data-program/resources-tools/CodeHub' },
            { name: 'ITS CodeHub', url: '/resources/accelerating/data-program/resources-tools/DataHub' },
            { name: 'Vehicle-to-Everything (V2X) Hub', url: '/resources/accelerating/data-program/resources-tools/V2XHub' },
            { name: 'Reference Documents, Guidelines, and Templates', url: '/resources/accelerating/data-program/resources-tools/reference' },
            { name: 'Publications', url: '/resources/accelerating/data-program/resources-tools/publications' },
          ] },
          { name: 'Research Projects', url: '/resources/accelerating/data-program/research-projects', pages: [
            { name: 'Data Exchanges', url: '/resources/accelerating/data-program/research-projects/data-exchanges' },
            { name: 'Gap Analysis for High-Value Data Sets', url: '/resources/accelerating/data-program/research-projects/gap-analysis' },
            { name: 'Data Valuation Index (DVI)', url: '/resources/accelerating/data-program/research-projects/DVI' },
            { name: 'Data Management Capability Maturity Models (CMMs)', url: '/resources/accelerating/data-program/research-projects/CMMs' },
            { name: 'Data Governance, Stewardship, and Preservation Methods', url: '/resources/accelerating/data-program/research-projects/data-governance' },
            { name: 'Data and Innovation Research', url: '/resources/accelerating/data-program/research-projects/research' },
            { name: 'Research, Operational, and AI Data Integration Initiative (ROADII)', url: '/resources/accelerating/data-program/research-projects/ROADII' },
            { name: 'AI-Enabled ITS Capability Maturity Model (CMM)', url: '/resources/accelerating/data-program/research-projects/AI-CMM' },
          ]},
          { name: 'News and Events', url: '/resources/accelerating/data-program/data-news' },
          { name: 'Get Involved', url: '/resources/accelerating/data-program/get-involved' },
        ]},
        { name: 'ITS CodeHub', url: 'https://www.its.dot.gov/code', isExternal: true },
        { name: 'ITS DataHub', url: 'https://www.its.dot.gov/data', isExternal: true },
      ]}
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