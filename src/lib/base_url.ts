/**
 * Takes in an absolute path (for a href, link href, public directory, etc)
 * @param abs_path 
 * @returns the absolute path with the base/subdirectory added
 */
export default function base_url(abs_path: string): string {
  // If base is set to "", then it will automatically append a trailing /
  if (import.meta.env.BASE_URL !== "/") return import.meta.env.BASE_URL + abs_path;
  return abs_path;
}