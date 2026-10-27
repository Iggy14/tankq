/**
 * Minimal read-only client for the WordPress REST API.
 *
 * Content comes from WordPress only when `WP_API_URL` is set (the site origin,
 * e.g. `https://cms.tankq-solution.com`). Without it every accessor in
 * `src/lib` serves its built-in data, so the site builds and runs with no CMS.
 *
 * Every request carries `WP_TAG`, which is what the revalidate route
 * (`src/app/api/revalidate/route.ts`) expires when an editor saves a post. The
 * `revalidate` window is a safety net for a missed webhook, not the main path.
 */

export const WP_TAG = "wp-content";

/** Seconds a response may be reused before the next request refetches it. */
const REVALIDATE_SECONDS = 300;

/** The REST routes registered by the `tankq-cms` plugin (see `wordpress/`). */
export type WpRestBase =
  | "tq-products"
  | "tq-categories"
  | "tq-projects"
  | "tq-tank-types"
  | "tq-applications"
  | "tq-services";

/** One post as the REST API returns it. Fields live under `acf`. */
export interface WpPost {
  id: number;
  slug: string;
  acf: Record<string, unknown>;
}

export function isWpEnabled(): boolean {
  return Boolean(process.env.WP_API_URL);
}

function wpOrigin(): string {
  const origin = process.env.WP_API_URL;

  if (!origin) {
    throw new Error("WP_API_URL is not set.");
  }

  return origin.replace(/\/+$/, "");
}

/** Every published post of one type, following the API's pagination. */
export async function fetchWpPosts(base: WpRestBase): Promise<WpPost[]> {
  const posts: WpPost[] = [];

  for (let page = 1; ; page += 1) {
    const url = `${wpOrigin()}/wp-json/wp/v2/${base}?per_page=100&page=${page}&acf_format=standard`;
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [WP_TAG] },
    });

    if (!response.ok) {
      throw new Error(`WordPress request failed (${response.status}): ${url}`);
    }

    const batch: unknown = await response.json();

    if (!Array.isArray(batch)) {
      throw new Error(`WordPress returned an unexpected body for ${url}`);
    }

    posts.push(...(batch as WpPost[]));

    const totalPages = Number(response.headers.get("x-wp-totalpages") ?? 1);

    if (page >= totalPages) {
      return posts;
    }
  }
}
