import { useEffect, useRef } from "react";
import Link from "@/components/site/Link";
import { categories, productsIn } from "@/data/catalog";
import { tr, useLang } from "@/i18n";

/**
 * Solution categories as numbered tabs, in process order (01, 02 … and ".." for Others).
 * Pass `onSelect` to use it as a filter (buttons), otherwise it renders links.
 * Anything passed as children is shown under the tabs (the sub-process row).
 */
export default function AssemblyLine({
  active,
  onSelect,
  title,
  hint,
  children,
}) {
  const lang = useLang();
  const track = useRef(null);

  // keep the active tab visible when the row scrolls sideways on small screens
  useEffect(() => {
    const el = track.current;
    const tab =
      el && el.querySelector('[aria-pressed="true"], [aria-current="true"]');
    if (!tab || el.scrollWidth <= el.clientWidth) return;
    const li = tab.parentElement;
    el.scrollTo({
      left: li.offsetLeft - (el.clientWidth - li.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div className="line">
      {(title || hint) && (
        <div className="line__head">
          {title && <h2 className="line__title">{title}</h2>}
          {hint && <span className="line__hint">{hint}</span>}
        </div>
      )}
      <ol className="line__track" ref={track}>
        {categories.map((c, i) => {
          const count = productsIn(c.id).length;
          const step =
            c.id === "others" ? ".." : String(i + 1).padStart(2, "0");
          const inner = (
            <>
              <span className="line__step" aria-hidden="true">
                {step}
              </span>
              <span className="line__name">{tr(c, "name", lang)}</span>
              <span className="line__count">
                {count === 0
                  ? lang === "ja"
                    ? "お問い合わせ"
                    : "On request"
                  : lang === "ja"
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
      {children}
    </div>
  );
}
