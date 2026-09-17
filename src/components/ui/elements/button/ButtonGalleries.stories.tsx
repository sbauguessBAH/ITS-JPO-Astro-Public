import ComponentStory from "../../../../../.storybook/ComponentStory.astro";
import Button from "./Button.astro";

const colors = ["primary", "secondary", "accent"];
const variants = ["default", "outline", "subtle", "ghost"];

const label = (text: string, emphasis = false) =>
  `<span class="tw:text-sm ${emphasis ? "tw:font-semibold" : "tw:text-muted-foreground"} tw:capitalize">${text}</span>`;

const button = (text: string, props: Record<string, string>) => ({
  component: Button,
  props,
  slots: { default: text },
});

const meta = {
  title: "UI/Elements/Button/Galleries",
  component: ComponentStory,
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const Colors = {
  args: {
    columns: colors.length,
    slots: {
      default: [
        "<span></span>",
        ...colors.map((color) => label(color, true)),
        ...variants.flatMap((variant) => [
          label(variant),
          ...colors.map((color) => button(color, { color, variant })),
        ]),
      ],
    },
  },
};

export const Sizes = {
  args: {
    columns: 3,
    slots: {
      default: [
        "<span></span>",
        label("Small", true),
        label("Default", true),
        label("Large", true),
        label("Size"),
        button("Small", { size: "sm" }),
        button("Default", { size: "default" }),
        button("Large", { size: "lg" }),
      ],
    },
  },
};
