import Link from "next/link";
import AssemblyLine from "@/components/site/AssemblyLine";
import ProductCard from "@/components/site/ProductCard";
import { brands, products, featuredIds } from "@/data/catalog";
import { company } from "@/data/company";

const services = [
  {
    title: "Technical support",
    text: "Engineers in Jakarta who troubleshoot, calibrate and keep your machines in production.",
  },
  {
    title: "Spare parts",
    text: "Parts held in stock for the machines we supply, with warranty on most of them.",
  },
  {
    title: "Used machines",
    text: "Checked second-hand equipment and trade-ins when you upgrade a line.",
  },
  {
    title: "Sourcing",
    text: "We find replacement parts or alternative suppliers through our network.",
  },
];

export default function HomeContent() {
  const featured = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <>
      <section className="hero">
        <img className="hero__photo" src="/images/web/pcb-dark.jpg" alt="" />
        <div className="container hero__content">
          <p className="hero__company">{company.name}</p>
          <h1 className="display">
            Equipment and support for every stage of PCB assembly
          </h1>
          <p className="hero__lead">
            We supply inspection, soldering, coating and test machines from{" "}
            {brands.length} manufacturers to electronics factories in Indonesia,
            and keep them running with local engineers and spare parts.
          </p>
          <div className="btn-row">
            <Link href="/products" className="btn btn-light">
              Browse {products.length} products
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Talk to our sales team
            </Link>
          </div>
        </div>
      </section>

      <div className="line-plate">
        <div className="container">
          <AssemblyLine
            title="Find equipment by stage of your line"
            hint="Select a stage to see the machines for it"
          />
        </div>
      </div>

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h2">
              A trading partner for electronics manufacturers
            </h2>
          </div>
          <div>
            <div className="prose">
              <p className="lead" style={{ color: "var(--ink)" }}>
                {company.name} is an industrial supplier and general trading
                company serving manufacturing industries.
              </p>
              <p className="muted">
                We help customers choose the right machine for their boards and
                volumes, install it, and support it for the years it runs. That
                combination has cut costs and raised quality on many of our
                customers&apos; lines.
              </p>
            </div>
            <dl className="facts" style={{ marginTop: 36 }}>
              <div>
                <dt>{brands.length}</dt>
                <dd>Equipment manufacturers represented</dd>
              </div>
              <div>
                <dt>{products.length}</dt>
                <dd>Machine models across six process stages</dd>
              </div>
              <div>
                <dt>Jakarta</dt>
                <dd>Local sales, service and spare-parts team</dd>
              </div>
              <div>
                <dt>One stop</dt>
                <dd>
                  Supply, installation, spare parts and sourcing from one
                  supplier
                </dd>
              </div>
            </dl>
            <p style={{ marginTop: 28 }}>
              <Link href="/about" className="text-link">
                More about the company
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--steel">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">Featured equipment</h2>
              <p className="lead">
                A few of the machines customers ask us about most.
              </p>
            </div>
            <Link
              href="/products"
              className="btn btn-outline section-head__aside"
            >
              See all products
            </Link>
          </div>
          <div className="product-grid product-grid--3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">Manufacturers we represent</h2>
              <p className="lead">
                Each brand covers a part of the line, so one supplier can equip
                all of it.
              </p>
            </div>
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

      <section className="section section--steel">
        <div className="container split">
          <div>
            <img
              className="photo photo--tall"
              src="/images/web/pcb-tweezers.jpg"
              alt="Technician placing a component on a circuit board"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="h2">Support after installation</h2>
            <p className="lead" style={{ margin: "14px 0 32px" }}>
              A machine is only useful while it runs. Our service team stays
              with it.
            </p>
            <ul className="service-list">
              {services.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 28 }}>
              <Link href="/services" className="text-link">
                How our services work
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2 className="h2">Planning a new line or upgrading one?</h2>
            <p>
              Tell us about your boards, volumes and process. We will recommend
              equipment and arrange a demonstration.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-light">
              Request a quote
            </Link>
            <a
              href={`tel:${company.phones[0].tel}`}
              className="btn btn-ghost-light"
            >
              Call {company.phones[0].display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
