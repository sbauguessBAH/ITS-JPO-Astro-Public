import ComponentStory from "../../../../../.storybook/ComponentStory.astro";
import Button from "./Button.astro";
import Icon from "../../icon/Icon.astro";

const colors = ["primary", "secondary", "accent"];
const variants = ["default", "outline", "subtle", "ghost"];
const sizes = [
  { label: "Small", size: "sm" },
  { label: "Default", size: "default" },
  { label: "Large", size: "lg" },
];

// Icon pixel size paired with each button size so icons scale with the button
const iconSizes = [
  { label: "Small", size: "sm", iconSize: "icon-sm", pixels: 16 },
  { label: "Default", size: "default", iconSize: "icon", pixels: 18 },
  { label: "Large", size: "lg", iconSize: "icon-lg", pixels: 20 },
];

const icon = (name: string, pixels: number) => ({
  component: Icon,
  props: { name, size: pixels },
});

const label = (text: string, emphasis = false) =>
  `<span class="tw:text-sm ${emphasis ? "tw:font-semibold" : "tw:text-muted-foreground"} tw:capitalize">${text}</span>`;

const button = (text: string, props: Record<string, unknown>) => ({
  component: Button,
  props,
  slots: { default: text },
});

const meta = {
  title: "UI/Elements/Button",
  component: Button,
  argTypes: {
    color: {
      options: ["primary", "secondary", "accent"],
      control: { type: "select" },
    },
    variant: {
      options: ["default", "outline", "subtle", "ghost"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "lg"],
      control: { type: "select" },
    },
    type: { table: { disable: true } },
    link: { table: { disable: true } },
  },
  args: {
    color: "primary",
    size: "default",
    variant: "default",
    slots: {
      default: "Button",
    },
  },
};

export default meta;

export const Default = {
  argTypes: {
    disabled: { control: "boolean" },
    link: { table: { disable: false } },
    type: { table: { disable: false } },
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
  parameters: {
    controls: { exclude: ["disabled"] },
  },
};

export const Link = {
  argTypes: {
    link: { table: { disable: false } },
  },
  args: {
    link: {
      href: "/resources/",
    },
    slots: {
      default: "Browse resources",
    },
  },
};

export const Colors = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentStory,
    props: { columns: colors.length },
    slots: {
      default: [
        "<span></span>",
        ...colors.map((color) => label(color, true)),
        ...variants.flatMap((variant) => [
          label(variant),
          ...colors.map((color) =>
            button(color, { color, variant, size: args.size }),
          ),
        ]),
      ],
    },
  }),
  parameters: {
    controls: { exclude: ["color", "variant"] },
  },
};

export const Sizes = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentStory,
    props: { columns: sizes.length },
    slots: {
      default: [
        "<span></span>",
        ...sizes.map(({ label: text }) => label(text, true)),
        label("Size"),
        ...sizes.map(({ label: text, size }) =>
          button(text, { color: args.color, variant: args.variant, size }),
        ),
      ],
    },
  }),
  parameters: {
    controls: { exclude: ["size"] },
  },
};

export const Icons = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentStory,
    props: { columns: iconSizes.length },
    slots: {
      default: [
        "<span></span>",
        ...iconSizes.map(({ label: text }) => label(text, true)),
        label("Icon only"),
        ...iconSizes.map(({ iconSize, pixels }) => ({
          component: Button,
          props: {
            "aria-label": "Download",
            color: args.color,
            size: iconSize,
            variant: args.variant,
          },
          slots: { default: icon("download", pixels) },
        })),
        label("Leading icon"),
        ...iconSizes.map(({ size, pixels }) => ({
          component: Button,
          props: { color: args.color, size, variant: args.variant },
          slots: { default: [icon("download", pixels), "Download"] },
        })),
        label("Trailing icon"),
        ...iconSizes.map(({ size, pixels }) => ({
          component: Button,
          props: { color: args.color, size, variant: args.variant },
          slots: { default: ["Continue", icon("chevron-right", pixels)] },
        })),
      ],
    },
  }),
  parameters: {
    controls: { exclude: ["size"] },
  },
};
