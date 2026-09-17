import Button from "./Button.astro";

const meta = {
  title: "UI/Elements/Button",
  component: Button,
  argTypes: {
    color: {
      options: ["primary", "secondary", "accent"],
      control: { type: "select" },
    },
    variant: {
      options: ["default", "outline", "subtle", "ghost"],
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "lg"],
      control: { type: "select" },
    },
  },
  args: {
    color: "primary",
    size: "default",
    variant: "default",
    slots: {
      default: "Button",
    },
  },
};

export default meta;

export const Default = {};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const Link = {
  args: {
    link: {
      href: "/resources/",
    },
    slots: {
      default: "Browse resources",
    },
  },
};
