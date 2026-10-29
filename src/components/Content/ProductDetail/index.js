import Link from "next/link";
import ProductCard from "@/components/site/ProductCard";

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
            return (
              <tr key={i}>
                {cells.map((c, j) =>
                  j === 0 ? (
                    <th key={j} scope="row">
                      {c}
                    </th>
                  ) : (
                    <td key={j}>{c}</td>
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
function Blocks({ blocks, alt }) {
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
            {b.text} on the manufacturer&apos;s website
          </a>
        </p>,
      );
  }
  return out;
}

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function ProductDetail({ product, brand, category, related }) {
  const quote = `/contact?product=${encodeURIComponent(`${brand.name} ${product.name}`)}`;
  const sections = product.sections.filter((s) => s.blocks.length);

  return (
    <>
      <section className="detail-head">
        <div className="container detail-head__inner">
          <div>
            <ol className="crumbs crumbs--dark">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              {category && (
                <li>
                  <Link href={`/products?category=${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              )}
              <li aria-current="page">{product.name}</li>
            </ol>
            <div className="detail-head__brand">
              {brand.logo && <img src={brand.logo} alt={brand.name} />}
            </div>
            {product.type && (
              <p className="detail-head__type">{product.type}</p>
            )}
            <h1 className="h1">{product.name}</h1>
            {product.tagline && (
              <p className="lead detail-head__tagline">{product.tagline}</p>
            )}
            <div className="detail-copy detail-head__intro">
              <Blocks blocks={product.intro} alt={product.name} />
            </div>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link href={quote} className="btn btn-primary">
                Request a quote
              </Link>
              {sections.some((s) => /spec/i.test(s.title)) && (
                <a
                  href={`#${slugify(sections.find((s) => /spec/i.test(s.title)).title)}`}
                  className="btn btn-outline"
                >
                  View specifications
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
              <nav className="detail-toc" aria-label="On this page">
                <p>On this page</p>
                <ul>
                  {sections.map((s, i) => (
                    <li key={i}>
                      <a href={`#${slugify(s.title || `section-${i}`)}`}>
                        {s.title || "Details"}
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
                  id={slugify(s.title || `section-${i}`)}
                  className="detail-section"
                >
                  {s.title && <h2 className="h2">{s.title}</h2>}
                  <div className="detail-copy">
                    <Blocks blocks={s.blocks} alt={product.name} />
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
            <h2 className="h2">Interested in the {product.name}?</h2>
            <p>
              Ask for a quotation, a demonstration or the full specification
              sheet. Our sales team will reply.
            </p>
          </div>
          <div className="btn-row">
            <Link href={quote} className="btn btn-light">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--steel">
          <div className="container">
            <div className="section-head">
              <h2 className="h2">Related equipment</h2>
              {category && (
                <Link
                  href={`/products?category=${category.id}`}
                  className="btn btn-outline section-head__aside"
                >
                  All {category.name} products
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
