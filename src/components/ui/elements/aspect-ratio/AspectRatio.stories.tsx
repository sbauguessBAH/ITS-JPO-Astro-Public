import AspectRatio from "./AspectRatio.astro";

const ratios = {
  "16/9": 16 / 9,
  "4/3": 4 / 3,
  "1/1": 1,
  "3/4": 3 / 4,
};

const meta = {
  title: "UI/Elements/AspectRatio",
  component: AspectRatio,
  tags: ["!autodocs"],
  argTypes: {
    ratio: {
      control: { type: "select" },
      options: Object.keys(ratios),
      mapping: ratios,
    },
  },
  args: {
    ratio: "16/9",
    class:
      "tw:flex tw:items-center tw:justify-center tw:rounded-md tw:bg-muted tw:text-muted-foreground",
  },
  parameters: {
    docs: {
      codePanel: true,
    }
  }
};

export default meta;

export const Default = {
  // @ts-expect-error storybook-astro does not export types
  render: (args) => {
    const ratio =
      typeof args.ratio === "number"
        ? args.ratio
        : ratios[args.ratio as keyof typeof ratios];
    const label =
      Object.entries(ratios).find(([, value]) => value === ratio)?.[0] ??
      `${ratio}`;

    return {
      component: AspectRatio,
      props: { ...args, ratio },
      slots: { default: label },
    };
  },
};