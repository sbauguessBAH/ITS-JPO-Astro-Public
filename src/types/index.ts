import type { ImageMetadata } from "astro";

export type Link = {
  title: string;
  href: string;
};

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