/**
 * TankQ's social accounts, in display order.
 *
 * `key` is also the `home.socials.*` translation key each link's accessible
 * name comes from, so adding an account means adding a row here plus the
 * matching string in `messages/{en,th}.json`. Shared by the home page's
 * "follow us" section and the footer's icon row, so both stay in step.
 */
/** TankQ's LINE Official Account URL, reused wherever a LINE link appears outside the icon row. */
export const LINE_URL = "https://page.line.me/597iheyw";

export const SOCIAL_LINKS = [
  {
    key: "line",
    href: LINE_URL,
    src: "/images/socials/LINE_logo.svg",
  },
  {
    key: "facebook",
    href: "https://www.facebook.com/profile.php?id=61592899202754",
    src: "/images/socials/fb-logo.png",
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/tankq.official/",
    src: "/images/socials/ih-logo.jpg",
  },
] as const satisfies readonly {
  key: string;
  href: string;
  src: string;
}[];
