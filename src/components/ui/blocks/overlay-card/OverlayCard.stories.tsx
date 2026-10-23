import OverlayCard from "./OverlayCard.astro";

const meta = {
  title: "UI/Blocks/Overlay Card",
  component: OverlayCard,
  argTypes: {
    color: {
      options: [
        "primary",
        "secondary",
        "cyan",
        "lime",
        "crimson",
        "orange",
        "gold",
      ],
      control: { type: "select" },
    },
  },
  args: {
    backgroundImage: "pcb/cave-box",
    class: "tw:max-w-md",
    color: "primary",
    description:
      "Hands-on learning experience to aid curriculum and support instruction for community colleges and trade schools.",
    name: "Connected and Automated Vehicle Education",
    path: "/resources/pcb/technical-assistance/cave",
  },
};

export default meta;

export const Default = {};

export const WithIcon = {
  args: {
    iconImage: "automation/focus-areas/icon-cda",
  },
};

export const CustomColor = {
  args: {
    color: "#86254f",
    iconImage: "automation/focus-areas/icon-cda",
  },
};

export const External = {
  args: {
    isExternalLink: true,
    path: "https://www.its.dot.gov/scrc/index.html",
  },
};
