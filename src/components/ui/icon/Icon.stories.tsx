import { ICON_NAMES } from "./icons";
import Icon from "./Icon.astro";

const meta = {
  title: "UI/Icon",
  component: Icon,
  argTypes: {
    name: {
      options: ICON_NAMES,
      control: { type: "select" },
    },
    size: {
      control: { type: "number", min: 12, max: 96, step: 4 },
    },
  },
  args: {
    name: "compass",
    size: 32,
  },
};

export default meta;

export const Default = {};

export const Small = {
  args: {
    name: "check2-circle",
    size: 16,
  },
};

export const Large = {
  args: {
    name: "bullseye",
    size: 64,
  },
};

export const Document = {
  args: {
    name: "pdf",
    size: 40,
  },
};
