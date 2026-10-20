import ComponentGrid from "../../../../.storybook/ComponentGrid.astro";
import ComponentTile from "../../../../.storybook/ComponentTile.astro";
import { ICON_NAMES } from "./icons";
import Icon from "./Icon.astro";

const sizes = [24, 32, 64].map((size) => ({ size, label: size + "px" }));
const sortedIconNames = [...ICON_NAMES].sort((a, b) => a.localeCompare(b));

// The select control's "Choose option..." entry sets `name` to undefined.
const withName = (name: string | undefined, fallback: string) =>
  name ?? fallback;

const meta = {
  title: "UI/Icon",
  component: Icon,
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: Icon,
    props: { ...args, name: withName(args.name, "compass") },
  }),
  argTypes: {
    name: {
      options: ICON_NAMES,
      control: { type: "select" },
    },
    size: {
      control: { type: "number", min: 12, max: 96, step: 4 },
    },
  },
  args: {
    name: "compass",
    size: 32,
  },
};

export default meta;

export const Default = {};

export const Sizes = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentGrid,
    props: { minWidth: "8rem", align: "end" },
    slots: {
      default: sizes.map(({ size, label }) => ({
        component: ComponentTile,
        props: { label },
        slots: {
          default: [
            {
              component: Icon,
              props: { name: withName(args.name, "check2-circle"), size },
            },
          ],
        },
      })),
    },
  }),
  args: { name: "check2-circle" },
  parameters: {
    controls: { exclude: ["size"] },
  },
};

export const Catalog = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentGrid,
    props: { minWidth: "12rem" },
    slots: {
      default: sortedIconNames.map((name) => ({
        component: ComponentTile,
        props: { label: name },
        slots: {
          default: [{ component: Icon, props: { name, size: args.size } }],
        },
      })),
    },
  }),
  args: { size: 24 },
  parameters: {
    controls: { exclude: ["name"] },
  },
};
