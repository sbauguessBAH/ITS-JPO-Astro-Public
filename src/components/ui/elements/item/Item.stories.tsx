import Button from "../button/Button.astro";
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

const itemSlots = {
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
                  slots: { default: "Deployment guide" },
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
};

const meta = {
  title: "UI/Elements/Item",
  component: Item,
  argTypes: {
    size: {
      options: ["xs", "sm", "default"],
      control: { type: "select" },
    },
    variant: {
      options: ["default", "muted", "outline"],
      control: { type: "select" },
    },
  },
  args: {
    class: "tw:max-w-2xl",
    size: "default",
    variant: "outline",
    slots: itemSlots,
  },
};

export default meta;

export const Default = {};

export const Muted = {
  args: {
    variant: "muted",
  },
};

export const Compact = {
  args: {
    size: "xs",
  },
};

export const Linked = {
  args: {
    href: "/resources/",
  },
};

export const Group = {
  render: ItemGroup,
  args: {
    class: "tw:max-w-2xl",
    slots: {
      default: [
        {
          component: Item,
          props: { variant: "outline" },
          slots: itemSlots,
        },
        {
          component: Item,
          props: { variant: "outline" },
          slots: itemSlots,
        },
      ],
    },
  },
};
