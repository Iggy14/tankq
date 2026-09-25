"use client";

import { useEffect, useRef } from "react";

import { usePathname } from "@/i18n/navigation";

// Instant, not the smooth glide the global `scroll-behavior` gives anchors:
// a new page should appear at its top, as if it had been freshly loaded.
export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

const ZOOM_DURATION_MS = 450;

// A quick ease-out rush to the top for the same-page logo click. The duration
// is fixed rather than distance-based (native `behavior: "smooth"` gets slow on
// a long page), and each frame is an instant jump because the global
// `scroll-behavior: smooth` would otherwise smooth every one of them. The user
// grabbing the page (wheel, touch, key) cancels it.
export function zoomToTop() {
  const startY = window.scrollY;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (startY === 0 || reduceMotion) {
    scrollToTop();
    return;
  }

  const startTime = performance.now();
  let frame = 0;
  const cancelEvents = ["wheel", "touchstart", "keydown"] as const;

  const stop = () => {
    cancelAnimationFrame(frame);
    cancelEvents.forEach((name) => window.removeEventListener(name, stop));
  };
  cancelEvents.forEach((name) => window.addEventListener(name, stop, { passive: true }));

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / ZOOM_DURATION_MS, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo({ top: startY * (1 - eased), left: 0, behavior: "instant" });
    if (progress < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  frame = requestAnimationFrame(step);
}

// Next's own scroll reset does not reliably fire under the sticky header, so
// every route change (by pathname, so filters and other query changes keep
// their place) starts at the top of the new page. Back/forward and #anchor
// navigations are left alone so the browser can restore or jump as usual.
export function ScrollToTop() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const isHistoryNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      isHistoryNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }
    if (window.location.hash) return;

    scrollToTop();
  }, [pathname]);

  return null;
}
