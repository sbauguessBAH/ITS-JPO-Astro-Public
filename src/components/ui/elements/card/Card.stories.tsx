import Badge from "../badge/Badge.astro";
import Card from "./Card.astro";
import CardAction from "./CardAction.astro";
import CardContent from "./CardContent.astro";
import CardDescription from "./CardDescription.astro";
import CardFooter from "./CardFooter.astro";
import CardHeader from "./CardHeader.astro";
import CardImage from "./CardImage.astro";
import CardTitle from "./CardTitle.astro";

const cardSlots = {
  default: [
    {
      component: CardImage,
      props: {
        entry: "pcb/cave-box",
        height: 220,
      },
    },
    {
      component: CardHeader,
      slots: {
        default: [
          {
            component: CardTitle,
            slots: { default: "Connected Vehicle Training" },
          },
          {
            component: CardDescription,
            slots: {
              default:
                "Practical guidance and resources for transportation professionals.",
            },
          },
          {
            component: CardAction,
            slots: {
              default: {
                component: Badge,
                props: { color: "secondary" },
                slots: { default: "Featured" },
              },
            },
          },
        ],
      },
    },
    {
      component: CardContent,
      slots: {
        default:
          "Explore deployment lessons, technical assistance, and training materials.",
      },
    },
    {
      component: CardFooter,
      slots: { default: "Updated September 2026" },
    },
  ],
};

const meta = {
  title: "UI/Elements/Card",
  component: Card,
  argTypes: {
    orientation: {
      options: ["vertical", "horizontal"],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm"],
      control: { type: "select" },
    },
  },
  args: {
    class: "tw:max-w-md",
    orientation: "vertical",
    size: "default",
    slots: cardSlots,
  },
};

export default meta;

export const Default = {};

export const Linked = {
  args: {
    href: "/resources/pcb/",
  },
};

export const Compact = {
  args: {
    size: "sm",
  },
};

export const Horizontal = {
  args: {
    class: "tw:max-w-3xl",
    orientation: "horizontal",
  },
};
