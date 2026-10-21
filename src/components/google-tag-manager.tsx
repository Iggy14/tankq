import { gtmId } from "@/lib/site";

/**
 * Google Tag Manager loader, the standard snippet from GTM's install page.
 * Render it inside an explicit `<head>` in the root layout: that puts it in
 * the server-rendered head, which `next/script` does not (its
 * `beforeInteractive` strategy bootstraps from the body instead).
 */
export function GtmScript() {
  return (
    // The lint rule suggests @next/third-parties, which loads after hydration
    // and so cannot sit high in <head> as the GTM install instructions ask.
    // eslint-disable-next-line @next/next/next-script-for-ga
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
      }}
    />
  );
}

/**
 * GTM's fallback for visitors with JavaScript off. Must be the first thing
 * inside `<body>`. The inline style is part of Google's snippet: it keeps
 * the zero-size iframe from showing.
 */
export function GtmNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
