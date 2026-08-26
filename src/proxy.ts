import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (same runtime, new name).
// next-intl handles locale detection (cookie -> accept-language -> defaultLocale)
// and redirects unprefixed paths, e.g. /about -> /th/about.
const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  // Anything with a file extension is a public/ asset (e.g. /next.svg) and must
  // not be locale-prefixed. This lives here rather than in `matcher` because
  // Next.js 16 silently fails to compile matchers containing `\\.`.
  if (/\.[^/]+$/.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image).*)",
};
