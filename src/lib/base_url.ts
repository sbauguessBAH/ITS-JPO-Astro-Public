/** Prefix a site-local path with the deployment base, keeping it root-relative. */
export default function base_url(absolutePath: string): string {
  const basePath = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, "");
  const path = absolutePath.replace(/^\/+/, "");
  return basePath ? `/${basePath}/${path}` : `/${path}`;
}