import type { ImageMetadata } from "astro";
import brianC from "@/src/assets/images/newsroom/brian_c.png";
import norahO from "@/src/assets/images/newsroom/norah_o.png";
import rawToolkits from "@/src/content/news-resources/toolkits/toolkits.json";

export type ToolkitContact = {
  contact?: string;
  department?: string;
  name: string;
  office?: string;
  profileImage?: string | ImageMetadata;
  title?: string;
};

export type ToolkitLinkItem = {
  href?: string;
  title: string;
};

export type ToolkitMediaItem = {
  actionLabel?: string;
  downloadHref?: string;
  href?: string;
  image?: string | ImageMetadata;
  title: string;
};

export type ToolkitWebinarItem = {
  date: string;
  description?: string;
  duration?: string;
  recordingLink?: string;
  slidesLink?: string;
  subtitle?: string;
  title: string;
};

export type ToolkitThumbnailVariant = "document" | "graphic" | "video";

type ToolkitSectionBase = {
  className: string;
  description?: string;
  emptyLabel: string;
  title: string;
};

export type ToolkitSection =
  | (ToolkitSectionBase & {
      items: ToolkitContact[];
      kind: "contacts";
    })
  | (ToolkitSectionBase & {
      items: ToolkitLinkItem[];
      kind: "links";
    })
  | (ToolkitSectionBase & {
      items: ToolkitMediaItem[];
      kind: "thumbnails";
      variant: ToolkitThumbnailVariant;
    })
  | (ToolkitSectionBase & {
      items: ToolkitWebinarItem[];
      kind: "webinars";
    });

export type ToolkitCta = {
  buttonText?: string;
  description?: string;
  href?: string;
  previewAlt?: string;
  previewImage?: string | ImageMetadata;
  title: string;
};

export type ToolkitPageData = {
  cta?: ToolkitCta;
  description: string;
  intro?: string;
  keywords: string[];
  sections: ToolkitSection[];
  title: string;
};

type RawContact = {
  contact?: string;
  department?: string;
  name?: string;
  office?: string;
  profile_image?: string;
  profile_image_key?: string;
  title?: string;
};

type RawLinkItem = {
  href?: string;
  title?: string;
  "link-text"?: string;
};

type RawMediaItem = {
  actionLabel?: string;
  cta_text?: string;
  download_href?: string;
  href?: string;
  image_src?: string;
  img_src?: string;
  title?: string;
};

type RawWebinarItem = {
  date?: string;
  description?: string;
  duration?: string;
  recordingLink?: string;
  slidesLink?: string;
  subtitle?: string;
  title?: string;
};

type RawCta = {
  button_text?: string;
  description?: string;
  href?: string;
  preview_alt?: string;
  preview_image?: string;
  title?: string;
};

type RawToolkitEntry = {
  belt_cta?: RawCta;
  contacts?: RawContact[];
  content_types?: string[];
  date?: string;
  description?: string;
  documents?: RawLinkItem[];
  id?: number;
  image_library?: RawMediaItem[];
  intro?: string;
  media_coverage?: RawLinkItem[];
  office?: string;
  photos?: RawMediaItem[];
  print_materials?: RawMediaItem[];
  resource_section_title?: string;
  shareable_graphics?: RawMediaItem[];
  sound_bites?: RawMediaItem[];
  soundbite?: RawMediaItem[];
  subtitle?: string;
  title?: string;
  topics?: string[];
  url?: string;
  videos?: RawMediaItem[];
  webinar_materials?: RawWebinarItem[];
  "b-roll"?: RawMediaItem[];
  "media-coverage"?: RawLinkItem[];
  "print-materials"?: RawMediaItem[];
  "resource-links"?: RawLinkItem[];
  "webinar-materials"?: RawWebinarItem[];
};

type RawToolkitCollection = {
  media_toolkits?: RawToolkitEntry[];
  outreach_toolkits?: RawToolkitEntry[];
};

type DefaultSectionSeed = {
  className: string;
  description?: string;
  emptyLabel: string;
  key: string;
  kind: ToolkitSection["kind"];
  title: string;
  variant?: ToolkitThumbnailVariant;
};

const toolkitCollection = rawToolkits as RawToolkitCollection;

const contactImageMap: Record<string, ImageMetadata> = {
  brian_c: brianC,
  norah_o: norahO,
};

const defaultSectionsByContentType: Record<string, DefaultSectionSeed> = {
  "fact sheet": {
    className: "documents",
    emptyLabel: "Add fact sheets, briefs, or supporting document links here.",
    key: "fact-sheets-and-documents",
    kind: "links",
    title: "Fact Sheets and Documents",
  },
  infographic: {
    className: "shareable-graphics infographics",
    emptyLabel: "Add graphic thumbnails and download links here.",
    key: "shareable-graphics",
    kind: "thumbnails",
    title: "Shareable Graphics",
    variant: "graphic",
  },
  "news release": {
    className: "documents",
    emptyLabel: "Add fact sheets, briefs, or supporting document links here.",
    key: "fact-sheets-and-documents",
    kind: "links",
    title: "Fact Sheets and Documents",
  },
  photos: {
    className: "shareable-graphics photos",
    emptyLabel: "Add graphic thumbnails and download links here.",
    key: "shareable-graphics",
    kind: "thumbnails",
    title: "Shareable Graphics",
    variant: "graphic",
  },
  presentation: {
    className: "documents presentations",
    emptyLabel: "Add presentation deck links or briefing materials here.",
    key: "presentations",
    kind: "links",
    title: "Presentations",
  },
  "print materials": {
    className: "print-materials",
    emptyLabel: "Add print material thumbnails and document downloads here.",
    key: "print-materials",
    kind: "thumbnails",
    title: "Print Materials",
    variant: "document",
  },
  "social posts": {
    className: "social-posts",
    emptyLabel: "Add approved social post copy or download links here.",
    key: "social-posts",
    kind: "links",
    title: "Social Posts",
  },
  slides: {
    className: "documents slides",
    emptyLabel: "Add slide decks or downloadable briefing materials here.",
    key: "slides",
    kind: "links",
    title: "Slides",
  },
  "sound bites": {
    className: "sound-bites",
    emptyLabel: "Add shareable soundbite video clips here.",
    key: "sound-bites",
    kind: "thumbnails",
    title: "Shareable Soundbite Video Clips",
    variant: "video",
  },
  "talking points": {
    className: "talking-points documents",
    emptyLabel: "Add talking point documents or speaking notes here.",
    key: "talking-points",
    kind: "links",
    title: "Talking Points",
  },
  video: {
    className: "videos",
    emptyLabel: "Add shareable video thumbnails or external video links here.",
    key: "shareable-videos",
    kind: "thumbnails",
    title: "Shareable Videos of Keynote Speakers",
    variant: "video",
  },
  "video b-roll": {
    className: "video-b-roll",
    emptyLabel: "Add b-roll clips or downloadable video links here.",
    key: "shareable-b-roll",
    kind: "thumbnails",
    title: "Shareable B-Roll Video Clips",
    variant: "video",
  },
  "webinar materials": {
    className: "webinar-materials",
    emptyLabel: "Add webinar recordings and slide decks here.",
    key: "webinar-materials",
    kind: "webinars",
    title: "Webinar Materials",
  },
};

const hasText = (value: string | null | undefined): value is string => typeof value === "string" && value.trim().length > 0;

const cleanText = (value?: string | null): string => (typeof value === "string" ? value.trim() : "");

const uniqueStrings = (values: Array<string | undefined>): string[] => {
  return [...new Set(values.filter((value): value is string => hasText(value)).map((value) => value.trim()))];
};

const hasOwn = (value: object, key: string): boolean => Object.prototype.hasOwnProperty.call(value, key);

const getSlugFromUrl = (url?: string): string => {
  const pathParts = cleanText(url)
    .split("/")
    .filter(Boolean);

  return pathParts[pathParts.length - 1] ?? "";
};

const createSectionFromSeed = (seed: DefaultSectionSeed): ToolkitSection => {
  switch (seed.kind) {
    case "contacts":
      return {
        className: seed.className,
        description: seed.description,
        emptyLabel: seed.emptyLabel,
        items: [],
        kind: "contacts",
        title: seed.title,
      };
    case "links":
      return {
        className: seed.className,
        description: seed.description,
        emptyLabel: seed.emptyLabel,
        items: [],
        kind: "links",
        title: seed.title,
      };
    case "thumbnails":
      return {
        className: seed.className,
        description: seed.description,
        emptyLabel: seed.emptyLabel,
        items: [],
        kind: "thumbnails",
        title: seed.title,
        variant: seed.variant ?? "document",
      };
    case "webinars":
      return {
        className: seed.className,
        description: seed.description,
        emptyLabel: seed.emptyLabel,
        items: [],
        kind: "webinars",
        title: seed.title,
      };
  }
};

const normalizeContacts = (contacts?: RawContact[]): ToolkitContact[] => {
  return (Array.isArray(contacts) ? contacts : [])
    .map((contact) => {
      const name = cleanText(contact.name);

      if (!name) {
        return undefined;
      }

      const imageKey = cleanText(contact.profile_image_key);

      return {
        contact: cleanText(contact.contact) || undefined,
        department: cleanText(contact.department) || undefined,
        name,
        office: cleanText(contact.office) || undefined,
        profileImage: imageKey ? contactImageMap[imageKey] ?? cleanText(contact.profile_image) : cleanText(contact.profile_image) || undefined,
        title: cleanText(contact.title) || undefined,
      };
    })
    .filter((contact): contact is ToolkitContact => Boolean(contact));
};

const normalizeLinks = (items?: RawLinkItem[]): ToolkitLinkItem[] => {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const title = cleanText(item.title) || cleanText(item["link-text"]);

      if (!title) {
        return undefined;
      }

      return {
        href: cleanText(item.href) || undefined,
        title,
      };
    })
    .filter((item): item is ToolkitLinkItem => Boolean(item));
};

const normalizeMediaItems = (items?: RawMediaItem[]): ToolkitMediaItem[] => {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const title = cleanText(item.title);
      const href = cleanText(item.href);
      const image = cleanText(item.image_src) || cleanText(item.img_src);
      const downloadHref = cleanText(item.download_href);
      const actionLabel = cleanText(item.actionLabel) || cleanText(item.cta_text);

      if (!title && !href && !image && !downloadHref) {
        return undefined;
      }

      return {
        actionLabel: actionLabel || undefined,
        downloadHref: downloadHref || undefined,
        href: href || undefined,
        image: image || undefined,
        title: title || "Media Asset",
      };
    })
    .filter((item): item is ToolkitMediaItem => Boolean(item));
};

const normalizeWebinars = (items?: RawWebinarItem[]): ToolkitWebinarItem[] => {
  return (Array.isArray(items) ? items : [])
    .map((item) => {
      const title = cleanText(item.title);
      const date = cleanText(item.date);
      const recordingLink = cleanText(item.recordingLink);
      const slidesLink = cleanText(item.slidesLink);

      if (!title && !date && !recordingLink && !slidesLink) {
        return undefined;
      }

      return {
        date,
        description: cleanText(item.description) || undefined,
        duration: cleanText(item.duration) || undefined,
        recordingLink: recordingLink || undefined,
        slidesLink: slidesLink || undefined,
        subtitle: cleanText(item.subtitle) || undefined,
        title: title || "Webinar Material",
      };
    })
    .filter((item): item is ToolkitWebinarItem => Boolean(item));
};

const normalizeCta = (rawCta?: RawCta): ToolkitCta | undefined => {
  const title = cleanText(rawCta?.title);

  if (!title) {
    return undefined;
  }

  return {
    buttonText: cleanText(rawCta?.button_text) || undefined,
    description: cleanText(rawCta?.description) || undefined,
    href: cleanText(rawCta?.href) || undefined,
    previewAlt: cleanText(rawCta?.preview_alt) || undefined,
    previewImage: cleanText(rawCta?.preview_image) || undefined,
    title,
  };
};

const buildDefaultSections = (contentTypes?: string[]): ToolkitSection[] => {
  const sections: ToolkitSection[] = [];
  const seenKeys = new Set<string>();

  for (const contentType of contentTypes ?? []) {
    const seed = defaultSectionsByContentType[cleanText(contentType).toLowerCase()];

    if (!seed || seenKeys.has(seed.key)) {
      continue;
    }

    seenKeys.add(seed.key);
    sections.push(createSectionFromSeed(seed));
  }

  return sections;
};

const buildExplicitSections = (toolkit: RawToolkitEntry): ToolkitSection[] => {
  const sections: ToolkitSection[] = [];

  if (hasOwn(toolkit, "contacts")) {
    sections.push({
      className: "contacts",
      emptyLabel: "Add media contact cards here.",
      items: normalizeContacts(toolkit.contacts),
      kind: "contacts",
      title: "Media Contacts",
    });
  }

  if (hasOwn(toolkit, "resource-links") || hasOwn(toolkit, "documents") || hasText(toolkit.resource_section_title)) {
    sections.push({
      className: "documents resources",
      emptyLabel: "Add fact sheet and document links here.",
      items: [...normalizeLinks(toolkit["resource-links"]), ...normalizeLinks(toolkit.documents)],
      kind: "links",
      title: cleanText(toolkit.resource_section_title) || "Fact Sheets and Documents",
    });
  }

  if (hasOwn(toolkit, "print-materials") || hasOwn(toolkit, "print_materials")) {
    sections.push({
      className: "print-materials",
      emptyLabel: "Add print material thumbnails and document downloads here.",
      items: normalizeMediaItems(toolkit["print-materials"] ?? toolkit.print_materials),
      kind: "thumbnails",
      title: "Print Materials",
      variant: "document",
    });
  }

  if (hasOwn(toolkit, "videos")) {
    sections.push({
      className: "videos",
      emptyLabel: "Add shareable video thumbnails or external video links here.",
      items: normalizeMediaItems(toolkit.videos),
      kind: "thumbnails",
      title: "Shareable Videos of Keynote Speakers",
      variant: "video",
    });
  }

  if (hasOwn(toolkit, "b-roll")) {
    sections.push({
      className: "video-b-roll",
      emptyLabel: "Add b-roll clips or downloadable video links here.",
      items: normalizeMediaItems(toolkit["b-roll"]),
      kind: "thumbnails",
      title: "Shareable B-Roll Video Clips",
      variant: "video",
    });
  }

  if (hasOwn(toolkit, "soundbite") || hasOwn(toolkit, "sound_bites")) {
    sections.push({
      className: "sound-bites",
      emptyLabel: "Add shareable soundbite video clips here.",
      items: normalizeMediaItems(toolkit.soundbite ?? toolkit.sound_bites),
      kind: "thumbnails",
      title: "Shareable Soundbite Video Clips",
      variant: "video",
    });
  }

  if (hasOwn(toolkit, "image_library")) {
    sections.push({
      className: "image-library shareable-graphics",
      emptyLabel: "Add image thumbnails and download links here.",
      items: normalizeMediaItems(toolkit.image_library),
      kind: "thumbnails",
      title: "Image Library",
      variant: "graphic",
    });
  } else if (hasOwn(toolkit, "shareable_graphics") || hasOwn(toolkit, "photos")) {
    sections.push({
      className: "shareable-graphics photos",
      emptyLabel: "Add graphic thumbnails and download links here.",
      items: normalizeMediaItems(toolkit.shareable_graphics ?? toolkit.photos),
      kind: "thumbnails",
      title: "Shareable Graphics",
      variant: "graphic",
    });
  }

  if (hasOwn(toolkit, "webinar-materials") || hasOwn(toolkit, "webinar_materials")) {
    sections.push({
      className: "webinar-materials",
      emptyLabel: "Add webinar recordings and slide decks here.",
      items: normalizeWebinars(toolkit["webinar-materials"] ?? toolkit.webinar_materials),
      kind: "webinars",
      title: "Webinar Materials",
    });
  }

  if (hasOwn(toolkit, "media-coverage") || hasOwn(toolkit, "media_coverage")) {
    sections.push({
      className: "media-coverage",
      emptyLabel: "Add coverage links, press mentions, or article references here.",
      items: normalizeLinks(toolkit["media-coverage"] ?? toolkit.media_coverage),
      kind: "links",
      title: "Media Coverage",
    });
  }

  for (const section of buildDefaultSections(toolkit.content_types)) {
    if (!sections.some((existingSection) => existingSection.title === section.title)) {
      sections.push(section);
    }
  }

  return sections;
};

const buildSections = (toolkit: RawToolkitEntry): ToolkitSection[] => {
  const explicitKeys = [
    "contacts",
    "resource-links",
    "documents",
    "print-materials",
    "print_materials",
    "videos",
    "b-roll",
    "soundbite",
    "sound_bites",
    "image_library",
    "shareable_graphics",
    "photos",
    "webinar-materials",
    "webinar_materials",
    "media-coverage",
    "media_coverage",
  ];

  return explicitKeys.some((key) => hasOwn(toolkit, key)) ? buildExplicitSections(toolkit) : buildDefaultSections(toolkit.content_types);
};

const getToolkitBySlug = (slug: string): RawToolkitEntry | undefined => {
  const allToolkits = [...(toolkitCollection.outreach_toolkits ?? []), ...(toolkitCollection.media_toolkits ?? [])];

  return allToolkits.find((toolkit) => getSlugFromUrl(toolkit.url) === slug);
};

export const getToolkitPageBySlug = (slug: string): ToolkitPageData | undefined => {
  const toolkit = getToolkitBySlug(slug);

  if (!toolkit || !hasText(toolkit.title)) {
    return undefined;
  }

  const title = toolkit.title.trim();
  const description = cleanText(toolkit.description) || `${title} resources from ITS JPO.`;

  return {
    cta: normalizeCta(toolkit.belt_cta),
    description,
    intro: cleanText(toolkit.intro) || cleanText(toolkit.description) || undefined,
    keywords: uniqueStrings([...(toolkit.topics ?? []), toolkit.subtitle, title]),
    sections: buildSections(toolkit),
    title,
  };
};import brianC from "@/src/assets/images/newsroom/brian_c.png";
import norahO from "@/src/assets/images/newsroom/norah_o.png";
import toolkitData from "@/src/content/news-resources/toolkits/toolkits.json";

export type ToolkitContact = {
  contact?: string;
  department?: string;
  name: string;
  office?: string;
  profile_image?: string;
  title?: string;
};

export type ToolkitLinkItem = {
  href?: string;
  title: string;
};

export type ToolkitMediaItem = {
  alt?: string;
  ctaText?: string;
  downloadHref?: string;
  href?: string;
  imageSrc?: string;
  title: string;
};

export type ToolkitWebinarItem = {
  date: string;
  description: string;
  duration: string;
  recordingLink: string;
  slidesLink: string;
  subtitle: string;
  title: string;
};

export type ToolkitThumbnailVariant = "document" | "graphic" | "video";

export type ToolkitSection = {
  className?: string;
  contacts?: ToolkitContact[];
  description?: string;
  emptyLabel?: string;
  kind: "contacts" | "links" | "thumbnails" | "webinars";
  linkItems?: ToolkitLinkItem[];
  mediaItems?: ToolkitMediaItem[];
  title: string;
  variant?: ToolkitThumbnailVariant;
  webinars?: ToolkitWebinarItem[];
};

export type ToolkitBeltCta = {
  buttonText?: string;
  description?: string;
  href?: string;
  previewAlt?: string;
  previewImage?: string;
  title: string;
};

export type ToolkitPageData = {
  beltCta?: ToolkitBeltCta;
  description?: string;
  intro?: string;
  keywords?: string[] | string;
  sections: ToolkitSection[];
  title: string;
};

type RawContact = {
  contact?: string;
  department?: string;
  name?: string;
  office?: string;
  profile_image_key?: string;
  title?: string;
};

type RawLink = {
  href?: string;
  title?: string;
  "link-text"?: string;
};

type RawMediaItem = {
  cta_text?: string;
  download_href?: string;
  href?: string;
  image_src?: string;
  img_src?: string;
  title?: string;
};

type RawBeltCta = {
  button_text?: string;
  description?: string;
  href?: string;
  preview_alt?: string;
  preview_image?: string;
  title?: string;
};

type RawToolkitEntry = {
  belt_cta?: RawBeltCta;
  contacts?: RawContact[];
  content_types?: string[];
  date?: string;
  description?: string;
  document_links?: RawLink[];
  id?: number;
  image_library?: RawMediaItem[];
  intro?: string;
  media_coverage?: RawLink[];
  office?: string;
  photos?: RawMediaItem[];
  print_materials?: RawMediaItem[];
  resource_section_title?: string;
  shareable_graphics?: RawMediaItem[];
  sound_bites?: RawMediaItem[];
  soundbite?: RawMediaItem[];
  subtitle?: string;
  title?: string;
  topics?: string[];
  url?: string;
  videos?: RawMediaItem[];
  webinar_materials?: ToolkitWebinarItem[];
  b_roll?: RawMediaItem[];
  "b-roll"?: RawMediaItem[];
  "resource-links"?: RawLink[];
};

type ToolkitCollections = {
  media_toolkits?: RawToolkitEntry[];
  outreach_toolkits?: RawToolkitEntry[];
};

const toolkits = toolkitData as ToolkitCollections;

const contactImageMap: Record<string, string> = {
  brian_c: brianC.src,
  norah_o: norahO.src,
};

const cleanString = (value?: string): string => (typeof value === "string" ? value.trim() : "");

const uniqueStrings = (values: Array<string | undefined>): string[] => {
  return [...new Set(values.map((value) => cleanString(value)).filter(Boolean))];
};

const toArray = <T,>(value?: T[]): T[] => (Array.isArray(value) ? value : []);

const getSlugFromUrl = (url?: string): string => {
  return cleanString(url)
    .split("/")
    .filter(Boolean)
    .at(-1) ?? "";
};

const normalizeContacts = (contacts?: RawContact[]): ToolkitContact[] => {
  return toArray(contacts)
    .map((contact) => {
      const name = cleanString(contact.name);

      if (!name) {
        return undefined;
      }

      const profileImageKey = cleanString(contact.profile_image_key);

      return {
        contact: cleanString(contact.contact) || undefined,
        department: cleanString(contact.department) || undefined,
        name,
        office: cleanString(contact.office) || undefined,
        profile_image: profileImageKey ? contactImageMap[profileImageKey] : undefined,
        title: cleanString(contact.title) || undefined,
      };
    })
    .filter((contact): contact is ToolkitContact => Boolean(contact));
};

const normalizeLinks = (items?: RawLink[]): ToolkitLinkItem[] => {
  return toArray(items)
    .map((item) => {
      const title = cleanString(item.title) || cleanString(item["link-text"]);

      if (!title) {
        return undefined;
      }

      return {
        href: cleanString(item.href) || undefined,
        title,
      };
    })
    .filter((item): item is ToolkitLinkItem => Boolean(item));
};

const normalizeMediaItems = (items?: RawMediaItem[]): ToolkitMediaItem[] => {
  return toArray(items)
    .map((item) => {
      const title = cleanString(item.title);
      const href = cleanString(item.href);
      const imageSrc = cleanString(item.image_src) || cleanString(item.img_src);
      const downloadHref = cleanString(item.download_href);
      const ctaText = cleanString(item.cta_text);

      if (!title && !href && !imageSrc && !downloadHref) {
        return undefined;
      }

      return {
        ctaText: ctaText || undefined,
        downloadHref: downloadHref || undefined,
        href: href || undefined,
        imageSrc: imageSrc || undefined,
        title: title || "Untitled Asset",
      };
    })
    .filter((item): item is ToolkitMediaItem => Boolean(item));
};

const normalizeWebinars = (items?: ToolkitWebinarItem[]): ToolkitWebinarItem[] => {
  return toArray(items).filter((item) => Boolean(cleanString(item.title) || cleanString(item.date)));
};

const normalizeBeltCta = (beltCta?: RawBeltCta): ToolkitBeltCta | undefined => {
  const title = cleanString(beltCta?.title);

  if (!title) {
    return undefined;
  }

  return {
    buttonText: cleanString(beltCta?.button_text) || undefined,
    description: cleanString(beltCta?.description) || undefined,
    href: cleanString(beltCta?.href) || undefined,
    previewAlt: cleanString(beltCta?.preview_alt) || undefined,
    previewImage: cleanString(beltCta?.preview_image) || undefined,
    title,
  };
};

type DefaultSectionSeed = {
  className: string;
  emptyLabel: string;
  key: string;
  kind: ToolkitSection["kind"];
  title: string;
  variant?: ToolkitThumbnailVariant;
};

const defaultContentTypeSections: Record<string, DefaultSectionSeed> = {
  "fact sheet": {
    className: "documents",
    emptyLabel: "Add fact sheets, briefs, or supporting document links here.",
    key: "fact-sheets",
    kind: "links",
    title: "Fact Sheets & Documents",
  },
  infographic: {
    className: "shareable-graphics infographics",
    emptyLabel: "Add shareable graphic thumbnails and downloads here.",
    key: "shareable-graphics",
    kind: "thumbnails",
    title: "Shareable Graphics",
    variant: "graphic",
  },
  photos: {
    className: "shareable-graphics photos",
    emptyLabel: "Add shareable graphic thumbnails and downloads here.",
    key: "shareable-graphics",
    kind: "thumbnails",
    title: "Shareable Graphics",
    variant: "graphic",
  },
  presentation: {
    className: "documents presentations",
    emptyLabel: "Add presentation deck links here.",
    key: "presentations",
    kind: "links",
    title: "Presentations",
  },
  "print materials": {
    className: "print-materials",
    emptyLabel: "Add print material thumbnails and document downloads here.",
    key: "print-materials",
    kind: "thumbnails",
    title: "Print Materials",
    variant: "document",
  },
  "social posts": {
    className: "social-posts",
    emptyLabel: "Add approved social post copy or download links here.",
    key: "social-posts",
    kind: "links",
    title: "Social Posts",
  },
  slides: {
    className: "documents slides",
    emptyLabel: "Add slide decks or briefing materials here.",
    key: "slides",
    kind: "links",
    title: "Slides",
  },
  "sound bites": {
    className: "sound-bites",
    emptyLabel: "Add short soundbite clips or downloadable links here.",
    key: "sound-bites",
    kind: "thumbnails",
    title: "Shareable Soundbite Video Clips",
    variant: "video",
  },
  "talking points": {
    className: "talking-points documents",
    emptyLabel: "Add talking point documents or copy decks here.",
    key: "talking-points",
    kind: "links",
    title: "Talking Points",
  },
  video: {
    className: "videos",
    emptyLabel: "Add shareable video thumbnails or external video links here.",
    key: "videos",
    kind: "thumbnails",
    title: "Shareable Videos of Keynote Speakers",
    variant: "video",
  },
  "video b-roll": {
    className: "video-b-roll",
    emptyLabel: "Add b-roll clips or downloadable video links here.",
    key: "video-b-roll",
    kind: "thumbnails",
    title: "Shareable B-Roll Video Clips",
    variant: "video",
  },
  "webinar materials": {
    className: "webinar-materials",
    emptyLabel: "Add webinar recordings and slide decks here.",
    key: "webinar-materials",
    kind: "webinars",
    title: "Webinar Materials",
  },
};

const buildSectionFromSeed = (seed: DefaultSectionSeed): ToolkitSection => {
  if (seed.kind === "links") {
    return {
      className: seed.className,
      emptyLabel: seed.emptyLabel,
      kind: "links",
      linkItems: [],
      title: seed.title,
    };
  }

  if (seed.kind === "webinars") {
    return {
      className: seed.className,
      emptyLabel: seed.emptyLabel,
      kind: "webinars",
      title: seed.title,
      webinars: [],
    };
  }

  return {
    className: seed.className,
    emptyLabel: seed.emptyLabel,
    kind: "thumbnails",
    mediaItems: [],
    title: seed.title,
    variant: seed.variant,
  };
};

const buildDefaultSections = (contentTypes?: string[]): ToolkitSection[] => {
  const sections: ToolkitSection[] = [];
  const seenKeys = new Set<string>();

  for (const contentType of toArray(contentTypes)) {
    const seed = defaultContentTypeSections[cleanString(contentType).toLowerCase()];

    if (!seed || seenKeys.has(seed.key)) {
      continue;
    }

    seenKeys.add(seed.key);
    sections.push(buildSectionFromSeed(seed));
  }

  return sections;
};

const createLinkSection = (
  title: string,
  className: string,
  emptyLabel: string,
  linkItems: ToolkitLinkItem[] = [],
  description?: string,
): ToolkitSection => ({
  className,
  description,
  emptyLabel,
  kind: "links",
  linkItems,
  title,
});

const createThumbnailSection = (
  title: string,
  className: string,
  variant: ToolkitThumbnailVariant,
  emptyLabel: string,
  mediaItems: ToolkitMediaItem[] = [],
  description?: string,
): ToolkitSection => ({
  className,
  description,
  emptyLabel,
  kind: "thumbnails",
  mediaItems,
  title,
  variant,
});

const createWebinarSection = (
  title: string,
  className: string,
  emptyLabel: string,
  webinars: ToolkitWebinarItem[] = [],
  description?: string,
): ToolkitSection => ({
  className,
  description,
  emptyLabel,
  kind: "webinars",
  title,
  webinars,
});

const createContactSection = (contacts: ToolkitContact[] = []): ToolkitSection => ({
  className: "contacts",
  contacts,
  emptyLabel: "Add media contact cards here.",
  kind: "contacts",
  title: "Media Contacts",
});

const buildMediaSections = (entry: RawToolkitEntry): ToolkitSection[] => {
  const sections: ToolkitSection[] = [];
  const contacts = normalizeContacts(entry.contacts);
  const documentLinks = normalizeLinks(entry.document_links ?? entry["resource-links"]);
  const printMaterials = normalizeMediaItems(entry.print_materials);
  const videos = normalizeMediaItems(entry.videos);
  const bRoll = normalizeMediaItems(entry.b_roll ?? entry["b-roll"]);
  const soundBites = normalizeMediaItems(entry.sound_bites ?? entry.soundbite);
  const graphics = normalizeMediaItems(entry.shareable_graphics ?? entry.image_library ?? entry.photos);
  const coverageLinks = normalizeLinks(entry.media_coverage);
  const webinars = normalizeWebinars(entry.webinar_materials);

  if (contacts.length > 0) {
    sections.push(createContactSection(contacts));
  }

  if (documentLinks.length > 0) {
    sections.push(
      createLinkSection(
        cleanString(entry.resource_section_title) || "Fact Sheets & Documents",
        "documents resources",
        "Add fact sheets and supporting document links here.",
        documentLinks,
      ),
    );
  }

  if (printMaterials.length > 0) {
    sections.push(
      createThumbnailSection(
        "Print Materials",
        "print-materials",
        "document",
        "Add print material thumbnails and document downloads here.",
        printMaterials,
      ),
    );
  }

  if (videos.length > 0) {
    sections.push(
      createThumbnailSection(
        "Shareable Videos of Keynote Speakers",
        "videos",
        "video",
        "Add shareable video thumbnails or links here.",
        videos,
      ),
    );
  }

  if (bRoll.length > 0) {
    sections.push(
      createThumbnailSection(
        "Shareable B-Roll Video Clips",
        "video-b-roll",
        "video",
        "Add b-roll clips or downloadable video links here.",
        bRoll,
      ),
    );
  }

  if (soundBites.length > 0) {
    sections.push(
      createThumbnailSection(
        "Shareable Soundbite Video Clips",
        "sound-bites",
        "video",
        "Add short soundbite clips or downloadable links here.",
        soundBites,
      ),
    );
  }

  if (graphics.length > 0) {
    sections.push(
      createThumbnailSection(
        "Shareable Graphics",
        "shareable-graphics photos",
        "graphic",
        "Add shareable graphic thumbnails and downloads here.",
        graphics,
      ),
    );
  }

  if (webinars.length > 0) {
    sections.push(
      createWebinarSection(
        "Webinar Materials",
        "webinar-materials",
        "Add webinar recordings and slide decks here.",
        webinars,
      ),
    );
  }

  if (coverageLinks.length > 0) {
    sections.push(
      createLinkSection(
        "Media Coverage",
        "media-coverage",
        "Add media coverage links and press mentions here.",
        coverageLinks,
      ),
    );
  }

  const fallbackSections = buildDefaultSections(entry.content_types);

  for (const fallbackSection of fallbackSections) {
    if (sections.some((section) => section.title === fallbackSection.title)) {
      continue;
    }

    sections.push(fallbackSection);
  }

  return sections;
};

const buildUdotOverride = (entry: RawToolkitEntry): Partial<ToolkitPageData> => ({
  beltCta:
    normalizeBeltCta(entry.belt_cta) ?? {
      buttonText: "Visit Project Site",
      description: "Use this feature belt for the main project site, lead download, or the page that should anchor the kit.",
      title: "Connecting the West Program",
    },
  sections: [
    createThumbnailSection(
      "Print Materials",
      "print-materials",
      "document",
      "Add print material thumbnails and document downloads here.",
      normalizeMediaItems(entry.print_materials),
      "Use this section for fact sheets, flyers, postcards, and other leave-behind materials.",
    ),
    createThumbnailSection(
      "Shareable Videos of Keynote Speakers",
      "videos",
      "video",
      "Add shareable video thumbnails or links here.",
      normalizeMediaItems(entry.videos),
      "Hosted videos, keynote clips, b-roll, and project stories can all live in this grid.",
    ),
    createThumbnailSection(
      "Image Library",
      "image-library shareable-graphics",
      "graphic",
      "Add image thumbnails and download links here.",
      normalizeMediaItems(entry.image_library ?? entry.shareable_graphics),
      "Use this gallery for approved stills, project photography, and social-ready graphics.",
    ),
    createWebinarSection(
      "Webinar Materials",
      "webinar-materials",
      "Add webinar recordings and slide decks here.",
      [],
      "Use the newsroom webinar card layout for recordings, slides, and post-event materials.",
    ),
    createLinkSection(
      "Media Coverage",
      "media-coverage",
      "Add coverage links and press mentions here.",
      normalizeLinks(entry.media_coverage),
      "Collect press stories, notable mentions, and external coverage in one place.",
    ),
  ],
});

const buildTrbOverride = (entry: RawToolkitEntry): Partial<ToolkitPageData> => ({
  sections: [
    createContactSection(normalizeContacts(entry.contacts)),
    createLinkSection(
      cleanString(entry.resource_section_title) || "ITS JPO Resources Distributed at TRB 2026",
      "documents resources",
      "Add fact sheet and document links here.",
      normalizeLinks(entry.document_links),
    ),
    createLinkSection(
      "Social Posts",
      "social-posts",
      "Add approved social post copy or download links here.",
    ),
    createThumbnailSection(
      "Shareable Graphics",
      "shareable-graphics infographics",
      "graphic",
      "Add graphic thumbnails and download links here.",
    ),
    createLinkSection(
      "Presentations",
      "documents presentations",
      "Add presentation deck links here.",
    ),
  ],
});

const buildItsWorldCongressOverride = (entry: RawToolkitEntry): Partial<ToolkitPageData> => ({
  sections: [
    createContactSection(normalizeContacts(entry.contacts)),
    createLinkSection(
      "Fact Sheets & Documents",
      "documents resources",
      "Add fact sheets and supporting document links here.",
      normalizeLinks(entry.document_links ?? entry["resource-links"]),
    ),
    createThumbnailSection(
      "Shareable Videos of Keynote Speakers",
      "videos",
      "video",
      "Add shareable video thumbnails or links here.",
      normalizeMediaItems(entry.videos),
    ),
    createThumbnailSection(
      "Shareable B-Roll Video Clips",
      "video-b-roll",
      "video",
      "Add b-roll clips or downloadable video links here.",
      normalizeMediaItems(entry.b_roll ?? entry["b-roll"]),
    ),
    createThumbnailSection(
      "Shareable Soundbite Video Clips",
      "sound-bites",
      "video",
      "Add short soundbite clips or downloadable links here.",
      normalizeMediaItems(entry.sound_bites ?? entry.soundbite),
    ),
    createThumbnailSection(
      "Shareable Graphics",
      "shareable-graphics photos",
      "graphic",
      "Add shareable graphic thumbnails and downloads here.",
      normalizeMediaItems(entry.shareable_graphics ?? entry.photos),
    ),
  ],
});

const pageOverrides: Record<string, (entry: RawToolkitEntry) => Partial<ToolkitPageData>> = {
  "its-wc-2025-kit": buildItsWorldCongressOverride,
  "trb-2026-kit": buildTrbOverride,
  "udot-connecting-the-west-program-mediakit": buildUdotOverride,
};

export const getToolkitPageBySlug = (slug: string): ToolkitPageData | undefined => {
  const allToolkits = [...toArray(toolkits.outreach_toolkits), ...toArray(toolkits.media_toolkits)];
  const entry = allToolkits.find((toolkit) => getSlugFromUrl(toolkit.url) === slug);

  if (!entry) {
    return undefined;
  }

  const isMediaToolkit = toArray(toolkits.media_toolkits).includes(entry);
  const override = pageOverrides[slug]?.(entry);
  const sections = override?.sections ?? (isMediaToolkit ? buildMediaSections(entry) : buildDefaultSections(entry.content_types));

  return {
    beltCta: override?.beltCta ?? normalizeBeltCta(entry.belt_cta),
    description: cleanString(entry.description) || undefined,
    intro: cleanString(entry.intro) || cleanString(entry.description) || undefined,
    keywords: uniqueStrings([...(entry.topics ?? []), cleanString(entry.subtitle)]),
    sections,
    title: cleanString(entry.title),
  };
};