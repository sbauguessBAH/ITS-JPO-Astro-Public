import DropdownMenu from "./DropdownMenu.astro";
import DropdownMenuContent from "./DropdownMenuContent.astro";
import DropdownMenuGroup from "./DropdownMenuGroup.astro";
import DropdownMenuItem from "./DropdownMenuItem.astro";
import DropdownMenuLabel from "./DropdownMenuLabel.astro";
import DropdownMenuSeparator from "./DropdownMenuSeparator.astro";
import DropdownMenuSub from "./DropdownMenuSub.astro";
import DropdownMenuSubContent from "./DropdownMenuSubContent.astro";
import DropdownMenuSubTrigger from "./DropdownMenuSubTrigger.astro";
import DropdownMenuTrigger from "./DropdownMenuTrigger.astro";

type Slot = Record<string, unknown>;

const item = (label: string, props: Record<string, unknown> = {}): Slot => ({
  component: DropdownMenuItem,
  props,
  slots: { default: label },
});

const label = (text: string): Slot => ({
  component: DropdownMenuLabel,
  slots: { default: text },
});

const group = (...children: Slot[]): Slot => ({
  component: DropdownMenuGroup,
  slots: { default: children },
});

const separator = (): Slot => ({ component: DropdownMenuSeparator });

const content = (children: Slot[]) => ({
  component: DropdownMenuContent,
  slots: { default: children },
});

const trigger = (text: string, props: Record<string, unknown> = {}): Slot => ({
  component: DropdownMenuTrigger,
  props,
  slots: { default: text },
});

// Storybook Astro only converts components to serializable references ~10 levels
// deep, so deeper ones are passed as the reference itself.
const deep = (slot: Slot): Slot => ({
  ...slot,
  component: {
    __astroComponent: true,
    moduleId: (slot.component as { moduleId: string }).moduleId,
  },
});

const basicContent = [
  group(label("My Account"), item("Profile"), item("Billing")),
  separator(),
  group(
    item("Team"),
    item("Subscription", { disabled: true }),
    item("Resources", { href: "/resources/" }),
  ),
];

const meta = {
  title: "UI/Elements/Dropdown Menu",
  component: DropdownMenu,
  parameters: {
    docs: { story: { height: "280px" } },
  },
  args: {
    slots: {
      default: [trigger("Open"), content(basicContent)],
    },
  },
};

export default meta;

export const Default = {};

export const OpenOnHover = {
  args: {
    slots: {
      default: [
        trigger("Hover me", { openOnHover: true }),
        content(basicContent),
      ],
    },
  },
};

export const Submenu = {
  args: {
    slots: {
      default: [
        trigger("Share"),
        content([
          item("Copy link"),
          item("Print"),
          separator(),
          deep({
            component: DropdownMenuSub,
            slots: {
              default: [
                deep({
                  component: DropdownMenuSubTrigger,
                  slots: { default: "More tools" },
                }),
                deep({
                  component: DropdownMenuSubContent,
                  slots: {
                    default: [
                      deep(item("Save page as…")),
                      deep(item("Developer tools")),
                      deep(separator()),
                      deep(item("Delete")),
                    ],
                  },
                }),
              ],
            },
          }),
        ]),
      ],
    },
  },
};
