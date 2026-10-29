import { useEffect } from "react";
import { useRouter } from "next/router";

// Elements that fade up as they scroll into view.
const TARGETS = [
  ".section-head",
  ".split > *",
  ".product-card",
  ".brand-tile",
  ".customer-tile",
  ".service-row",
  ".statement",
  ".facts > div",
  ".service-list li",
  ".detail-section",
  ".cta-band__inner > *",
  ".photo",
].join(",");

/**
 * Scroll reveal. Content is visible by default; this only adds the effect
 * when the browser supports it and the visitor has not asked for less motion.
 */
export default function useReveal() {
  const { asPath } = useRouter();

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }
    const root = document.documentElement;
    root.classList.add("has-reveal");

    const els = Array.from(document.querySelectorAll(TARGETS)).filter(
      (el) => !el.classList.contains("is-visible"),
    );
    // Stagger siblings that appear together (cards in a row, logos in a grid).
    els.forEach((el) => {
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children)
        : [];
      const i = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--reveal-delay", `${Math.min(i % 8, 7) * 60}ms`);
      el.classList.add("reveal");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));

    // Safety net: never leave anything hidden.
    const t = setTimeout(
      () => els.forEach((el) => el.classList.add("is-visible")),
      4000,
    );
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [asPath]);
}
