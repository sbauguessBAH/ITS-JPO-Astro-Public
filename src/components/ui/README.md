# UI Components

This component library is currently maintained by Caden with the goal of making components that are generic enough to be reused across the entire ITS JPO website and ensure visual consistency.

## Design decisions

### Component organization

Components are organized into folders by their root component, since Astro does not allow multiple components in the same file. This setup ensures components intended to be used together are grouped.

This pattern of multiple composable components is standard practice for most modern UI libraries, because it allows you to easily pass in child data to slots along with custom classes and props.

### CSS files

CSS is separated into component-specific `.css` files, because Astro's scoped styles automatically rename classes. This makes it impossible to have style dependencies between files without making them global.

### Class names

Class names are designated to prevent conflict with any Bootstrap CSS classes along with any custom classes that may have already been defined. Hence, most of them will start with `ui_`. 

CSS classes are named based on the component. An underscore joins the component name so it can be selected at once. A dash appends the parent component and sub component.

For example: `ui_card`, `ui_card-header`, `ui_card-footer`.
