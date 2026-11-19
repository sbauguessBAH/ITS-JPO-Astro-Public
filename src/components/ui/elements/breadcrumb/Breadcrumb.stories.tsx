import Breadcrumb from "./Breadcrumb.astro";
import BreadcrumbEllipsis from "./BreadcrumbEllipsis.astro";
import BreadcrumbItem from "./BreadcrumbItem.astro";
import BreadcrumbLink from "./BreadcrumbLink.astro";
import BreadcrumbList from "./BreadcrumbList.astro";
import BreadcrumbPage from "./BreadcrumbPage.astro";

const link = (href: string, label: string) => ({
  component: BreadcrumbItem,
  slots: {
    default: {
      component: BreadcrumbLink,
      props: { href },
      slots: { default: label },
    },
  },
});

const page = (label: string) => ({
  component: BreadcrumbItem,
  slots: {
    default: {
      component: BreadcrumbPage,
      slots: { default: label },
    },
  },
});

const breadcrumbSlots = {
  default: {
    component: BreadcrumbList,
    slots: {
      default: [
        link("/", "Home"),
        link("/resources/", "Resources"),
        link("/resources/pcb/", "Professional Capacity Building"),
        page("Trainings"),
      ],
    },
  },
};

const meta = {
  title: "UI/Elements/Breadcrumb",
  component: Breadcrumb,
  args: {
    slots: breadcrumbSlots,
  },
};

export default meta;

export const Default = {};

export const WithEllipsis = {
  args: {
    slots: {
      default: {
        component: BreadcrumbList,
        slots: {
          default: [
            link("/", "Home"),
            {
              component: BreadcrumbItem,
              slots: { default: { component: BreadcrumbEllipsis } },
            },
            link("/resources/pcb/", "Professional Capacity Building"),
            page("Trainings"),
          ],
        },
      },
    },
  },
};
