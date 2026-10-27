import Button from "../../elements/button/Button.astro";
import Section from "../section/Section.astro";
import SectionBody from "../section/SectionBody.astro";
import SectionHeader from "../section/SectionHeader.astro";
import Page from "./Page.astro";
import PageBody from "./PageBody.astro";
import PageContainer from "./PageContainer.astro";
import PageHeader from "./PageHeader.astro";

const header = {
  component: PageHeader,
  props: {
    description:
      "The ITS Professional Capacity Building (PCB) Program delivers multimodal ITS learning opportunities to transportation professionals through trainings, webinars, cohorts, and technical assistance.",
    headline: "Resources",
    title: "Program Overview",
  }
};

const body = {
  component: PageBody,
  slots: {
    default: [
      {
        component: PageContainer,
        slots: {
          default: [
            '<div class="tw:h-64 tw:w-full tw:rounded-lg tw:bg-muted"></div>',
          ],
        },
      },
    ],
  },
};

const sectionBody = {
  component: SectionBody,
  slots: {
    default: [
      '<div class="tw:h-48 tw:w-full tw:rounded-lg tw:bg-black/10"></div>',
    ],
  },
};

const sections = [
  {
    component: Section,
    slots: {
      default: [
        {
          component: SectionHeader,
          props: {
            description:
              "Foundational trainings for practitioners as well as technical trainings on V2X standards.",
            headline: "Trainings",
            title: "Build your knowledge",
          },
        },
        sectionBody,
      ],
    },
  },
  {
    component: Section,
    props: { color: "muted" },
    slots: {
      default: [
        {
          component: SectionHeader,
          props: {
            description:
              "Hands-on learning experiences for community colleges and trade schools.",
            headline: "Education",
            title: "Teach the next generation",
          },
        },
        sectionBody,
      ],
    },
  },
];

const meta = {
  title: "UI/Blocks/Page",
  component: Page,
  parameters: {
    layout: "fullScreen",
  },
  argTypes: {
    as: {
      options: ["main", "div"],
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

/**
 * Sections span the full page width; `color="muted"` bleeds the background edge to edge
 */
export const WithSections = {
  args: {
    slots: {
      default: [header, ...sections],
    },
  },
};
