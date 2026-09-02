import { ICON_NAMES } from "../../icon/icons";
import Message from "./Message.astro";

const meta = {
  title: "UI/Blocks/Message",
  component: Message,
  argTypes: {
    icon: {
      options: ICON_NAMES,
      control: { type: "select" },
    },
  },
  args: {
    class: "tw:max-w-2xl",
    headline: "Technical assistance",
    icon: "telephone-outbound-fill",
    title: "Connect with the ITS Help Desk",
    slots: {
      content:
        "Get support finding resources, standards, and training for your deployment.",
    },
  },
};

export default meta;

export const Default = {};

export const WithoutIcon = {
  args: {
    icon: undefined,
  },
};

export const TitleOnly = {
  args: {
    headline: undefined,
    icon: undefined,
    slots: { content: undefined },
    title: "A concise status message",
  },
};