import Link from "next/link";
import PageHead from "@/components/site/PageHead";
import { brands } from "@/data/catalog";
import { company } from "@/data/company";

export default function About() {
  return (
    <>
      <PageHead
        title="About us"
        lead="A trusted industrial supplier and general trading company for manufacturing industries in Indonesia."
        photo="/images/web/pcb-macro.jpg"
      />

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h2">Quality products, backed by people who stay</h2>
          </div>
          <div className="prose">
            <p className="lead" style={{ color: "var(--ink)" }}>
              {company.name} supplies electronics manufacturers with production
              equipment and the service to keep it running.
            </p>
            <p className="muted">
              We are confident in providing the best service to our customers
              through high-quality products and dedicated support. Over the
              years we have contributed to cost reduction and quality
              improvement on many production lines.
            </p>
            <p className="muted">
              Blue-chip companies are among our customers, and we are proud of
              the reputation we have earned with them for quality products,
              excellent service and competitive prices.
            </p>
            <ul className="customer-list" aria-label="Selected customers">
              {company.customers.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--steel">
        <div className="container">
          <figure style={{ margin: 0 }}>
            <img
              className="photo photo--wide"
              src="/images/web/tamura-team.jpg"
              alt="The Tamura team at a trade exhibition stand"
              loading="lazy"
              style={{ aspectRatio: "17 / 10" }}
            />
            <figcaption className="photo-caption">
              Tamura colleagues at an industry exhibition.
            </figcaption>
          </figure>

          <div className="statements" style={{ marginTop: 64 }}>
            <div className="statement">
              <h3>Vision</h3>
              <p>
                To earn recognition as the brand you can trust, by continuing to
                provide a complete range of high-quality products that meet our
                customers&apos; needs.
              </p>
            </div>
            <div className="statement">
              <h3>Mission</h3>
              <p>
                To serve Indonesia&apos;s manufacturing community with
                innovative, high-quality products through a one-stop supplier
                service.
              </p>
            </div>
            <div className="statement">
              <h3>Commitment</h3>
              <p>
                Excellent product quality, competitive pricing and after-sales
                service, with quick delivery and continuous improvement.
                Satisfied customers are our greatest asset.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h2">See the equipment at work</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              A short showcase of the machines we supply and support.
            </p>
          </div>
          <div className="video-frame">
            <video
              controls
              preload="none"
              playsInline
              poster="/images/web/expo.jpg"
              src="/videos/tamura_showcase.mp4"
            >
              Your browser cannot play this video.
            </video>
          </div>
        </div>
      </section>

      <section className="section section--steel">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">Our partners</h2>
              <p className="lead">
                We work in partnership with these equipment manufacturers.
              </p>
            </div>
            <Link
              href="/products"
              className="btn btn-outline section-head__aside"
            >
              Browse their products
            </Link>
          </div>
          <div className="brand-grid">
            {brands.map((b) => (
              <Link
                key={b.id}
                href={`/products?brand=${encodeURIComponent(b.name)}`}
                className="brand-tile"
              >
                <div className="brand-tile__logo">
                  <img src={b.logo} alt={b.name} loading="lazy" />
                </div>
                <div>
                  <div className="brand-tile__name">{b.name}</div>
                  <div className="brand-tile__focus">{b.focus}</div>
                </div>
              </Link>
            ))}
            <Link href="/contact" className="brand-tile brand-tile--ask">
              <div className="brand-tile__name">Need another brand?</div>
              <div className="brand-tile__focus">
                We source machines and parts from other manufacturers too. Ask
                our sales team.
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
