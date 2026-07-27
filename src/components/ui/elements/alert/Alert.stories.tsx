import Alert from "./Alert.astro";
import AlertDescription from "./AlertDescription.astro";
import AlertTitle from "./AlertTitle.astro";

const meta = {
  title: "UI/Elements/Alert",
  component: Alert,
  // tags: ["autodocs"],
  argTypes: {
    color: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
  },
  args: {
    slots: {
      default: [
        {
          component: AlertTitle,
          slots: {
            default: "The AlertTitle goes here!",
          },
        },
        {
          component: AlertDescription,
          slots: {
            default: "Additional details can go in the AlertDescription",
          },
        },
      ],
    },
  },
};

export default meta;

export const Default = {};
