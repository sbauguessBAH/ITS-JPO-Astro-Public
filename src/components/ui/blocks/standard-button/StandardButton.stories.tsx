import StandardButton from "./StandardButton.astro";

const meta = {
  title: "UI/Blocks/Standard Button",
  component: StandardButton,
  argTypes: {
    size: { options: ["default", "lg"], control: { type: "select" } },
    type: { table: { disable: true } },
  },
  args: {
    size: "default",
    slots: {
      default: "Read Post",
    },
  },
};

export default meta;

export const Default = {
  argTypes: {
    disabled: { control: "boolean" },
    link: { table: { disable: false } },
    type: { table: { disable: false } },
  },
};

export const Large = {
  args: {
    size: "lg",
  },
};

export const AsLink = {
  args: {
    link: { href: "/news-info/news" },
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};
