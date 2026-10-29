import Link from "next/link";
import { categories } from "@/data/catalog";
import { company } from "@/data/company";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div>
          <Link href="/" className="site-footer__logo" aria-label="Home">
            <img
              src="/logo/tamura-white.png"
              alt="Tamura"
              width="128"
              height="22"
            />
          </Link>
          <p>
            Industrial supplier of electronics manufacturing equipment, spare
            parts and technical support for factories in Indonesia.
          </p>
        </div>

        <nav aria-label="Products">
          <h2>Products</h2>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/products?category=${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2>Company</h2>
          <ul>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/products">All products</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2>Contact</h2>
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
        <span>
          Brand names and logos belong to their respective manufacturers.
        </span>
      </div>
    </footer>
  );
}
