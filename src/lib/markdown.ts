/** Returns the plain text of a markdown body up to its first heading. */
export function getMarkdownPreview(body: string | undefined): string {
  if (!body) return "";

  const lines = body.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => /^\s{0,3}#{1,6}\s/.test(line));
  const intro = headingIndex === -1 ? lines : lines.slice(0, headingIndex);

  return intro
    .join(" ")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__|\*|_|`)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
