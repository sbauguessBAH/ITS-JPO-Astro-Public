import Separator from "./Separator.astro";

const meta = {
  title: "UI/Elements/Separator",
  component: Separator,
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "select" },
    },
  },
  args: {
    orientation: "horizontal",
  },
};

export default meta;

export const Horizontal = {};

export const Vertical = {
  args: {
    orientation: "vertical",
    class: "tw:h-24",
  },
};
