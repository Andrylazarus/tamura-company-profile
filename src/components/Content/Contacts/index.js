import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageHead from "@/components/site/PageHead";
import { company, mapsEmbed, mapsLink } from "@/data/company";
import { useLang } from "@/i18n";

const T = {
  en: {
    title: "Contact us",
    crumb: "Contact",
    lead: "Ask for a quotation, technical help or spare parts. Our team in Jakarta will reply.",
    office: "Office",
    maps: "Open in Google Maps",
    email: "Email",
    phoneLabels: { Office: "Office", Sales: "Sales" },
    formTitle: "Send us a message",
    name: "Your name",
    company: "Company",
    phone: "Phone (optional)",
    topic: "Topic",
    topics: [
      "Product quotation",
      "Technical support",
      "Spare parts",
      "Used machines",
      "Other",
    ],
    message: "Message",
    placeholder:
      "Which machine or part, your board type and volume, and when you need it.",
    prefill: (p) => `I would like a quotation and specifications for the ${p}.`,
    submit: "Write email",
    note: (e) =>
      `This opens your email app with the message ready to send to ${e}.`,
    bodyName: "Name",
    bodyCompany: "Company",
    bodyPhone: "Phone",
    mapTitle: "Map showing the Tamura Trade Indonesia office",
  },
  ja: {
    title: "お問い合わせ",
    crumb: "お問い合わせ",
    lead: "お見積り、技術的なご相談、スペアパーツのご依頼はこちらから。ジャカルタのチームがご返信します。",
    office: "所在地",
    maps: "Google マップで開く",
    email: "メール",
    phoneLabels: { Office: "代表電話", Sales: "営業" },
    formTitle: "メッセージを送る",
    name: "お名前",
    company: "会社名",
    phone: "電話番号（任意）",
    topic: "お問い合わせ内容",
    topics: [
      "製品のお見積り",
      "技術サポート",
      "スペアパーツ",
      "中古装置",
      "その他",
    ],
    message: "メッセージ",
    placeholder:
      "装置や部品の名称、基板の種類と生産量、ご希望の時期をご記入ください。",
    prefill: (p) => `${p}のお見積りと仕様書をお願いします。`,
    submit: "メールを作成",
    note: (e) => `メールアプリが開き、${e} 宛てのメッセージが作成されます。`,
    bodyName: "お名前",
    bodyCompany: "会社名",
    bodyPhone: "電話番号",
    mapTitle: "Tamura Trade Indonesia の所在地を示す地図",
  },
};

export default function Contacts() {
  const router = useRouter();
  const lang = useLang();
  const t = T[lang];
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    topic: 0,
    message: "",
  });

  // /contact?product=Koh%20Young%20Zenith pre-fills the message.
  useEffect(() => {
    if (!router.isReady) return;
    const product = router.query.product;
    if (product) {
      setForm((f) => ({
        ...f,
        topic: 0,
        message: f.message || T[lang].prefill(product),
      }));
    }
  }, [router.isReady, router.query.product, lang]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // No server is needed: the form opens the visitor's email app with everything filled in.
  function send(e) {
    e.preventDefault();
    const body = [
      form.message,
      "",
      `${t.bodyName}: ${form.name}`,
      form.company ? `${t.bodyCompany}: ${form.company}` : null,
      form.phone ? `${t.bodyPhone}: ${form.phone}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");
    const topic = t.topics[form.topic];
    const subject = `${topic}${form.company ? ` - ${form.company}` : ""}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <PageHead
        title={t.title}
        lead={t.lead}
        photo="/images/web/pcb-green.jpg"
        crumb={t.crumb}
      />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2 className="h2" style={{ marginBottom: 28 }}>
              {company.name}
            </h2>
            <dl className="contact-list">
              <div>
                <dt>{t.office}</dt>
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
                    {t.maps}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{t.email}</dt>
                <dd>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </dd>
              </div>
              {company.phones.map((p) => (
                <div key={p.tel}>
                  <dt>{t.phoneLabels[p.label] || p.label}</dt>
                  <dd>
                    <a href={`tel:${p.tel}`}>{p.display}</a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="h3" style={{ marginBottom: 16 }}>
              {t.formTitle}
            </h2>
            <form className="form" onSubmit={send}>
              <div className="field">
                <label htmlFor="c-name">{t.name}</label>
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
                <label htmlFor="c-company">{t.company}</label>
                <input
                  id="c-company"
                  className="input"
                  value={form.company}
                  onChange={set("company")}
                  autoComplete="organization"
                />
              </div>
              <div className="field">
                <label htmlFor="c-phone">{t.phone}</label>
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
                <label htmlFor="c-topic">{t.topic}</label>
                <select
                  id="c-topic"
                  className="select"
                  value={form.topic}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, topic: Number(e.target.value) }))
                  }
                >
                  {t.topics.map((label, i) => (
                    <option key={label} value={i}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field field--full">
                <label htmlFor="c-message">{t.message}</label>
                <textarea
                  id="c-message"
                  className="textarea"
                  required
                  value={form.message}
                  onChange={set("message")}
                  placeholder={t.placeholder}
                />
              </div>
              <div className="field--full">
                <button type="submit" className="btn btn-primary">
                  {t.submit}
                </button>
              </div>
              <p className="form__note">{t.note(company.email)}</p>
            </form>
          </div>
        </div>
      </section>

      <iframe
        className="map-frame"
        title={t.mapTitle}
        src={mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </>
  );
}
