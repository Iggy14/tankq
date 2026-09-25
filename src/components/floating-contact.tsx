"use client";

import { Mail, Phone, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { LINE_URL, SOCIAL_LINKS } from "@/lib/social-links";
import { cn } from "@/lib/utils";

const socialByKey = Object.fromEntries(
  SOCIAL_LINKS.map((link) => [link.key, link]),
) as Record<(typeof SOCIAL_LINKS)[number]["key"], (typeof SOCIAL_LINKS)[number]>;

/**
 * Bottom-right FAB: hover (or tap, since hover does not exist on a phone)
 * fans out one circular link per contact channel, closest to the trigger
 * first. Everything renders up front and only toggles opacity/transform, so
 * opening costs a class swap, not new DOM or a fetch.
 */
export function FloatingContact() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Tapping anywhere else closes it - hover has no "leave" event on a phone.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const phone = t("footer.contactPhone");
  const email = t("footer.contactEmail");

  const actions = [
    {
      key: "instagram",
      href: socialByKey.instagram.href,
      label: t("home.socials.instagram"),
      content: (
        <Image src={socialByKey.instagram.src} alt="" fill sizes="44px" className="object-cover" />
      ),
    },
    {
      key: "facebook",
      href: socialByKey.facebook.href,
      label: t("home.socials.facebook"),
      content: (
        <Image src={socialByKey.facebook.src} alt="" fill sizes="44px" className="object-cover" />
      ),
    },
    {
      key: "line",
      href: LINE_URL,
      label: t("home.socials.line"),
      content: (
        <Image src={socialByKey.line.src} alt="" fill sizes="44px" className="object-cover" />
      ),
    },
    {
      key: "email",
      href: `mailto:${email}`,
      label: t("floatingContact.emailLabel"),
      content: (
        <span className="flex size-full items-center justify-center bg-teal text-white">
          <Mail aria-hidden className="size-5" />
        </span>
      ),
    },
    {
      key: "phone",
      href: `tel:${phone}`,
      label: t("floatingContact.callLabel"),
      content: (
        <span className="flex size-full items-center justify-center bg-teal text-white">
          <Phone aria-hidden className="size-5" />
        </span>
      ),
    },
  ] as const;

  return (
    <div
      ref={rootRef}
      onMouseLeave={() => setOpen(false)}
      // Closed: only the trigger button is hoverable, so the invisible icon
      // stack above it does not open the menu when the pointer passes over it.
      className={cn(
        "fixed right-6 bottom-8 z-50 flex flex-col items-center gap-3 sm:right-8 sm:bottom-10",
        !open && "pointer-events-none",
      )}
    >
      <div
        inert={!open}
        className="flex flex-col items-center gap-3"
      >
        {actions.map((action, index) => (
          <a
            key={action.key}
            href={action.href}
            target={action.key === "email" || action.key === "phone" ? undefined : "_blank"}
            rel={action.key === "email" || action.key === "phone" ? undefined : "noopener noreferrer"}
            aria-label={action.label}
            style={{ transitionDelay: open ? `${index * 30}ms` : "0ms" }}
            className={cn(
              "size-11 overflow-hidden rounded-full shadow-lg ring-1 ring-black/5 transition-all duration-200 ease-out hover:scale-105",
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0",
            )}
          >
            <span className="relative block size-full">{action.content}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? t("floatingContact.closeLabel") : t("floatingContact.toggleLabel")}
        aria-expanded={open}
        className="pointer-events-auto relative size-14 overflow-hidden rounded-full bg-white shadow-xl ring-1 ring-black/5 transition-transform hover:scale-105"
      >
        <Image
          src="/brand/tankq-icon.png"
          alt=""
          fill
          sizes="56px"
          className={cn(
            "object-cover transition-opacity duration-150",
            open ? "opacity-0" : "opacity-100",
          )}
        />
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-navy text-navy-foreground transition-opacity duration-150",
            open ? "opacity-100" : "opacity-0",
          )}
        >
          <X aria-hidden className="size-6" />
        </span>
      </button>
    </div>
  );
}
