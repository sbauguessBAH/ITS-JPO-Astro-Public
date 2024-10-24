import type { HTMLAttributes } from "astro/types";

export const externalLink: HTMLAttributes<'a'> = {
  target: "_blank",
  rel: "noopener noreferrer"
}