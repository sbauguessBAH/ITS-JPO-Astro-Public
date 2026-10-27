import ComponentStory from "../../../../../.storybook/ComponentStory.astro";
import Heading from "./Heading.astro";

const sizes = [
  { label: "XL", size: "xl" },
  { label: "Default", size: "default" },
  { label: "Medium", size: "md" },
  { label: "Small", size: "sm" },
];

const label = (text: string) =>
  `<span class="tw:text-sm tw:text-muted-foreground">${text}</span>`;

const meta = {
  title: "UI/Elements/Heading",
  component: Heading,
  argTypes: {
    as: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "md", "xl"],
      control: { type: "select" },
    },
  },
  args: {
    size: "default",
    slots: {
      default: "Connected transportation",
    },
  },
};

export default meta;

export const Default = {};

export const Sizes = {
  // @ts-expect-error storybook-astro does not export types
  render: () => ({
    component: ComponentStory,
    props: { columns: 1 },
    slots: {
      default: sizes.flatMap(({ label: text, size }) => [
        label(text),
        {
          component: Heading,
          props: { size },
          slots: { default: "Connected transportation" },
        },
      ]),
    },
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const SemanticOverride = {
  args: {
    as: "h2",
    size: "sm",
  },
};
