import Link from "@/components/site/Link";
import { categoryById } from "@/data/catalog";
import { tr, useLang, asset } from "@/i18n";

export default function ProductCard({ product }) {
  const lang = useLang();
  const category = categoryById(product.category);
  const section = category?.sections.find((s) => s.id === product.section);
  const body = (
    <>
      <div className="product-card__media">
        {product.image ? (
          <img
            src={asset(product.image)}
            alt={`${product.brand} ${product.name}`}
            loading="lazy"
          />
        ) : (
          <span className="product-card__noimg">
            {product.brand}
            <br />
            {product.name}
          </span>
        )}
      </div>
      <div className="product-card__body">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.name}</h3>
        {section && (
          <span className="product-card__process">
            {tr(section, "label", lang)}
          </span>
        )}
        <span className="product-card__cta">
          {product.href
            ? lang === "ja"
              ? "仕様を見る"
              : "View specifications"
            : lang === "ja"
              ? "この機種について問い合わせる"
              : "Ask us about this model"}
        </span>
      </div>
    </>
  );

  if (product.href) {
    return (
      <Link href={product.href} className="product-card">
        {body}
      </Link>
    );
  }
  return (
    <Link
      href={`/contact?product=${encodeURIComponent(`${product.brand} ${product.name}`)}`}
      className="product-card"
    >
      {body}
    </Link>
  );
}
