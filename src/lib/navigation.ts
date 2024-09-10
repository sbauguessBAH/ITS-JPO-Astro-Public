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
        { name: "ASC Home", url: "/asc"}
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