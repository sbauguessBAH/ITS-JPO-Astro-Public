/**
 * List of icons
 *
 * @remarks
 * This constant enables static type suggestions for icons. You can use the
 * `IconName` type in a component to ensure only valid icon names are used.
 *
 * If an icon name is not included here, it will not be accessible to the application.
 * Names should match the file name without the extension (`check.svg` -> `check`)
 *
 * @privateRemarks
 * This could eventually be set up as a map of icons to file names if we need to
 * store icons in different locations, but for now it just uses `import.meta.glob`
 * to look up icons from the `src/icons/` folder.
 */
export const ICON_NAMES = [
  "arrow-up-right",
  "bullseye",
  "check",
  "check-lg",
  "check2-circle",
  "chevron-down",
  "chevron-right",
  "compass",
  "copy",
  "docx",
  "download",
  "email",
  "external-link",
  "film",
  "link",
  "list",
  "pdf",
  "ppt",
  "telephone-outbound-fill",
  "three-dots",
  "basket-fill",
  "flask-fill",
  "router-fill",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
