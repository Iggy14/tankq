import type { Localized } from "../localized";

/**
 * Readers for the loosely typed `acf` object a WordPress post carries.
 *
 * Editors can leave any field empty, and the REST API sends `false`, `null` or
 * `""` for those, so every reader returns a clean default instead of trusting
 * the shape. Nothing here throws on bad data.
 */

export type AcfFields = Record<string, unknown>;

export function readText(acf: AcfFields, key: string): string {
  const value = acf[key];
  return typeof value === "string" ? value.trim() : "";
}

export function readNumber(acf: AcfFields, key: string, fallback = 0): number {
  const value = acf[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

export function readBool(acf: AcfFields, key: string): boolean {
  const value = acf[key];
  return value === true || value === 1 || value === "1";
}

/**
 * `<base>_th` and `<base>_en` as one `Localized`. A language left empty falls
 * back to the other, so a half-translated post shows text rather than a gap.
 */
export function readLocalized(acf: AcfFields, base: string): Localized {
  const th = readText(acf, `${base}_th`);
  const en = readText(acf, `${base}_en`);

  return { th: th || en, en: en || th };
}

/** The URL of an image field, or `null` when none is set. */
export function readImage(acf: AcfFields, key: string): string | null {
  const value = acf[key];

  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url: unknown }).url;
    return typeof url === "string" && url !== "" ? url : null;
  }

  return null;
}

/** `<base>_1` .. `<base>_<count>` image fields, empty slots skipped. */
export function readImages(
  acf: AcfFields,
  base: string,
  count: number,
): string[] {
  const urls: string[] = [];

  for (let index = 1; index <= count; index += 1) {
    const url = readImage(acf, `${base}_${index}`);

    if (url) {
      urls.push(url);
    }
  }

  return urls;
}

/** A post-object field set to return the post's numeric id. */
export function readRelationId(acf: AcfFields, key: string): number | null {
  const value = acf[key];

  if (typeof value === "number") {
    return value;
  }

  if (value && typeof value === "object" && "ID" in value) {
    const id = (value as { ID: unknown }).ID;
    return typeof id === "number" ? id : null;
  }

  return null;
}
