"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  darkLabel: string;
  lightLabel: string;
};

const noopSubscribe = () => () => {};

/**
 * The server has no OS preference to render, so the icon would otherwise flip
 * right after hydration - this reads false until the client's real snapshot
 * is available, without the cascading-render issue a `useEffect` + `setState`
 * mount flag would trigger.
 */
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Binary light/dark switch, mirroring the header's other two-state control
 * (LanguageSwitcher) rather than exposing a third "system" option. The OS
 * preference still applies on first load via next-themes' default - this
 * button just pins an explicit choice on top of it.
 */
export function ThemeToggle({ darkLabel, lightLabel }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      aria-label={isDark ? lightLabel : darkLabel}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
