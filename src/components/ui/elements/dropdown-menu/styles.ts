/** Shared classes so the item and sub trigger look identical. */
export const menuItemClass = [
  "tw:group/dropdown-menu-item tw:relative tw:box-border tw:flex tw:w-full tw:cursor-default tw:items-center tw:gap-2",
  "tw:rounded-[4px] tw:px-4 tw:py-1 tw:text-base tw:outline-none tw:select-none",
  // Important modifiers beat the global anchor styles in new-age.css
  "tw:font-normal! tw:text-foreground! tw:no-underline!",
  "tw:focus:bg-gray-light tw:data-[state=open]:bg-gray-light",
  "tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50",
  "tw:data-[inset]:pl-8",
  "tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0",
];

export const menuContentClass = [
  "tw:absolute tw:z-50 tw:box-border tw:min-w-40 tw:p-1",
  "tw:rounded-[4px] tw:border tw:border-black/15 tw:bg-background tw:shadow-md tw:outline-none",
  "tw:data-[state=closed]:hidden",
];
