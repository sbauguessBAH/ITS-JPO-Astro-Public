import MessageList from "./MessageList.astro";

const meta = {
  title: "UI/Blocks/Message List",
  component: MessageList,
  argTypes: {
    color: {
      options: ["default", "accent"],
      control: { type: "select" },
    },
  },
  args: {
    class: "tw:max-w-2xl",
    color: "default",
    items: [
      "Identify the right ITS standards for your project",
      "Review deployment planning considerations",
      "Find relevant training and technical resources",
    ],
    title: "How we can help",
  },
};

export default meta;

export const Default = {};

export const Accent = {
  args: {
    color: "accent",
  },
};

export const WithoutTitle = {
  args: {
    title: undefined,
  },
};