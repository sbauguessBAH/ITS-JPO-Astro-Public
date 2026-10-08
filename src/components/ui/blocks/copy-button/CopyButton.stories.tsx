import CopyButton from "./CopyButton.astro";

const meta = {
  title: "UI/Blocks/Copy Button",
  component: CopyButton,
  args: {
    label: "Copy",
    text: "https://www.its.dot.gov/",
  },
};

export default meta;

export const Default = {};

export const CustomLabel = {
  args: {
    label: "Copy URL",
  },
};
