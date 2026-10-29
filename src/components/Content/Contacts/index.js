import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageHead from "@/components/site/PageHead";
import { company, mapsEmbed, mapsLink } from "@/data/company";

const topics = [
  "Product quotation",
  "Technical support",
  "Spare parts",
  "Used machines",
  "Other",
];

export default function Contacts() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    topic: topics[0],
    message: "",
  });

  // /contact?product=Koh%20Young%20Zenith pre-fills the message.
  useEffect(() => {
    if (!router.isReady) return;
    const product = router.query.product;
    if (product) {
      setForm((f) => ({
        ...f,
        topic: topics[0],
        message:
          f.message ||
          `I would like a quotation and specifications for the ${product}.`,
      }));
    }
  }, [router.isReady, router.query.product]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // No server is needed: the form opens the visitor's email app with everything filled in.
  function send(e) {
    e.preventDefault();
    const body = [
      form.message,
      "",
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");
    const subject = `${form.topic}${form.company ? ` - ${form.company}` : ""}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <PageHead
        title="Contact us"
        lead="Ask for a quotation, technical help or spare parts. Our team in Jakarta will reply."
        photo="/images/web/pcb-green.jpg"
        crumb="Contact"
      />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2 className="h2" style={{ marginBottom: 28 }}>
              {company.name}
            </h2>
            <dl className="contact-list">
              <div>
                <dt>Office</dt>
                <dd>
                  <address style={{ fontStyle: "normal" }}>
                    {company.address.lines.map((l) => (
                      <span key={l}>
                        {l}
                        <br />
                      </span>
                    ))}
                  </address>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                  </a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </dd>
              </div>
              {company.phones.map((p) => (
                <div key={p.tel}>
                  <dt>{p.label}</dt>
                  <dd>
                    <a href={`tel:${p.tel}`}>{p.display}</a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="h3" style={{ marginBottom: 16 }}>
              Send us a message
            </h2>
            <form className="form" onSubmit={send}>
              <div className="field">
                <label htmlFor="c-name">Your name</label>
                <input
                  id="c-name"
                  className="input"
                  required
                  value={form.name}
                  onChange={set("name")}
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor="c-company">Company</label>
                <input
                  id="c-company"
                  className="input"
                  value={form.company}
                  onChange={set("company")}
                  autoComplete="organization"
                />
              </div>
              <div className="field">
                <label htmlFor="c-phone">Phone (optional)</label>
                <input
                  id="c-phone"
                  className="input"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                />
              </div>
              <div className="field">
                <label htmlFor="c-topic">Topic</label>
                <select
                  id="c-topic"
                  className="select"
                  value={form.topic}
                  onChange={set("topic")}
                >
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field field--full">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  className="textarea"
                  required
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Which machine or part, your board type and volume, and when you need it."
                />
              </div>
              <div className="field--full">
                <button type="submit" className="btn btn-primary">
                  Write email
                </button>
              </div>
              <p className="form__note">
                This opens your email app with the message ready to send to{" "}
                {company.email}.
              </p>
            </form>
          </div>
        </div>
      </section>

      <iframe
        className="map-frame"
        title="Map showing the Tamura Trade Indonesia office"
        src={mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </>
  );
}
