# UI Components

This component library is currently maintained by Caden with the goal of making components that are generic enough to be reused across the entire ITS JPO website and ensure visual consistency.

## Design decisions

### Component organization

Components are organized into folders by their root component, since Astro does not allow multiple components in the same file. This setup ensures components intended to be used together are grouped.

This pattern of multiple composable components is standard practice for most modern UI libraries, because it allows you to easily pass in child data to slots along with custom classes and props.

For example: `card/Card.astro` is the root component, `card/CardContent.astro` is a sub-component.

### Styles

Instead of custom CSS files, UI components mostly reliy on Tailwind classes. Therefore, they can currently only be used on pages that ipmort the global Tailwind styles.

#### Class names

Tailwind classes are implemented to prevent conflict with any Bootstrap CSS classes along with any custom classes that may have already been defined. Hence, to use a Tailwind class you must prefix it with `tw:`

## Types of components

### Elements

UI Elements are primitive UI components and sub-components that can be composed in any way you desire. Content is always passed to the default slot. While there are recommended composition patterns, you can technically arrange sub-components in any way you would like.

### Blocks

Blocks tend to be more restrictive and preconfigured. For example, the Page block wraps a page and contains a PageHeader block. The PageHeader takes a title prop to pass in the title, and the title will be formatted for consistency. However, you can still use slots 

### Summary

Elements rely on slots and are highly customizable in terms of what content can be nested.

Blocks are designed for specific use cases where a standard pattern can be expected for content.