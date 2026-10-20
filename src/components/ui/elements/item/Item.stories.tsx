import Button from "../button/Button.astro";
import ComponentGrid from "../../../../../.storybook/ComponentGrid.astro";
import Icon from "../../icon/Icon.astro";
import Item from "./Item.astro";
import ItemActions from "./ItemActions.astro";
import ItemContent from "./ItemContent.astro";
import ItemDescription from "./ItemDescription.astro";
import ItemFooter from "./ItemFooter.astro";
import ItemGroup from "./ItemGroup.astro";
import ItemHeader from "./ItemHeader.astro";
import ItemMedia from "./ItemMedia.astro";
import ItemTitle from "./ItemTitle.astro";

const itemSlots = (title = "Deployment guide") => ({
  default: [
    {
      component: ItemMedia,
      props: { variant: "icon" },
      slots: {
        default: {
          component: Icon,
          props: { name: "compass", size: 24 },
        },
      },
    },
    {
      component: ItemContent,
      slots: {
        default: [
          {
            component: ItemHeader,
            slots: {
              default: [
                {
                  component: ItemTitle,
                  slots: { default: title },
                },
                {
                  component: ItemActions,
                  slots: {
                    default: "PDF",
                  },
                },
              ],
            },
          },
          {
            component: ItemDescription,
            slots: {
              default:
                "Planning considerations for connected vehicle infrastructure.",
            },
          },
          {
            component: ItemFooter,
            slots: {
              default: {
                component: Button,
                props: { size: "sm", variant: "ghost" },
                slots: { default: "View resource" },
              },
            },
          },
        ],
      },
    },
  ],
});

const variants = ["default", "muted", "outline"];
const sizes = ["default", "sm", "xs"];

// Storybook Astro only converts components to serializable references ~10 levels
// deep, so the item content is passed as references when nested in a wrapper.
type Descriptor = {
  component: unknown;
  props?: Record<string, unknown>;
  slots?: Record<string, unknown>;
};

const asReference = (node: unknown): unknown => {
  if (Array.isArray(node)) {
    return node.map(asReference);
  }
  if (typeof node !== "object" || node === null) {
    return node;
  }
  const { component, props, slots } = node as Descriptor;
  return {
    component: {
      __astroComponent: true,
      moduleId: (component as { moduleId: string }).moduleId,
    },
    props,
    slots: slots ? asReferenceSlots(slots) : undefined,
  };
};

const asReferenceSlots = (slots: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(slots).map(([name, value]) => [name, asReference(value)]),
  );

// Items nested in a wrapper go past the ~10 level limit, so pass references.
const nestedItemSlots = (title?: string) => asReferenceSlots(itemSlots(title));

const titleCase = (text: string) => text[0].toUpperCase() + text.slice(1);

const sizeLabels: Record<string, string> = {
  default: "Default",
  sm: "Small",
  xs: "Extra small",
};

// The label is the item's title, since a wrapper tile would exceed the depth limit.
const labelled = (label: string, props: Record<string, unknown>) => ({
  component: Item,
  props: { class: "tw:max-w-2xl", ...props },
  slots: nestedItemSlots(label),
});

const meta = {
  title: "UI/Elements/Item",
  component: Item,
  argTypes: {
    size: {
      options: sizes,
      control: { type: "select" },
    },
    variant: {
      options: variants,
      control: { type: "select" },
    },
    href: { table: { disable: true } },
    isExternal: { table: { disable: true } },
    slots: { table: { disable: true } },
  },
  args: {
    class: "tw:max-w-2xl",
    size: "default",
    variant: "outline",
    slots: itemSlots(),
  },
};

export default meta;

export const Default = {
  argTypes: {
    href: { table: { disable: false } },
    isExternal: { table: { disable: false } },
  },
};

export const Variants = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentGrid,
    props: { minWidth: "100%" },
    slots: {
      default: variants.map((variant) =>
        labelled(titleCase(variant), { variant, size: args.size }),
      ),
    },
  }),
  parameters: {
    controls: { exclude: ["variant"] },
  },
};

export const Sizes = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: ComponentGrid,
    props: { minWidth: "100%" },
    slots: {
      default: sizes.map((size) =>
        labelled(sizeLabels[size], { size, variant: args.variant }),
      ),
    },
  }),
  parameters: {
    controls: { exclude: ["size"] },
  },
};

export const Linked = {
  argTypes: {
    href: { table: { disable: false } },
    isExternal: { table: { disable: false } },
  },
  args: {
    href: "/resources/",
  },
};

export const Group = {
  render: () => ({
    component: ItemGroup,
    props: { class: "tw:max-w-2xl" },
    slots: {
      default: [
        {
          component: Item,
          props: { variant: "outline" },
          slots: nestedItemSlots(),
        },
        {
          component: Item,
          props: { variant: "outline" },
          slots: nestedItemSlots(),
        },
      ],
    },
  }),
  parameters: {
    controls: { disable: true },
  },
};
