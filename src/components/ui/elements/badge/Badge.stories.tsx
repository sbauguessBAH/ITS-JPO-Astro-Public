import ComponentStory from "../../../../../.storybook/ComponentStory.astro";
import Badge from "./Badge.astro";
import Icon from "../../icon/Icon.astro";

const colors = ["primary", "secondary", "accent", "neutral"];
const variants = ["default", "outline", "subtle", "ghost"];
const sizes = [
  { label: "Small", size: "sm" },
  { label: "Default", size: "default" },
  { label: "Large", size: "lg" },
  { label: "XL", size: "xl" },
];

// Custom colors come from the site palette in globals.css via `tw:bg-*` classes
const customColors = [
  {
    label: "Cyan",
    default: "tw:bg-cyan tw:text-black tw:border-cyan",
    subtle: "tw:bg-cyan/20 tw:text-black tw:border-cyan/60",
    outline: "tw:bg-transparent tw:text-black tw:border-cyan",
    ghost:
      "tw:bg-transparent tw:text-black tw:border-transparent tw:hover:bg-cyan/20",
  },
  {
    label: "Lime",
    default: "tw:bg-lime tw:text-black tw:border-lime",
    subtle: "tw:bg-lime/20 tw:text-black tw:border-lime/60",
    outline: "tw:bg-transparent tw:text-black tw:border-lime",
    ghost:
      "tw:bg-transparent tw:text-black tw:border-transparent tw:hover:bg-lime/20",
  },
  {
    label: "Crimson",
    default: "tw:bg-crimson tw:text-white tw:border-crimson",
    subtle: "tw:bg-crimson/12 tw:text-crimson tw:border-crimson/35",
    outline: "tw:bg-transparent tw:text-crimson tw:border-crimson",
    ghost:
      "tw:bg-transparent tw:text-crimson tw:border-transparent tw:hover:bg-crimson/10",
  },
  {
    label: "Orange",
    default: "tw:bg-orange tw:text-black tw:border-orange",
    subtle: "tw:bg-orange/20 tw:text-black tw:border-orange/60",
    outline: "tw:bg-transparent tw:text-black tw:border-orange",
    ghost:
      "tw:bg-transparent tw:text-black tw:border-transparent tw:hover:bg-orange/20",
  },
];

const icon = (name: string, position?: "inline-end" | "inline-start") => ({
  component: Icon,
  props: { name, ...(position && { "data-icon": position }) },
});

const label = (text: string, emphasis = false) =>
  `<span class="tw:text-sm ${emphasis ? "tw:font-semibold" : "tw:text-muted-foreground"} tw:capitalize">${text}</span>`;

const badge = (
  text: string | Record<string, unknown> | (string | Record<string, unknown>)[],
  props: Record<string, unknown>,
) => ({
  component: Badge,
  props,
  slots: { default: text },
});

const meta = {
  title: "UI/Elements/Badge",
  component: Badge,
  argTypes: {
    color: {
      options: ["primary", "secondary", "accent", "neutral"],
      control: { type: "select" },
    },
    variant: {
      options: ["default", "outline", "subtle", "ghost"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "lg", "xl"],
      control: { type: "select" },
    },
  },
  args: {
    color: "primary",
    size: "default",
    variant: "default",
    slots: {
      default: "Badge",
    },
  },
};

export default meta;

export const Default = {};

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
            badge(color, {
              color,
              size: args.size,
              variant,
            }),
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
          badge(text, {
            color: args.color,
            size,
            variant: args.variant,
          }),
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
    props: { columns: sizes.length },
    slots: {
      default: [
        "<span></span>",
        ...sizes.map(({ label: text }) => label(text, true)),
        label("Icon only"),
        ...sizes.map(({ size }) =>
          badge(icon("check-lg"), {
            "aria-label": "Verified",
            color: args.color,
            size,
            variant: args.variant,
          }),
        ),
        label("Leading icon"),
        ...sizes.map(({ size }) =>
          badge([icon("check-lg", "inline-start"), "Verified"], {
            color: args.color,
            size,
            variant: args.variant,
          }),
        ),
        label("Trailing icon"),
        ...sizes.map(({ size }) =>
          badge(["Details", icon("chevron-right", "inline-end")], {
            color: args.color,
            size,
            variant: args.variant,
          }),
        ),
      ],
    },
  }),
  parameters: {
    controls: { exclude: ["size"] },
  },
};

/**
 * Tailwind classes can be used to easily apply custom colors to badges.
 */
export const CustomColors = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentStory,
    props: { columns: variants.length },
    slots: {
      default: [
        "<span></span>",
        ...variants.map((variant) => label(variant, true)),
        ...customColors.flatMap((custom) => [
          label(custom.label),
          ...variants.map((variant) =>
            badge(custom.label, {
              class: custom[variant as "default" | "outline" | "subtle"],
              color: "custom",
              size: args.size,
              variant,
            }),
          ),
        ]),
      ],
    },
  }),
  parameters: {
    controls: { exclude: ["color", "variant"] },
  },
};
