import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PageHead from "@/components/site/PageHead";
import AssemblyLine from "@/components/site/AssemblyLine";
import ProductCard from "@/components/site/ProductCard";
import { SearchIcon } from "@/components/site/icons";
import { brands, categories, products, categoryById } from "@/data/catalog";

function matches(product, term) {
  const cat = categoryById(product.category);
  const section = cat?.sections.find((s) => s.id === product.section);
  const haystack = [
    product.name,
    product.brand,
    cat?.name,
    cat?.short,
    section?.label,
  ]
    .join(" ")
    .toLowerCase();
  return term
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export default function Products() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [section, setSection] = useState("");
  const [brand, setBrand] = useState("");
  const [query, setQuery] = useState("");

  // Read filters from the URL so links like /products?category=smt work.
  useEffect(() => {
    if (!router.isReady) return;
    const {
      category: c = "",
      section: s = "",
      brand: b = "",
      q = "",
    } = router.query;
    setCategory(categoryById(c) ? c : "");
    setSection(s);
    // accept either a brand name or its id, e.g. ?brand=kohyoung
    const known = brands.find((x) => x.id === b || x.name === b);
    setBrand(known ? known.name : b);
    setQuery(q);
  }, [router.isReady, router.query]);

  function update(next) {
    const state = { category, section, brand, q: query, ...next };
    setCategory(state.category);
    setSection(state.section);
    setBrand(state.brand);
    setQuery(state.q);
    const params = {};
    Object.entries(state).forEach(([k, v]) => {
      if (v) params[k] = v;
    });
    router.replace({ pathname: "/products", query: params }, undefined, {
      shallow: true,
      scroll: false,
    });
  }

  const activeCategory = categoryById(category);

  const scoped = useMemo(() => {
    return products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!section || p.section === section) &&
        (!query || matches(p, query)),
    );
  }, [category, section, query]);

  const brandOptions = useMemo(
    () => Array.from(new Set(scoped.map((p) => p.brand))).sort(),
    [scoped],
  );
  const visible = brand ? scoped.filter((p) => p.brand === brand) : scoped;

  // Group what is visible: by section inside a category, otherwise by category.
  const groups = activeCategory
    ? activeCategory.sections
        .map((s) => ({
          id: s.id,
          title: s.label,
          items: visible.filter((p) => p.section === s.id),
        }))
        .filter((g) => g.items.length)
    : categories
        .map((c) => ({
          id: c.id,
          title: c.name,
          items: visible.filter((p) => p.category === c.id),
        }))
        .filter((g) => g.items.length);

  const hasFilters = category || section || brand || query;

  return (
    <>
      <PageHead
        title="Products"
        lead="Machines for each stage of electronics assembly, from marking and SMT through to test and conformal coating."
        photo="/images/web/pcb-color.jpg"
      >
        <form
          className="catalog-search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            update({ q: query.trim() });
          }}
        >
          <SearchIcon />
          <label htmlFor="catalog-q" className="visually-hidden">
            Search products
          </label>
          <input
            id="catalog-q"
            type="search"
            value={query}
            placeholder="Model, brand or process"
            onChange={(e) => update({ q: e.target.value })}
          />
        </form>
      </PageHead>

      <div className="catalog-bar">
        <div className="container">
          <AssemblyLine
            title="Filter by stage"
            hint={
              activeCategory ? activeCategory.summary : "Showing every stage"
            }
            active={category}
            onSelect={(id) =>
              update({
                category: id === category ? "" : id,
                section: "",
                brand: "",
              })
            }
          />
        </div>
      </div>

      <section className="section section--steel section--tight">
        <div className="container">
          <div className="catalog-tools">
            <div className="chips" aria-label="Process">
              {activeCategory ? (
                <>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={!section}
                    onClick={() => update({ section: "" })}
                  >
                    All {activeCategory.short}
                  </button>
                  {activeCategory.sections.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="chip"
                      aria-pressed={section === s.id}
                      onClick={() =>
                        update({ section: section === s.id ? "" : s.id })
                      }
                    >
                      {s.label}
                    </button>
                  ))}
                </>
              ) : null}
            </div>
            <div
              className="field"
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <label htmlFor="brand-filter">Brand</label>
              <select
                id="brand-filter"
                className="select"
                value={brand}
                onChange={(e) => update({ brand: e.target.value })}
              >
                <option value="">All brands</option>
                {(brand && !brandOptions.includes(brand)
                  ? [...brandOptions, brand]
                  : brandOptions
                ).map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="results-note" aria-live="polite">
            {visible.length} {visible.length === 1 ? "product" : "products"}
            {query ? ` matching “${query}”` : ""}
            {brand ? ` from ${brand}` : ""}
            {activeCategory ? ` in ${activeCategory.name}` : ""}
            {hasFilters && (
              <button
                type="button"
                className="text-link"
                style={{
                  marginLeft: 16,
                  background: "none",
                  border: 0,
                  padding: 0,
                  cursor: "pointer",
                  font: "inherit",
                }}
                onClick={() =>
                  update({ category: "", section: "", brand: "", q: "" })
                }
              >
                Clear filters
              </button>
            )}
          </p>

          {visible.length === 0 ? (
            <div className="empty">
              <h2 className="h3">No products match these filters</h2>
              <p>
                Try a model name such as Zenith or a process such as reflow. If
                you cannot find a machine, our sales team can source it for you.
              </p>
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() =>
                    update({ category: "", section: "", brand: "", q: "" })
                  }
                >
                  Clear filters
                </button>
                <Link href="/contact" className="btn btn-primary">
                  Ask our sales team
                </Link>
              </div>
            </div>
          ) : (
            groups.map((g) => (
              <div key={g.id} className="catalog-section">
                <div className="catalog-section__head">
                  <h2 className="h3">{g.title}</h2>
                  <span className="catalog-section__count">
                    {g.items.length}
                  </span>
                </div>
                <div className="product-grid">
                  {g.items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
