import Link from "next/link";
import ProductCard from "@/components/site/ProductCard";
import { tr, useLang } from "@/i18n";

const T = {
  en: {
    home: "Home",
    products: "Products",
    quote: "Request a quote",
    specs: "View specifications",
    onPage: "On this page",
    details: "Details",
    interested: (n) => `Interested in the ${n}?`,
    ctaText:
      "Ask for a quotation, a demonstration or the full specification sheet. Our sales team will reply.",
    related: "Related equipment",
    allIn: (c) => `All ${c} products`,
    maker: (x) => `${x} on the manufacturer's website`,
    englishOnly: "",
  },
  ja: {
    home: "ホーム",
    products: "製品",
    quote: "お見積り依頼",
    specs: "仕様を見る",
    onPage: "このページの内容",
    details: "詳細",
    interested: (n) => `${n}にご興味がありますか？`,
    ctaText:
      "お見積り、デモンストレーション、詳細な仕様書をご依頼ください。営業担当からご連絡します。",
    related: "関連製品",
    allIn: (c) => `${c}の製品をすべて見る`,
    maker: (x) => `メーカーのウェブサイトで${x}を見る`,
    englishOnly: "この製品の詳細はメーカー資料に基づき英語で掲載しています。",
  },
};

function SpecTable({ rows }) {
  return (
    <div className="spec-table-wrap">
      <table className="spec-table">
        <tbody>
          {rows.map((cells, i) => {
            const filled = cells.filter(Boolean);
            // A row with only its first cell filled is a group heading.
            if (cells.length > 1 && filled.length === 1 && cells[0]) {
              return (
                <tr key={i} className="spec-table__group">
                  <th colSpan={cells.length}>{cells[0]}</th>
                </tr>
              );
            }
            // A value followed by empty cells spans them (it applies to every model).
            let last = cells.length - 1;
            while (last > 1 && !cells[last]) last--;
            return (
              <tr key={i}>
                {cells.slice(0, last + 1).map((c, j) =>
                  j === 0 ? (
                    <th key={j} scope="row">
                      {c}
                    </th>
                  ) : (
                    <td
                      key={j}
                      colSpan={j === last ? cells.length - last : undefined}
                    >
                      {c}
                    </td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Text({ text }) {
  const lines = text.split("\n");
  return (
    <p>
      {lines.map((l, i) => (
        <span key={i}>
          {l}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

// Renders a list of content blocks. Consecutive images are shown as a gallery.
function Blocks({ blocks, alt, t }) {
  const out = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.t === "img") {
      const group = [b];
      while (blocks[i + 1] && blocks[i + 1].t === "img")
        group.push(blocks[++i]);
      out.push(
        <div
          key={i}
          className={`detail-gallery detail-gallery--${Math.min(group.length, 3)}`}
        >
          {group.map((g) => (
            <img key={g.src} src={g.src} alt={alt} loading="lazy" />
          ))}
        </div>,
      );
    } else if (b.t === "h3") out.push(<h3 key={i}>{b.text}</h3>);
    else if (b.t === "p") out.push(<Text key={i} text={b.text} />);
    else if (b.t === "list")
      out.push(
        <ul key={i}>
          {b.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>,
      );
    else if (b.t === "table") out.push(<SpecTable key={i} rows={b.rows} />);
    else if (b.t === "video")
      out.push(
        <div key={i} className="video-frame">
          <video controls preload="none" playsInline src={b.src} />
        </div>,
      );
    else if (b.t === "link")
      out.push(
        <p key={i}>
          <a
            className="text-link"
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.maker(b.text)}
          </a>
        </p>,
      );
  }
  return out;
}


export default function ProductDetail({
  product: base,
  brand,
  category,
  related,
}) {
  const lang = useLang();
  const t = T[lang];
  // A product file may carry a Japanese version under "ja"; otherwise English is shown.
  const translated = lang === "ja" && base.ja;
  const product = translated ? { ...base, ...base.ja } : base;
  const quote = `/contact?product=${encodeURIComponent(`${brand.name} ${product.name}`)}`;
  const sections = product.sections.filter((s) => s.blocks.length);
  // Anchors use the section position so they work for Japanese titles too.
  const anchor = (i) => `section-${i + 1}`;
  const specIndex = sections.findIndex((s) => /spec|仕様/i.test(s.title));

  return (
    <>
      <section className="detail-head">
        <div className="container detail-head__inner">
          <div>
            <ol className="crumbs crumbs--dark">
              <li>
                <Link href="/">{t.home}</Link>
              </li>
              <li>
                <Link href="/products">{t.products}</Link>
              </li>
              {category && (
                <li>
                  <Link href={`/products?category=${category.id}`}>
                    {tr(category, "name", lang)}
                  </Link>
                </li>
              )}
              <li aria-current="page">{product.name}</li>
            </ol>
            <div className="detail-head__brand">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} />
              ) : (
                <span className="brand-tile__wordmark">{brand.name}</span>
              )}
            </div>
            {product.type && (
              <p className="detail-head__type">{product.type}</p>
            )}
            <h1 className="h1">{product.name}</h1>
            {product.tagline && (
              <p className="lead detail-head__tagline">{product.tagline}</p>
            )}
            {lang === "ja" && !translated && (
              <p className="detail-head__note">{t.englishOnly}</p>
            )}
            <div className="detail-copy detail-head__intro">
              <Blocks blocks={product.intro} alt={product.name} t={t} />
            </div>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link href={quote} className="btn btn-primary">
                {t.quote}
              </Link>
              {specIndex > -1 && (
                <a
                  href={`#${anchor(specIndex)}`}
                  className="btn btn-outline"
                >
                  {t.specs}
                </a>
              )}
            </div>
          </div>
          {product.image && (
            <div className="detail-head__media">
              <img src={product.image} alt={`${brand.name} ${product.name}`} />
            </div>
          )}
        </div>
      </section>

      {sections.length > 0 && (
        <section className="section">
          <div className="container detail-body">
            {sections.length > 1 && (
              <nav className="detail-toc" aria-label={t.onPage}>
                <p>{t.onPage}</p>
                <ul>
                  {sections.map((s, i) => (
                    <li key={i}>
                      <a href={`#${anchor(i)}`}>
                        {s.title || t.details}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="detail-sections">
              {sections.map((s, i) => (
                <section
                  key={i}
                  id={anchor(i)}
                  className="detail-section"
                >
                  {s.title && <h2 className="h2">{s.title}</h2>}
                  <div className="detail-copy">
                    <Blocks blocks={s.blocks} alt={product.name} t={t} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2 className="h2">{t.interested(product.name)}</h2>
            <p>{t.ctaText}</p>
          </div>
          <div className="btn-row">
            <Link href={quote} className="btn btn-light">
              {t.quote}
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--steel">
          <div className="container">
            <div className="section-head">
              <h2 className="h2">{t.related}</h2>
              {category && (
                <Link
                  href={`/products?category=${category.id}`}
                  className="btn btn-outline section-head__aside"
                >
                  {t.allIn(tr(category, "name", lang))}
                </Link>
              )}
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
