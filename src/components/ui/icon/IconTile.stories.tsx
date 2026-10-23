import ComponentGrid from "../../../../.storybook/ComponentGrid.astro";
import ComponentTile from "../../../../.storybook/ComponentTile.astro";
import Icon from "./Icon.astro";
import IconTile from "./IconTile.astro";

const icon = { component: Icon, props: { name: "compass" } };

const tile = (label: string, props: Record<string, string>) => ({
  component: ComponentTile,
  props: { label },
  slots: {
    default: [{ component: IconTile, props, slots: { default: [icon] } }],
  },
});

const variants = ["soft", "outline"];
const sizes = ["sm", "default", "lg"];

const meta = {
  title: "UI/Icon Tile",
  component: IconTile,
  argTypes: {
    size: {
      options: sizes,
      control: { type: "select" },
    },
    variant: {
      options: variants,
      control: { type: "select" },
    },
  },
  args: {
    variant: "soft",
    size: "default",
    slots: { default: [icon] },
  },
};

export default meta;

export const Default = {};

export const Variants = {
  render: () => ({
    component: ComponentGrid,
    props: { align: "end", minWidth: "8rem" },
    slots: {
      default: variants.map((variant) => tile(variant, { variant })),
    },
  }),
  parameters: {
    controls: { disable: true },
  },
};

export const Sizes = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentGrid,
    props: { align: "end", minWidth: "8rem" },
    slots: {
      default: sizes.map((size) =>
        tile(size, { size, variant: args.variant ?? "soft" }),
      ),
    },
  }),
  parameters: {
    controls: { exclude: ["size"] },
  },
};
