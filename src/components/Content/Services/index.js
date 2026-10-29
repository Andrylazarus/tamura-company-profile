import Link from "next/link";
import PageHead from "@/components/site/PageHead";

const services = [
  {
    id: "technical-support",
    title: "Technical support",
    image: "/images/web/svc-support.jpg",
    alt: "Code reader inspecting a panel of PCBs inside a marking machine",
    text: "We are confident in our products, and we still keep a strong technical team for the unexpected. Our engineers help you troubleshoot problems with the machines we supply, and our presence in South-East Asia lets us respond faster than suppliers further away.",
    points: [
      "Troubleshooting for the equipment we supply",
      "Fast response from a team based in Jakarta",
      "Support that continues after installation",
    ],
  },
  {
    id: "spare-parts",
    title: "Spare parts",
    image: "/images/web/svc-parts.jpg",
    alt: "Laser unit inside a PCB marking machine",
    text: "Spare parts decide how long a line stays down. We keep a wide range of parts available, offer warranty on most machine spare parts, and work with your team to keep machines at peak performance.",
    points: [
      "Wide range of parts readily available",
      "Warranty on most machine spare parts",
      "Help from our technical team when a part fails",
    ],
  },
  {
    id: "used-machines",
    title: "New and used machines",
    image: "/images/web/machines-trio.jpg",
    alt: "PTI, Maker-Ray and Koh Young inspection machines",
    text: "Whether you are starting a new venture or updating existing equipment, we will find a machine that fits your budget and requirements, at competitive prices for both new and used equipment.",
    points: [
      "Competitive prices on new and used machines",
      "Trade-ins when you upgrade your technology",
      "Advice on what fits your volume and budget",
    ],
  },
  {
    id: "sourcing",
    title: "Sourcing",
    image: "/images/web/brand-wall.jpg",
    alt: "Logos of the equipment manufacturers we work with",
    text: "If you need replacement parts or an alternative supplier, we use our business network to find the best available offer, as part of our one-stop service.",
    points: [
      "Replacement parts outside our own catalogue",
      "Alternative suppliers when you need options",
      "One contact for everything on your line",
    ],
  },
  {
    id: "networking",
    title: "Business networking",
    image: "/images/web/svc-network.jpg",
    alt: "Tamura team at an industry exhibition",
    text: "We introduce customers and partners to each other. Recommendations and introductions open sales opportunities, build trust, and bring the right resources and people together.",
    points: [
      "Introductions to partners and suppliers",
      "Recommendations within our network",
      "Long-term relationships built on trust",
    ],
  },
];

export default function Services() {
  return (
    <>
      <PageHead
        title="Services"
        lead="Everything that keeps your equipment productive after it arrives: support, spare parts, machines and sourcing."
        photo="/images/web/head-services.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="service-rows">
            {services.map((s) => (
              <article key={s.id} id={s.id} className="service-row">
                <div className="service-row__media">
                  <img src={s.image} alt={s.alt} loading="lazy" />
                </div>
                <div>
                  <h2 className="h2">{s.title}</h2>
                  <p className="muted" style={{ margin: 0, maxWidth: "60ch" }}>
                    {s.text}
                  </p>
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2 className="h2">Need help with a machine?</h2>
            <p>
              Tell us the model and what is happening. Our technical team will
              get back to you.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-light">
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
