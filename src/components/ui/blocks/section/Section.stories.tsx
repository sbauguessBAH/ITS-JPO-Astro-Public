import Icon from "../../icon/Icon.astro";
import Section from "./Section.astro";
import SectionContent from "./SectionContent.astro";
import SectionDescription from "./SectionDescription.astro";
import SectionHeadline from "./SectionHeadline.astro";
import SectionHighlight from "./SectionHighlight.astro";
import SectionHighlights from "./SectionHighlights.astro";
import SectionIcon from "./SectionIcon.astro";
import SectionImage from "./SectionImage.astro";
import SectionTitle from "./SectionTitle.astro";

const sectionSlots = {
  default: [
    {
      component: SectionContent,
      slots: {
        default: [
          {
            component: SectionIcon,
            slots: {
              default: {
                component: Icon,
                props: { name: "bullseye", size: 40 },
              },
            },
          },
          {
            component: SectionHeadline,
            slots: { default: "Program resources" },
          },
          {
            component: SectionTitle,
            slots: { default: "Plan a connected deployment" },
          },
          {
            component: SectionDescription,
            slots: {
              default:
                "Use practical guidance, training, and peer lessons to move from concept to implementation.",
            },
          },
          {
            component: SectionHighlights,
            slots: {
              default: [
                {
                  component: SectionHighlight,
                  props: { href: "/resources/" },
                  slots: { default: "Browse deployment resources" },
                },
                {
                  component: SectionHighlight,
                  props: { orientation: "vertical" },
                  slots: { default: "Explore training opportunities" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      component: SectionImage,
      props: {
        entry: "pcb/cave-box",
      },
    },
  ],
};

const contentSlots = sectionSlots.default[0];

const iconHighlight = (label: string, props = {}) => ({
  component: SectionHighlight,
  props,
  slots: {
    default: [
      {
        component: SectionIcon,
        slots: {
          default: {
            component: Icon,
            props: { name: "bullseye", size: 40 },
          },
        },
      },
      {
        component: SectionContent,
        slots: {
          default: [
            {
              component: SectionTitle,
              props: { as: "h3" },
              slots: { default: label },
            },
            {
              component: SectionDescription,
              slots: {
                default: "Short supporting description for this highlight.",
              },
            },
          ],
        },
      },
    ],
  },
});

const highlightSlots = {
  default: [
    {
      component: SectionContent,
      slots: {
        default: [
          {
            component: SectionTitle,
            slots: { default: "Why participate" },
          },
          {
            component: SectionHighlights,
            slots: {
              default: [
                iconHighlight("Hands-on training", { href: "/resources/" }),
                iconHighlight("Peer exchange"),
                iconHighlight("Vertical highlight", {
                  orientation: "vertical",
                }),
              ],
            },
          },
        ],
      },
    },
    sectionSlots.default[1],
  ],
};

const meta = {
  title: "UI/Blocks/Section",
  component: Section,
  argTypes: {
    color: {
      options: ["default", "muted"],
      control: { type: "select" },
    },
    orientation: {
      options: ["vertical", "horizontal"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "lg", "xl"],
      control: { type: "select" },
    },
    split: {
      options: ["1/1", "1/2", "1/3", "2/1", "3/1"],
      control: { type: "select" },
    },
  },
  args: {
    color: "default",
    orientation: "vertical",
    reverse: false,
    size: "default",
    split: "1/1",
    slots: sectionSlots,
  },
};

export default meta;

export const Default = {};

export const Horizontal = {
  args: {
    orientation: "horizontal",
  },
};

export const Reversed = {
  args: {
    orientation: "horizontal",
    reverse: true,
    split: "2/1",
  },
};

export const Muted = {
  args: {
    color: "muted",
    orientation: "horizontal",
    split: "1/2",
  },
};

export const ReversedVertical = {
  args: {
    reverse: true,
  },
};

export const WithoutImage = {
  args: {
    orientation: "horizontal",
    slots: { default: [contentSlots] },
  },
};

export const Highlights = {
  args: {
    orientation: "horizontal",
    slots: highlightSlots,
  },
};

export const Small = {
  args: {
    size: "sm",
  },
};

export const Large = {
  args: {
    orientation: "horizontal",
    size: "lg",
  },
};

export const ExtraLarge = {
  args: {
    orientation: "horizontal",
    size: "xl",
  },
};
