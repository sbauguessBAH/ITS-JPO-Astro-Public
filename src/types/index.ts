import type { ImageMetadata } from "astro";

export type AnyNavigationItem = ChildNavigationItem | NavigationItem;

export type BreadcrumbItem = {
  isEnabled?: boolean;
  name: string;
  url: string;
}

/**
 * Child navigation items show up in the main navigation menu dropdown and the sidebar
 * They don't have to have child pages defined
 * If they do have child pages, tabs will be generated for that page
 */
export type ChildNavigationItem = {
  hasGeneratedChildItems?: boolean;
  hideChildrenInNavbar?: boolean;
  isDisabled?: boolean;
  isEnabled?: boolean;
  isExternal?: boolean;
  name: string;
  pages?: ChildNavigationItem[];
  url: string;
}

export type DataAccessResource = Resource & { color?: "green" | "purple" | "red" | "yellow" };

export type Link = {
  href: string;
  title: string;
};

/**
 * Navigation items that show up in the main navigation menu need to have children defined
 * since none of these navigation items are pages on their own
 */
export type NavigationItem = ChildNavigationItem & { pages: ChildNavigationItem[] }

/**
 * Used to display resources on a number of pages. Can be extended to include a variety of content
 */
export type Resource = {
  alt?: string;
  description?: string;
  href: string;
  image: ImageMetadata | string;
  isExternalLink?: boolean;
  title: string;
};

export type ResourceGroup = {
  resources: Resource[];
  title: string;
};

export type VideoThumbnail = Resource & { date: string; };