import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { categories, productsIn } from "@/data/catalog";
import { SearchIcon, ChevronDown, MenuIcon, CloseIcon } from "./icons";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

function HeaderSearch({ className = "", onDone }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
    if (onDone) onDone();
  }

  return (
    <form
      role="search"
      className={`header-search ${className}`}
      onSubmit={submit}
    >
      <SearchIcon />
      <label className="visually-hidden" htmlFor={`search-${className || "m"}`}>
        Search products
      </label>
      <input
        id={`search-${className || "m"}`}
        type="search"
        placeholder="Search products"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
}

/**
 * Site header.
 * variant="overlay" sits transparent over a dark hero and turns white on scroll.
 * variant="solid" is a white sticky bar for every other page.
 */
export default function SiteHeader({ variant = "solid" }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const hoverOpened = useRef(false);

  useEffect(() => {
    if (variant !== "overlay") return undefined;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    const close = () => {
      setMegaOpen(false);
      setMobileOpen(false);
    };
    router.events?.on("routeChangeStart", close);
    return () => router.events?.off("routeChangeStart", close);
  }, [router.events]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  useEffect(() => {
    if (!megaOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const overlay = variant === "overlay" && !scrolled && !megaOpen;
  const path = router.pathname || "";
  const isActive = (href) => path === href || path.startsWith(href + "/");

  const openMega = () => {
    clearTimeout(closeTimer.current);
    if (!megaOpen) hoverOpened.current = true;
    setMegaOpen(true);
  };
  // A click right after hover-opening keeps the menu open instead of closing it.
  const clickMega = () => {
    if (hoverOpened.current) {
      hoverOpened.current = false;
      setMegaOpen(true);
    } else {
      setMegaOpen((o) => !o);
    }
  };
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      hoverOpened.current = false;
      setMegaOpen(false);
    }, 120);
  };

  return (
    <header
      className={`site-header ${overlay ? "is-overlay" : ""} ${
        variant === "solid" ? "is-solid" : ""
      }`}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="container site-header__inner">
        <Link
          href="/"
          className="site-header__logo"
          aria-label="Tamura Trade Indonesia home"
        >
          <img
            src={overlay ? "/logo/tamura-white.png" : "/logo/tamura03.png"}
            alt="Tamura"
            width="128"
            height="22"
          />
        </Link>

        <nav aria-label="Main" style={{ height: "100%" }}>
          <ul className="site-nav">
            <li onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
              <button
                type="button"
                className="site-nav__link"
                aria-expanded={megaOpen}
                aria-controls="products-menu"
                aria-current={isActive("/products") ? "page" : undefined}
                onClick={clickMega}
              >
                Products
                <ChevronDown className="site-nav__chev" />
              </button>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="site-nav__link"
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__tools">
          <HeaderSearch className="header-search--desktop" />
          <Link href="/contact" className="btn btn-primary">
            Request a quote
          </Link>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="visually-hidden">
            {mobileOpen ? "Close menu" : "Open menu"}
          </span>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {megaOpen && (
        <div
          id="products-menu"
          className="mega"
          onMouseEnter={openMega}
          onMouseLeave={closeMegaSoon}
        >
          <div className="container mega__inner">
            <ol className="mega__list">
              {categories.map((c) => (
                <li key={c.id} className="mega__item">
                  <Link
                    href={`/products?category=${c.id}`}
                    onClick={() => setMegaOpen(false)}
                  >
                    <span className="mega__name">{c.name}</span>
                    <span className="mega__desc">{c.summary}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mega__aside">
              <p>
                Browse machines for marking, SMT, through-hole, conformal
                coating and more, or search by model name.
              </p>
              <Link
                href="/products"
                className="text-link"
                onClick={() => setMegaOpen(false)}
              >
                View all products
              </Link>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div id="mobile-menu" className="mobile-panel">
          <HeaderSearch onDone={() => setMobileOpen(false)} />
          <ul className="mobile-panel__nav">
            <li>
              <Link href="/products">Products</Link>
              <ul className="mobile-panel__sub">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href={`/products?category=${c.id}`}>
                      {c.name} ({productsIn(c.id).length})
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Request a quote
          </Link>
        </div>
      )}
    </header>
  );
}
