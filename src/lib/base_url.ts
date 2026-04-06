/**
 * Takes in an absolute path (for a href, link href, public directory, etc)
 * @param abs_path 
 * @returns the absolute path with the base/subdirectory added
 */
export default function base_url(absolutePath: string): string {
  // Base URL will automatically append a trailing /
  // So we only check if it's not the default base URL here. 
  if (import.meta.env.BASE_URL !== "/") {
    const fullPath = import.meta.env.BASE_URL + absolutePath;
    console.log("FULL PATH: " + fullPath);
    return fullPath;
  };
  return absolutePath;
}