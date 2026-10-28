import Section from "./Section.astro";
import SectionBody from "./SectionBody.astro";
import SectionHeader from "./SectionHeader.astro";

const description =
  "Use practical guidance, training, and peer lessons to move from concept to implementation.";

const header = {
  component: SectionHeader,
  props: {
    description,
    headline: "Program resources",
    title: "Plan a connected deployment",
  },
};

const sectionSlots = {
  default: [
    header,
    {
      component: SectionBody,
      slots: {
        default: [
          '<div class="tw:h-48 tw:w-full tw:rounded-lg tw:bg-black/10"></div>',
        ],
      },
    },
  ],
};

const meta = {
  title: "UI/Blocks/Section",
  component: Section,
  parameters: {
    layout: "fullScreen",
  },
  argTypes: {
    color: {
      options: ["default", "muted"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "lg"],
      control: { type: "select" },
    },
  },
  args: {
    color: "default",
    size: "default",
    slots: sectionSlots,
  },
};

export default meta;

export const Default = {};

/**
 * Muted sections usually pair with `size="lg"` so the content has room inside the background
 */
export const Muted = {
  args: {
    color: "muted",
    size: "lg",
  },
};

/**
 * Adds vertical padding around the content
 */
export const Large = {
  args: {
    size: "lg",
  },
};

/**
 * Renders the section with a smaller max-width container
 */
export const Small = {
  args: {
    size: "sm",
  },
};