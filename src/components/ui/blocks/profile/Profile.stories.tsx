import Profile from "./Profile.astro";

const meta = {
  title: "UI/Blocks/Profile",
  component: Profile,
  args: {
    bio: "Ms. Bettger is a Senior Program Manager for the North Central Texas Council of Governments (NCTCOG). Natalie is currently NCTCOG's Senior Program Manager for Congestion Management and Innovative Project Delivery Program Area, which includes planning in the areas of TSMO, aviation, congestion management, safety, and security.",
    class: "tw:max-w-3xl",
    image: "pcb/portraits/natalie-bettger",
    name: "Natalie Bettger",
    title: "North Central Texas Council of Governments, Senior Program Manager",
  },
};

export default meta;

export const Default = {};
