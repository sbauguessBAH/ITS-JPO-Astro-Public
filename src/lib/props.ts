import type { HTMLAttributes } from "astro/types";

export const externalLink: HTMLAttributes<'a'> = {
  rel: "noopener noreferrer",
  target: "_blank"
}