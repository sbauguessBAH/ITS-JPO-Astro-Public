import Panel from "./Panel.astro";
import PanelGroup from "./PanelGroup.astro";
import PanelHeader from "./PanelHeader.astro";
import PanelItem from "./PanelItem.astro";

const categories = [
  { count: 24, title: "All Courses" },
  { count: 6, title: "ITS Basics" },
  { count: 4, title: "ITS Architecture" },
  { count: 5, title: "Systems Engineering" },
  { count: 9, title: "Vehicle-to-Everything (V2X)" },
];

const buildSlots = (activeIndex: number, showCounts = true) => ({
  default: [
    {
      component: PanelHeader,
      slots: { default: "Categories" },
    },
    {
      component: PanelGroup,
      slots: {
        default: categories.map((item, index) => ({
          component: PanelItem,
          props: {
            active: index === activeIndex,
            href: "/resources/pcb/trainings",
          },
          slots: {
            default: item.title,
            ...(showCounts && { end: String(item.count) }),
          },
        })),
      },
    },
  ],
});

const meta = {
  title: "UI/Blocks/Panel",
  component: Panel,
  args: {
    class: "tw:max-w-xs",
    label: "Course categories",
    slots: buildSlots(0),
  },
};

export default meta;

export const Default = {};

export const SecondItemActive = {
  args: {
    slots: buildSlots(2),
  },
};

export const WithoutCounts = {
  args: {
    slots: buildSlots(1, false),
  },
};

export const CustomStyles = {
  args: {
    class:
      "tw:max-w-xs tw:rounded-none tw:border-2 tw:border-primary tw:shadow-md",
    slots: buildSlots(3),
  },
};
