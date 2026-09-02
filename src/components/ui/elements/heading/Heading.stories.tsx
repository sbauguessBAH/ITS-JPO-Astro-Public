import Heading from "./Heading.astro";

const meta = {
  title: "UI/Elements/Heading",
  component: Heading,
  argTypes: {
    as: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "md"],
      control: { type: "select" },
    },
  },
  args: {
    size: "default",
    slots: {
      default: "Connected transportation",
    },
  },
};

export default meta;

export const Default = {};

export const Medium = {
  args: {
    size: "md",
  },
};

export const Small = {
  args: {
    size: "sm",
  },
};

export const SemanticOverride = {
  args: {
    as: "h2",
    size: "sm",
  },
};