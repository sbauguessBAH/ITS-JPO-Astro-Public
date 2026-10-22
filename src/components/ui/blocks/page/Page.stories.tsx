import Button from "../../elements/button/Button.astro";
import Heading from "../../elements/heading/Heading.astro";
import Message from "../message/Message.astro";
import Page from "./Page.astro";
import PageBody from "./PageBody.astro";
import PageHeader from "./PageHeader.astro";

const header = {
  component: PageHeader,
  props: {
    description:
      "The ITS Professional Capacity Building (PCB) Program delivers multimodal ITS learning opportunities to transportation professionals through trainings, webinars, cohorts, and technical assistance.",
    headline: "Resources",
    title: "Program Overview",
  },
  slots: {
    links: [
      {
        component: Button,
        props: { link: { href: "/resources/pcb/trainings" } },
        slots: { default: "Explore trainings" },
      },
      {
        component: Button,
        props: {
          link: { href: "/resources/pcb/peer-exchanges" },
          variant: "outline",
        },
        slots: { default: "Peer exchanges" },
      },
    ],
  },
};

const body = {
  component: PageBody,
  slots: {
    default: [
      {
        component: Heading,
        props: { size: "md" },
        slots: { default: "Why it matters" },
      },
      "<p>The ITS PCB Program works with Federal, State, and local transportation stakeholders to ensure they have adequate knowledge of ITS and that the United States has a workforce capable of developing, operating, and maintaining it.</p>",
      {
        component: Message,
        props: {
          headline: "Technical assistance",
          icon: "telephone-outbound-fill",
          title: "Connect with the ITS Help Desk",
        },
        slots: {
          content:
            "Get support finding resources, standards, and training for your deployment.",
        },
      },
    ],
  },
};

const meta = {
  title: "UI/Blocks/Page",
  component: Page,
  argTypes: {
    as: {
      options: ["main", "div", "section"],
      control: { type: "select" },
    },
  },
  args: {
    as: "div",
    slots: {
      default: [header, body],
    },
  },
};

export default meta;

export const Default = {};

export const HeaderOnly = {
  args: {
    slots: {
      default: [header],
    },
  },
};
