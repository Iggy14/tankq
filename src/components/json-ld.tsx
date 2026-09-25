/**
 * Renders a schema.org JSON-LD block. `<` is escaped so a value containing
 * "</script>" can't break out of the tag; every value passed in is our own
 * content/route data, never arbitrary user input, but this keeps it safe
 * regardless.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
