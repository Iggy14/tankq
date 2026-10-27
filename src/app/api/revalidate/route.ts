import { timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { WP_TAG } from "@/lib/wp/client";

/**
 * Called by the WordPress plugin (`wordpress/tankq-cms/`) whenever an editor
 * saves or deletes content. Marks everything fetched from the CMS as stale, so
 * the next visit to any page rebuilds it from fresh content.
 *
 * Authenticated with a shared secret in the `x-revalidate-secret` header, set
 * as `REVALIDATE_SECRET` here and in WordPress's `wp-config.php`. A webhook
 * has no Server Action to call `updateTag` from, so the entry is expired with
 * `{ expire: 0 }` rather than stale-while-revalidate: the editor's next page
 * load must not show the old copy.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return Response.json(
      { revalidated: false, error: "REVALIDATE_SECRET is not set." },
      { status: 503 },
    );
  }

  if (!matches(request.headers.get("x-revalidate-secret"), secret)) {
    return Response.json(
      { revalidated: false, error: "Invalid secret." },
      { status: 401 },
    );
  }

  revalidateTag(WP_TAG, { expire: 0 });

  return Response.json({ revalidated: true, now: Date.now() });
}

/** Constant-time comparison, so response timing does not leak the secret. */
function matches(received: string | null, expected: string): boolean {
  if (received === null) {
    return false;
  }

  const a = Buffer.from(received);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}
