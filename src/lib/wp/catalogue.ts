import type { ProductCategory } from "../product-categories";
import { productSpecIcons, type ProductSpec } from "../product-specs";
import type { ProjectTag } from "../project-tags";
import type { Product } from "../products";
import type { Project } from "../projects";
import type { Service } from "../services";

import { fetchWpPosts, type WpPost } from "./client";
import {
  readBool,
  readImage,
  readImages,
  readLocalized,
  readNumber,
  readRelationId,
  readText,
} from "./fields";

/**
 * Maps WordPress posts onto the site's own content types.
 *
 * The field names read here (`title_th`, `image_1`, `spec_1_icon`, ...) are the
 * ones the `tankq-cms` plugin registers in `wordpress/tankq-cms/`; change one
 * side and the other has to follow. The slot counts below are shared with that
 * plugin and with `scripts/migrate-to-wp.ts`.
 *
 * A post's slug is the content id, so `product.id`, `product.slug` and the key
 * into `product-section-data.ts` all stay the same string.
 */

/** Image slots on a product: the widest catalogue entry (epoxy) uses 12. */
export const PRODUCT_IMAGE_SLOTS = 12;
export const PRODUCT_SPEC_SLOTS = 5;
export const PROJECT_IMAGE_SLOTS = 4;
export const SERVICE_POINT_SLOTS = 5;

const SPEC_ICON_IDS: readonly string[] = productSpecIcons;

function mapTag(post: WpPost): ProductCategory & ProjectTag {
  return {
    id: post.slug,
    title: readLocalized(post.acf, "title"),
    order: readNumber(post.acf, "order"),
  };
}

export async function fetchWpCategories(): Promise<ProductCategory[]> {
  return (await fetchWpPosts("tq-categories")).map(mapTag);
}

export async function fetchWpTankTypes(): Promise<ProjectTag[]> {
  return (await fetchWpPosts("tq-tank-types")).map(mapTag);
}

export async function fetchWpApplications(): Promise<ProjectTag[]> {
  return (await fetchWpPosts("tq-applications")).map(mapTag);
}

/** Post id -> slug, for resolving a relation field to a content id. */
function slugById(posts: WpPost[]): Map<number, string> {
  return new Map(posts.map((post) => [post.id, post.slug]));
}

function readSpecs(post: WpPost): ProductSpec[] {
  const specs: ProductSpec[] = [];

  for (let index = 1; index <= PRODUCT_SPEC_SLOTS; index += 1) {
    const label = readLocalized(post.acf, `spec_${index}`);

    if (!label.th && !label.en) {
      continue;
    }

    const icon = readText(post.acf, `spec_${index}_icon`);
    const known = SPEC_ICON_IDS.includes(icon);

    // An id the registry does not know renders as a bullet rather than failing.
    specs.push(
      known ? { icon: icon as ProductSpec["icon"], label } : { label },
    );
  }

  return specs;
}

/**
 * The catalogue from WordPress.
 *
 * `fallback` is the built-in data. It still owns what is tied to the section
 * data in code - `sectionLinks` and `galleryInSections` - and it supplies the
 * pictures for a product the editor has not given any yet, so a half-filled
 * post never renders a page with no image.
 */
export async function fetchWpProducts(
  fallback: readonly Product[],
): Promise<Product[]> {
  const [posts, categoryPosts] = await Promise.all([
    fetchWpPosts("tq-products"),
    fetchWpPosts("tq-categories"),
  ]);

  const categorySlugs = slugById(categoryPosts);
  const builtIn = new Map(fallback.map((product) => [product.slug, product]));

  return posts.map((post) => {
    const base = builtIn.get(post.slug);
    const images = readImages(post.acf, "image", PRODUCT_IMAGE_SLOTS);
    const specs = readSpecs(post);

    return {
      id: post.slug,
      slug: post.slug,
      categoryId:
        categorySlugs.get(readRelationId(post.acf, "category") ?? -1) ??
        base?.categoryId ??
        "",
      title: readLocalized(post.acf, "title"),
      description: readLocalized(post.acf, "description"),
      specs: specs.length > 0 ? specs : undefined,
      sectionLinks: base?.sectionLinks,
      images: images.length > 0 ? images : (base?.images ?? []),
      galleryInSections: base?.galleryInSections,
      featured: readBool(post.acf, "featured"),
      order: readNumber(post.acf, "order"),
    };
  });
}

/** Projects from WordPress. Resolved tag objects are added by `projects.ts`. */
export async function fetchWpProjects(
  fallback: readonly Project[],
): Promise<Project[]> {
  const [posts, tankTypePosts, applicationPosts] = await Promise.all([
    fetchWpPosts("tq-projects"),
    fetchWpPosts("tq-tank-types"),
    fetchWpPosts("tq-applications"),
  ]);

  const tankTypes = slugById(tankTypePosts);
  const applications = slugById(applicationPosts);
  const builtIn = new Map(fallback.map((project) => [project.slug, project]));

  return posts.map((post) => {
    const base = builtIn.get(post.slug);

    return {
      id: post.slug,
      slug: post.slug,
      tankTypeId:
        tankTypes.get(readRelationId(post.acf, "tank_type") ?? -1) ??
        base?.tankTypeId ??
        "",
      applicationId:
        applications.get(readRelationId(post.acf, "application") ?? -1) ??
        base?.applicationId ??
        "",
      industry: readLocalized(post.acf, "industry"),
      province: readLocalized(post.acf, "province"),
      year: readNumber(post.acf, "year", base?.year ?? 0),
      title: readLocalized(post.acf, "title"),
      problem: readLocalized(post.acf, "problem"),
      solution: readLocalized(post.acf, "solution"),
      result: readLocalized(post.acf, "result"),
      images: readImages(post.acf, "image", PROJECT_IMAGE_SLOTS),
      featured: readBool(post.acf, "featured"),
      order: readNumber(post.acf, "order"),
    };
  });
}

/** Services from WordPress, in the order the `order` field gives. */
export async function fetchWpServices(): Promise<Service[]> {
  const posts = await fetchWpPosts("tq-services");

  return posts
    .map((post) => {
      const points = [];

      for (let index = 1; index <= SERVICE_POINT_SLOTS; index += 1) {
        const point = readLocalized(post.acf, `point_${index}`);

        if (point.th || point.en) {
          points.push(point);
        }
      }

      return {
        order: readNumber(post.acf, "order"),
        service: {
          id: post.slug,
          title: readLocalized(post.acf, "title"),
          description: readLocalized(post.acf, "description"),
          points,
          image: readImage(post.acf, "image"),
          imageAlt: readLocalized(post.acf, "image_alt"),
        } satisfies Service,
      };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ service }) => service);
}
