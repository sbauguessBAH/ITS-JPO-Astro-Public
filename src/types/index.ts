import type { ImageMetadata } from "astro";

/**
 * Child navigation items show up in the main navigation menu dropdown and the sidebar
 * They don't have to have child pages defined
 * If they do have child pages, tabs will be generated for that page
 */
export type ChildNavigationItem = {
  name: string;
  url: string;
  isExternal?: boolean;
  isEnabled?: boolean;
  hideChildrenInNavbar?: boolean;
  isDisabled?: boolean;
  pages?: ChildNavigationItem[];
  hasGeneratedChildItems?: boolean;
}

/**
 * Navigation items that show up in the main navigation menu need to have children defined
 * since none of these navigation items are pages on their own
 */
export type NavigationItem = ChildNavigationItem & { pages: ChildNavigationItem[] }

export type AnyNavigationItem = NavigationItem | ChildNavigationItem;

export type BreadcrumbItem = {
  name: string;
  url: string;
  isEnabled?: boolean;
}

export type Link = {
  title: string;
  href: string;
};

/**
 * Used to display resources on a number of pages. Can be extended to include a variety of content
 */
export type Resource = {
  title: string;
  description?: string;
  href: string;
  image: string | ImageMetadata;
  alt?: string;
  isExternalLink?: boolean;
};

export type ResourceGroup = {
  title: string;
  resources: Resource[];
};

export type DataAccessResource = Resource & { color?: "yellow" | "red" | "purple" | "green" };

export type VideoThumbnail = Resource & { date: string; };