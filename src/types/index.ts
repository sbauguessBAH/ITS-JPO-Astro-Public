export type Link = {
  title: string;
  href: string;
}

export type Resource = {
  title: string;
  href: string;
  image: string;
  alt?: string;
}

export type DataAccessResource = Resource & { color?: "yellow" | "red" | "purple" | "green" };

export type VideoThumbnail = Resource & { date: string; };