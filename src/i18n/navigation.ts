import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// Locale-aware drop-in replacements for the next/navigation APIs. `Link` and
// `useRouter` add the active locale prefix automatically, and `usePathname`
// returns the pathname *without* it (handy for the language switcher).
export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
