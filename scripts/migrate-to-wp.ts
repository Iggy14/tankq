/**
 * One-off import of the built-in content (src/lib/*) into WordPress.
 *
 *   npx tsx scripts/migrate-to-wp.ts --dry-run   print what would happen
 *   npx tsx scripts/migrate-to-wp.ts             create / update everything
 *
 * Reads WP_API_URL, WP_USER and WP_APP_PASSWORD from .env.local. Safe to run
 * again: every post is matched by slug and updated in place, and every picture
 * is uploaded under a name derived from its path, so it is found rather than
 * duplicated. Only the Next.js side ever reads the result; nothing in the site
 * imports this file.
 *
 * The `tankq-cms` plugin must be active, with ACF, before running it.
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

import { productCategories } from "../src/lib/product-categories";
import { products, type Product } from "../src/lib/products";
import {
  projectApplications,
  projectTankTypes,
} from "../src/lib/project-tags";
import { projects } from "../src/lib/projects";
import { services } from "../src/lib/services";
import type { Localized } from "../src/lib/localized";
import {
  PRODUCT_IMAGE_SLOTS,
  PRODUCT_SPEC_SLOTS,
  PROJECT_IMAGE_SLOTS,
  SERVICE_POINT_SLOTS,
} from "../src/lib/wp/catalogue";
import type { WpRestBase } from "../src/lib/wp/client";

const DRY_RUN = process.argv.includes("--dry-run");
const PUBLIC_DIR = join(process.cwd(), "public");

type Acf = Record<string, string | number | boolean>;

interface WpEntity {
  id: number;
  slug: string;
}

if (existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

const origin = (process.env.WP_API_URL ?? "").replace(/\/+$/, "");
const credentials = `${process.env.WP_USER ?? ""}:${process.env.WP_APP_PASSWORD ?? ""}`;

if (!origin || credentials === ":") {
  console.error("Set WP_API_URL, WP_USER and WP_APP_PASSWORD in .env.local.");
  process.exit(1);
}

const authorization = `Basic ${Buffer.from(credentials).toString("base64")}`;

async function wp<T>(
  path: string,
  init: { method?: string; body?: BodyInit; headers?: Record<string, string> } = {},
): Promise<T> {
  const response = await fetch(`${origin}/wp-json/wp/v2/${path}`, {
    method: init.method ?? "GET",
    body: init.body,
    headers: { Authorization: authorization, ...init.headers },
  });

  if (!response.ok) {
    throw new Error(
      `${init.method ?? "GET"} ${path} failed (${response.status}): ${await response.text()}`,
    );
  }

  return (await response.json()) as T;
}

function jsonBody(value: unknown) {
  return {
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
  };
}

/** `<base>_th` / `<base>_en` entries for a localized value. */
function pair(base: string, value: Localized): Acf {
  return { [`${base}_th`]: value.th, [`${base}_en`]: value.en };
}

const ids = new Map<string, number>();

/** Creates the post, or updates it if its slug already exists. */
async function upsert(
  base: WpRestBase,
  slug: string,
  label: string,
  acf: Acf,
): Promise<number> {
  const key = `${base}:${slug}`;
  const existing = await wp<WpEntity[]>(`${base}?slug=${slug}&status=any`);
  const payload = { title: label, slug, status: "publish", acf };

  if (DRY_RUN) {
    console.log(`${existing[0] ? "update" : "create"} ${key}`);
    ids.set(key, existing[0]?.id ?? 0);
    return existing[0]?.id ?? 0;
  }

  const saved = await wp<WpEntity>(
    existing[0] ? `${base}/${existing[0].id}` : base,
    { method: "POST", ...jsonBody(payload) },
  );

  console.log(`${existing[0] ? "updated" : "created"} ${key}`);
  ids.set(key, saved.id);
  return saved.id;
}

const mediaIds = new Map<string, number>();

/**
 * Uploads a picture from `public/` and returns its media id. The upload name
 * is the path with separators turned into dashes (`/images/products/a/1.webp`
 * becomes `a-1.webp`), so two products' `1.webp` do not collide and a re-run
 * finds the file it already uploaded.
 */
async function uploadImage(publicPath: string): Promise<number | null> {
  const cached = mediaIds.get(publicPath);

  if (cached !== undefined) {
    return cached;
  }

  const file = join(PUBLIC_DIR, publicPath);

  if (!existsSync(file)) {
    console.warn(`  missing file, skipped: ${publicPath}`);
    return null;
  }

  const extension = extname(publicPath);
  const uploadName =
    publicPath
      .replace(/^\/(images\/products|images|why)\//, "")
      .replace(/\.[^.]+$/, "")
      .replace(/\//g, "-") + extension;
  const slug = basename(uploadName, extension).toLowerCase();

  const [found] = await wp<WpEntity[]>(`media?slug=${slug}`);

  if (found) {
    mediaIds.set(publicPath, found.id);
    return found.id;
  }

  if (DRY_RUN) {
    console.log(`  would upload ${publicPath} as ${uploadName}`);
    return 0;
  }

  const contentType =
    extension === ".webp"
      ? "image/webp"
      : extension === ".png"
        ? "image/png"
        : "image/jpeg";

  const uploaded = await wp<WpEntity>("media", {
    method: "POST",
    body: new Uint8Array(readFileSync(file)),
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${uploadName}"`,
    },
  });

  console.log(`  uploaded ${uploadName}`);
  mediaIds.set(publicPath, uploaded.id);
  return uploaded.id;
}

/** `image_1`, `image_2`, ... for as many pictures as the slots allow. */
async function imageFields(
  paths: readonly string[],
  slots: number,
  base = "image",
): Promise<Acf> {
  const fields: Acf = {};

  for (const [index, path] of paths.slice(0, slots).entries()) {
    const id = await uploadImage(path);

    if (id !== null) {
      fields[`${base}_${index + 1}`] = id;
    }
  }

  return fields;
}

function idOf(base: WpRestBase, slug: string): number {
  const id = ids.get(`${base}:${slug}`);

  if (id === undefined) {
    throw new Error(`No ${base} post for "${slug}"; import order is wrong.`);
  }

  return id;
}

function productFields(product: Product, images: Acf): Acf {
  const fields: Acf = {
    ...pair("title", product.title),
    ...pair("description", product.description),
    category: idOf("tq-categories", product.categoryId),
    featured: product.featured,
    order: product.order,
    ...images,
  };

  for (const [index, spec] of (product.specs ?? [])
    .slice(0, PRODUCT_SPEC_SLOTS)
    .entries()) {
    Object.assign(fields, pair(`spec_${index + 1}`, spec.label), {
      [`spec_${index + 1}_icon`]: spec.icon ?? "",
    });
  }

  return fields;
}

async function main() {
  console.log(`${DRY_RUN ? "[dry run] " : ""}Importing into ${origin}`);

  for (const category of productCategories) {
    await upsert("tq-categories", category.id, category.title.en, {
      ...pair("title", category.title),
      order: category.order,
    });
  }

  for (const [base, tags] of [
    ["tq-tank-types", projectTankTypes],
    ["tq-applications", projectApplications],
  ] as const) {
    for (const tag of tags) {
      await upsert(base, tag.id, tag.title.en, {
        ...pair("title", tag.title),
        order: tag.order,
      });
    }
  }

  for (const product of products) {
    const images = await imageFields(product.images, PRODUCT_IMAGE_SLOTS);
    await upsert(
      "tq-products",
      product.slug,
      product.title.en,
      productFields(product, images),
    );
  }

  for (const project of projects) {
    const images = await imageFields(project.images, PROJECT_IMAGE_SLOTS);
    await upsert("tq-projects", project.slug, project.title.en, {
      ...pair("title", project.title),
      ...pair("industry", project.industry),
      ...pair("province", project.province),
      ...pair("problem", project.problem),
      ...pair("solution", project.solution),
      ...pair("result", project.result),
      year: project.year,
      featured: project.featured,
      order: project.order,
      tank_type: idOf("tq-tank-types", project.tankTypeId),
      application: idOf("tq-applications", project.applicationId),
      ...images,
    });
  }

  for (const [index, service] of services.entries()) {
    const fields: Acf = {
      ...pair("title", service.title),
      ...pair("description", service.description),
      ...pair("image_alt", service.imageAlt),
      order: index + 1,
    };

    for (const [pointIndex, point] of service.points
      .slice(0, SERVICE_POINT_SLOTS)
      .entries()) {
      Object.assign(fields, pair(`point_${pointIndex + 1}`, point));
    }

    if (service.image) {
      const id = await uploadImage(service.image);

      if (id !== null) {
        fields.image = id;
      }
    }

    await upsert("tq-services", service.id, service.title.en, fields);
  }

  console.log("Done.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
