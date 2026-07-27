import Badge from "./Badge.astro";

const meta = {
  title: "UI/Elements/Badge",
  component: Badge,
  argTypes: {
    color: {
      options: ["primary", "secondary", "neutral"],
      control: { type: "select" },
    },
  },
  args: {
    color: "primary",
    slots: {
      default: "Badge",
    },
  },
};

export default meta;

export const Default = {};
