import Accordion from "./Accordion.astro";
import AccordionContent from "./AccordionContent.astro";
import AccordionItem from "./AccordionItem.astro";
import AccordionTrigger from "./AccordionTrigger.astro";

type Slot = Record<string, unknown>;

const item = (
  title: string,
  body: string,
  { disabled, open }: { disabled?: boolean; open?: boolean } = {},
): Slot => ({
  component: AccordionItem,
  props: { open },
  slots: {
    default: [
      {
        component: AccordionTrigger,
        props: { disabled },
        slots: { default: title },
      },
      { component: AccordionContent, slots: { default: body } },
    ],
  },
});

const items = [
  item(
    "What is the ITS JPO?",
    "The Intelligent Transportation Systems Joint Program Office leads research and deployment support for connected and automated transportation technologies.",
  ),
  item(
    "Who can use these resources?",
    "State and local agencies, transit operators, researchers, and industry partners.",
  ),
  item(
    "Where can I find training?",
    "Training and professional capacity building materials are available in the resources section.",
  ),
];

const meta = {
  title: "UI/Elements/Accordion",
  component: Accordion,
  argTypes: {
    type: {
      options: ["multiple", "single"],
      control: { type: "select" },
    },
  },
  args: {
    type: "multiple",
    slots: { default: items },
  },
};

export default meta;

export const Default = {};

/**
 * Pass `type: "single"` to the Accordion component to have only one item open at a time.
 */
export const Single = {
  args: { type: "single" },
};

/**
 * Pass `open: true` to an item to have it open on page load.
 */
export const OpenOnLoad = {
  args: {
    slots: {
      default: [
        item("Open by default", "This item is open when the page loads.", {
          open: true,
        }),
        ...items.slice(1),
      ],
    },
  },
};

export const Disabled = {
  args: {
    slots: {
      default: [
        items[0],
        item("Unavailable", "This content cannot be opened.", {
          disabled: true,
        }),
        items[2],
      ],
    },
  },
};
