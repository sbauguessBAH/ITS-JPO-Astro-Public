export default function base_url(relative_path: string): string {
  return import.meta.env.BASE_URL + relative_path;
}