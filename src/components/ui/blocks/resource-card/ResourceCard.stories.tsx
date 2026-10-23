import ResourceCard from "./ResourceCard.astro";

const meta = {
  title: "UI/Blocks/Resource Card",
  component: ResourceCard,
  args: {
    class: "tw:max-w-md",
    links: [
      {
        link: {
          href: "https://rosap.ntl.bts.gov/view/dot/66622",
          isExternal: true,
        },
        name: "Summary Report",
      },
      {
        link: {
          href: "https://www.federalregister.gov/documents/2022/09/16/2022-20188/enhancing-the-safety-of-vulnerable-road-users-at-intersections-request-for-information",
          isExternal: true,
        },
        name: "Request for Information (RFI)",
      },
    ],
    subtitle: "Report | February 2023",
    title: "Enhancing the Safety of Vulnerable Road Users at Intersections",
  },
};

export default meta;

export const Default = {};

export const WithIcon = {
  args: {
    links: [
      {
        icon: "pdf",
        link: {
          href: "/assets/intersection-safety/USDOT_Intersection_Safety_Webinar.pdf",
          isNewWindow: true,
        },
        name: "Presentation Material",
      },
    ],
    subtitle: "Webinar | March 17, 2023",
  },
};
