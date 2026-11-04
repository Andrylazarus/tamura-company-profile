import Link from "@/components/site/Link";
import { categories, productsIn } from "@/data/catalog";
import { tr, useLang } from "@/i18n";

/**
 * The assembly line: product categories laid out as stations in process order.
 * Pass `onSelect` to use it as a filter (buttons), otherwise it renders links.
 */
export default function AssemblyLine({ active, onSelect, title, hint }) {
  const lang = useLang();
  return (
    <div className="line">
      {(title || hint) && (
        <div className="line__head">
          {title && <h2 className="line__title">{title}</h2>}
          {hint && <span className="line__hint">{hint}</span>}
        </div>
      )}
      <ol className="line__track">
        {categories.map((c) => {
          const count = productsIn(c.id).length;
          const inner = (
            <>
              <span className="line__name">{tr(c, "name", lang)}</span>
              <span className="line__count">
                {lang === "ja"
                  ? `${count} 機種`
                  : `${count} ${count === 1 ? "model" : "models"}`}
              </span>
            </>
          );
          return (
            <li key={c.id} className="line__station">
              {onSelect ? (
                <button
                  type="button"
                  aria-pressed={active === c.id}
                  onClick={() => onSelect(c.id)}
                >
                  {inner}
                </button>
              ) : (
                <Link
                  href={`/products?category=${c.id}`}
                  aria-current={active === c.id ? "true" : undefined}
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
