import fs from "fs";
import path from "path";
import Seo from "@/components/site/Seo";
import SiteLayout from "@/components/site/SiteLayout";
import ProductDetail from "@/components/Content/ProductDetail";
import { brands, products, categoryById } from "@/data/catalog";

// Each product's content lives in src/data/products/<brand>/<slug>.json.
const DATA_DIR = path.join(process.cwd(), "src", "data", "products");

export async function getStaticPaths() {
  const paths = [];
  for (const brand of fs.readdirSync(DATA_DIR)) {
    for (const file of fs.readdirSync(path.join(DATA_DIR, brand))) {
      if (file.endsWith(".json")) {
        paths.push({ params: { brand, slug: file.replace(/\.json$/, "") } });
      }
    }
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const file = path.join(DATA_DIR, params.brand, `${params.slug}.json`);
  const product = JSON.parse(fs.readFileSync(file, "utf8"));
  const brand = brands.find((b) => b.id === params.brand) || {
    id: params.brand,
    name: params.brand,
    logo: null,
  };
  const href = `/products/${params.brand}/details/${params.slug}`;
  const entry = products.find((p) => p.href === href);
  const category = entry ? categoryById(entry.category) : null;
  const related = entry
    ? products
        .filter((p) => p.id !== entry.id && p.category === entry.category)
        .sort(
          (a, b) =>
            (b.section === entry.section) - (a.section === entry.section),
        )
        .slice(0, 4)
    : [];

  return {
    props: {
      product,
      brand,
      category: category
        ? { id: category.id, name: category.name, nameJa: category.nameJa }
        : null,
      related,
    },
  };
}

export default function ProductPage({ product, brand, category, related }) {
  const firstText = [
    ...product.intro,
    ...product.sections.flatMap((s) => s.blocks),
  ].find((b) => b.t === "p");
  return (
    <SiteLayout>
      <Seo
        title={`${product.name} | ${brand.name}`}
        description={
          product.tagline ||
          (firstText
            ? firstText.text.slice(0, 155)
            : `${brand.name} ${product.name}`)
        }
      />
      <ProductDetail
        product={product}
        brand={brand}
        category={category}
        related={related}
      />
    </SiteLayout>
  );
}
