import Presentation from "./Presentation.astro";

const meta = {
  title: "UI/Blocks/Presentation",
  component: Presentation,
  args: {
    attribution: "(Jones, Colyar, Bettger)",
    pdf: { href: "/assets/example.pdf" },
    webinar: { href: "https://example.com/webinar" },
    title:
      "Crowdsourcing for Advancing Operations: Introduction and Application Highlights",
  },
};

export default meta;

export const Default = {};
