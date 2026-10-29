import Link from "@/components/site/Link";
import { categories } from "@/data/catalog";
import { company } from "@/data/company";
import { tr, useLang, asset } from "@/i18n";

const T = {
  en: {
    blurb:
      "Industrial supplier of electronics manufacturing equipment, spare parts and technical support for factories in Indonesia.",
    products: "Products",
    company: "Company",
    about: "About us",
    services: "Services",
    all: "All products",
    contact: "Contact",
    rights: "Brand names and logos belong to their respective manufacturers.",
  },
  ja: {
    blurb:
      "インドネシアの工場向けに、電子機器製造装置、スペアパーツ、技術サポートを提供する産業機器サプライヤーです。",
    products: "製品",
    company: "会社情報",
    about: "会社概要",
    services: "サービス",
    all: "すべての製品",
    contact: "お問い合わせ",
    rights: "各ブランド名およびロゴは、それぞれのメーカーに帰属します。",
  },
};

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const lang = useLang();
  const t = T[lang];
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div>
          <Link href="/" className="site-footer__logo" aria-label="Home">
            <img
              src={asset("/logo/tamura-white.png")}
              alt="Tamura"
              width="128"
              height="22"
            />
          </Link>
          <p>{t.blurb}</p>
        </div>

        <nav aria-label="Products">
          <h2>{t.products}</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/products?category=${c.id}`}>
                  {tr(c, "name", lang)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2>{t.company}</h2>
          <ul>
            <li>
              <Link href="/about">{t.about}</Link>
            </li>
            <li>
              <Link href="/services">{t.services}</Link>
            </li>
            <li>
              <Link href="/products">{t.all}</Link>
            </li>
            <li>
              <Link href="/contact">{t.contact}</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2>{t.contact}</h2>
          <address>
            {company.address.lines.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </address>
          <ul style={{ marginTop: 14 }}>
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            {company.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`}>{p.display}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>
          © {year} {company.name}
        </span>
        <span>{t.rights}</span>
      </div>
    </footer>
  );
}
