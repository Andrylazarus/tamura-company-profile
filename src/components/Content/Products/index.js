import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "@/components/site/Link";
import PageHead from "@/components/site/PageHead";
import AssemblyLine from "@/components/site/AssemblyLine";
import ProductCard from "@/components/site/ProductCard";
import { SearchIcon } from "@/components/site/icons";
import { brands, categories, products, categoryById } from "@/data/catalog";
import { localize, tr, useLang } from "@/i18n";

const T = {
  en: {
    title: "Solutions",
    lead: "Equipment for every stage of electronics assembly, from SMT handling and marking to SMT, through-hole, conformal coating and factory automation.",
    search: "Search solutions",
    placeholder: "Model, brand or process",
    filter: "Filter by category",
    allCats: "Showing all categories",
    all: (x) => `All ${x}`,
    process: "Process",
    brand: "Brand",
    allBrands: "All brands",
    count: (n) => `${n} ${n === 1 ? "model" : "models"}`,
    matching: (q) => ` matching “${q}”`,
    from: (b) => ` from ${b}`,
    inCat: (c) => ` in ${c}`,
    clear: "Clear filters",
    emptyTitle: "No models match these filters",
    emptyText:
      "Try a model name such as Zenith or a process such as reflow. If you cannot find a machine, our sales team can source it for you.",
    ask: "Ask our sales team",
    onRequestTitle: (c) => `${c} solutions on request`,
    onRequestText:
      "We do not list models for this process yet, but our team can recommend and source the right equipment for your line.",
  },
  ja: {
    title: "ソリューション",
    lead: "SMTハンドリングやマーキングから、SMT、挿入実装、コンフォーマルコーティング、工場自動化まで、電子機器実装の全工程に対応する装置。",
    search: "ソリューションを検索",
    placeholder: "型番・メーカー・工程で検索",
    filter: "分野で絞り込む",
    allCats: "すべての分野を表示中",
    all: (x) => `${x}すべて`,
    process: "工程",
    brand: "メーカー",
    allBrands: "すべてのメーカー",
    count: (n) => `${n}機種`,
    matching: (q) => `（「${q}」で検索）`,
    from: (b) => `・${b}`,
    inCat: (c) => `・${c}`,
    clear: "絞り込みを解除",
    emptyTitle: "条件に一致する機種はありません",
    emptyText:
      "Zenith などの型番や、リフローなどの工程名で検索してください。見つからない装置も、営業担当がお探しします。",
    ask: "営業担当に問い合わせる",
    onRequestTitle: (c) => `${c}のソリューションはお問い合わせください`,
    onRequestText:
      "この工程の機種はまだ掲載していませんが、お客様のラインに合った装置を当社チームがご提案・手配します。",
  },
};

function matches(product, term) {
  const cat = categoryById(product.category);
  const section = cat?.sections.find((s) => s.id === product.section);
  const haystack = [
    product.name,
    product.brand,
    cat?.name,
    cat?.nameJa,
    cat?.short,
    section?.label,
    section?.labelJa,
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
  const lang = useLang();
  const t = T[lang];
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
    router.replace(
      { pathname: localize("/products", lang), query: params },
      undefined,
      {
        shallow: true,
        scroll: false,
      },
    );
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
          title: tr(s, "label", lang),
          items: visible.filter((p) => p.section === s.id),
        }))
        .filter((g) => g.items.length)
    : categories
        .map((c) => ({
          id: c.id,
          title: tr(c, "name", lang),
          items: visible.filter((p) => p.category === c.id),
        }))
        .filter((g) => g.items.length);

  const hasFilters = category || section || brand || query;
  const onRequest = activeCategory && !brand && !query && visible.length === 0;

  return (
    <>
      <PageHead title={t.title} lead={t.lead} photo="/images/web/pcb-color.jpg">
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
            {t.search}
          </label>
          <input
            id="catalog-q"
            type="search"
            value={query}
            placeholder={t.placeholder}
            onChange={(e) => update({ q: e.target.value })}
          />
        </form>
      </PageHead>

      <div className="catalog-bar">
        <div className="container">
          <AssemblyLine
            title={t.filter}
            hint={
              activeCategory ? tr(activeCategory, "summary", lang) : t.allCats
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
            <div className="chips" aria-label={t.process}>
              {activeCategory && (
                <>
                  <button
                    type="button"
                    className="chip"
                    aria-pressed={!section}
                    onClick={() => update({ section: "" })}
                  >
                    {t.all(tr(activeCategory, "short", lang))}
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
                      {tr(s, "label", lang)}
                    </button>
                  ))}
                </>
              )}
            </div>
            <div
              className="field"
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <label htmlFor="brand-filter">{t.brand}</label>
              <select
                id="brand-filter"
                className="select"
                value={brand}
                onChange={(e) => update({ brand: e.target.value })}
              >
                <option value="">{t.allBrands}</option>
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
            {t.count(visible.length)}
            {query ? t.matching(query) : ""}
            {brand ? t.from(brand) : ""}
            {activeCategory ? t.inCat(tr(activeCategory, "name", lang)) : ""}
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
                {t.clear}
              </button>
            )}
          </p>

          {visible.length === 0 ? (
            <div className="empty">
              {onRequest ? (
                <>
                  <h2 className="h3">
                    {t.onRequestTitle(tr(activeCategory, "name", lang))}
                  </h2>
                  <p>{t.onRequestText}</p>
                </>
              ) : (
                <>
                  <h2 className="h3">{t.emptyTitle}</h2>
                  <p>{t.emptyText}</p>
                </>
              )}
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() =>
                    update({ category: "", section: "", brand: "", q: "" })
                  }
                >
                  {t.clear}
                </button>
                <Link href="/contact" className="btn btn-primary">
                  {t.ask}
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
