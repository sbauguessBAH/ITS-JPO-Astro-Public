import Card from "../../elements/card/Card.astro";
import CardDescription from "../../elements/card/CardDescription.astro";
import CardHeader from "../../elements/card/CardHeader.astro";
import CardImage from "../../elements/card/CardImage.astro";
import CardTitle from "../../elements/card/CardTitle.astro";
import ExternalLinkBadge from "./ExternalLinkBadge.astro";

const meta = {
  title: "UI/Blocks/External Link Badge",
  component: ExternalLinkBadge,
  args: {
    label: "External Link",
  },
};

export default meta;

export const Default = {};

// Place the badge inside an external-link Card; hover the card to expand it.
export const OnCard = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => ({
    component: Card,
    props: {
      class: "tw:max-w-md",
      href: "https://www.its.dot.gov/",
      isExternal: true,
    },
    slots: {
      default: [
        {
          component: CardImage,
          props: { entry: "pcb/cave-box", height: 220 },
        },
        { component: ExternalLinkBadge, props: { label: args.label } },
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
                    "Hover over the card to expand the badge and reveal its label.",
                },
              },
            ],
          },
        },
      ],
    },
  }),
};
