import Link from "next/link";
import { categoryById } from "@/data/catalog";

export default function ProductCard({ product }) {
  const category = categoryById(product.category);
  const section = category?.sections.find((s) => s.id === product.section);
  const body = (
    <>
      <div className="product-card__media">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
        />
      </div>
      <div className="product-card__body">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.name}</h3>
        {section && (
          <span className="product-card__process">{section.label}</span>
        )}
        <span className="product-card__cta">
          {product.href ? "View specifications" : "Ask us about this model"}
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
