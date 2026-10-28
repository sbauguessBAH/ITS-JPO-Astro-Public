// Storybook cannot infer source for Astro stories, so usage snippets are generated from story args.

type Marker = { __astroComponent: true; moduleId: string };
type Descriptor = {
  component: Marker;
  props?: Record<string, unknown>;
  slots?: Record<string, unknown>;
};

// Top-level stubs are functions carrying `moduleId`; nested ones are `__astroComponent` markers.
const isMarker = (value: unknown): value is Marker =>
  (typeof value === "object" || typeof value === "function") &&
  value !== null &&
  typeof (value as Marker).moduleId === "string";

const isDescriptor = (value: unknown): value is Descriptor =>
  typeof value === "object" &&
  value !== null &&
  isMarker((value as Descriptor).component);

const importPath = (moduleId: string) => {
  const path = moduleId.split("?")[0];
  const index = path.indexOf("/src/");
  return `@${index === -1 ? path : path.slice(index)}`;
};

const componentName = (moduleId: string) =>
  importPath(moduleId)
    .split("/")
    .pop()!
    .replace(/\.astro$/, "");

const formatProp = (key: string, value: unknown) => {
  if (value === true) return key;
  if (typeof value === "string") return `${key}="${value}"`;
  return `${key}={${JSON.stringify(value)}}`;
};

const formatProps = (
  props: Record<string, unknown> = {},
  extra: string[] = [],
) =>
  [
    ...Object.entries(props)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== false,
      )
      .filter(([, value]) => typeof value !== "function")
      .map(([key, value]) => formatProp(key, value)),
    ...extra,
  ]
    .map((prop) => ` ${prop}`)
    .join("");

const indent = (text: string, depth = 1) =>
  text
    .split("\n")
    .map((line) => (line ? "  ".repeat(depth) + line : line))
    .join("\n");

const renderSlot = (
  node: unknown,
  slotName: string | null,
  imports: Set<string>,
): string => {
  if (node === undefined || node === null) return "";
  if (Array.isArray(node)) {
    return node
      .map((child) => renderSlot(child, slotName, imports))
      .filter(Boolean)
      .join("\n");
  }
  if (isDescriptor(node)) {
    return renderElement(node, slotName, imports);
  }
  const text = String(node);
  return slotName ? `<Fragment slot="${slotName}">${text}</Fragment>` : text;
};

const renderElement = (
  { component, props, slots }: Descriptor,
  slotName: string | null,
  imports: Set<string>,
): string => {
  imports.add(component.moduleId);
  const name = componentName(component.moduleId);
  const attrs = formatProps(props, slotName ? [`slot="${slotName}"`] : []);

  const children = Object.entries(slots ?? {})
    .map(([slot, content]) =>
      renderSlot(content, slot === "default" ? null : slot, imports),
    )
    .filter(Boolean);

  if (children.length === 0) return `<${name}${attrs} />`;

  const isInline =
    children.length === 1 &&
    !children[0].includes("\n") &&
    !children[0].startsWith("<");
  if (isInline) return `<${name}${attrs}>${children[0]}</${name}>`;

  return `<${name}${attrs}>\n${indent(children.join("\n"))}\n</${name}>`;
};

type StoryContext = { args: Record<string, unknown>; component?: unknown };

export const astroSource = (
  _code: string,
  { args, component }: StoryContext,
) => {
  if (!isMarker(component)) return "";

  const { slots, ...props } = args;
  const imports = new Set<string>();
  const markup = renderElement(
    { component, props, slots: slots as Descriptor["slots"] },
    null,
    imports,
  );

  const importLines = [...imports]
    .map((id) => `import ${componentName(id)} from "${importPath(id)}";`)
    .sort();

  return `---\n${importLines.join("\n")}\n---\n\n${markup}`;
};
