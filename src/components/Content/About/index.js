import Link from "next/link";
import PageHead from "@/components/site/PageHead";
import { brands } from "@/data/catalog";
import { company } from "@/data/company";
import { tr, useLang } from "@/i18n";

const T = {
  en: {
    title: "About us",
    lead: "A trusted industrial supplier and general trading company for manufacturing industries in Indonesia.",
    heading: "Quality products, backed by people who stay",
    intro: `${company.name} supplies electronics manufacturers with production equipment and the service to keep it running.`,
    p1: "We are confident in providing the best service to our customers through high-quality products and dedicated support. Over the years we have contributed to cost reduction and quality improvement on many production lines.",
    p2: "Blue-chip companies are among our customers, and we are proud of the reputation we have earned with them for quality products, excellent service and competitive prices.",
    customers: "Selected customers",
    lineupAlt:
      "Inspection, test and coating machines from PTI, Koh Young, Maker-Ray and Anda",
    caption:
      "A selection of the inspection, test and coating equipment we supply.",
    statements: [
      [
        "Vision",
        "To earn recognition as the brand you can trust, by continuing to provide a complete range of high-quality products that meet our customers' needs.",
      ],
      [
        "Mission",
        "To serve Indonesia's manufacturing community with innovative, high-quality products through a one-stop supplier service.",
      ],
      [
        "Commitment",
        "Excellent product quality, competitive pricing and after-sales service, with quick delivery and continuous improvement. Satisfied customers are our greatest asset.",
      ],
    ],
    partners: "Our partners",
    partnersLead: "We work in partnership with these equipment manufacturers.",
    browse: "Browse their products",
  },
  ja: {
    title: "会社概要",
    lead: "インドネシアの製造業を支える、信頼の産業機器サプライヤー兼総合商社です。",
    heading: "確かな製品と、寄り添い続ける人材",
    intro: `${company.name}は、電子機器メーカーに生産設備と、その稼働を支えるサービスを提供しています。`,
    p1: "高品質な製品と誠実なサポートを通じて、お客様に最高のサービスをお届けします。これまで多くの生産ラインで、コスト削減と品質向上に貢献してきました。",
    p2: "一流企業の皆様にもご愛顧いただいており、高品質な製品、優れたサービス、競争力のある価格で得た信頼を誇りに思っています。",
    customers: "主なお客様",
    lineupAlt:
      "PTI、Koh Young、Maker-Ray、Anda の検査・テスト・コーティング装置",
    caption: "当社が取り扱う検査装置、テスト装置、コーティング装置の一例です。",
    statements: [
      [
        "ビジョン",
        "お客様のニーズに応える高品質な製品を幅広く提供し続け、「信頼できるブランド」として認められることを目指します。",
      ],
      [
        "ミッション",
        "ワンストップのサプライヤーとして、革新的で高品質な製品をインドネシアの製造業に提供します。",
      ],
      [
        "私たちの約束",
        "優れた製品品質、競争力のある価格、充実したアフターサービス。迅速な納品と継続的な改善に取り組みます。お客様の満足こそが私たちの最大の財産です。",
      ],
    ],
    partners: "取り扱いメーカー",
    partnersLead: "以下の装置メーカーと協力しています。",
    browse: "製品を見る",
  },
};

export default function About() {
  const lang = useLang();
  const t = T[lang];
  return (
    <>
      <PageHead
        title={t.title}
        lead={t.lead}
        photo="/images/web/head-about.jpg"
      />

      <section className="section">
        <div className="container split">
          <div>
            <h2 className="h2">{t.heading}</h2>
          </div>
          <div className="prose">
            <p className="lead" style={{ color: "var(--ink)" }}>
              {t.intro}
            </p>
            <p className="muted">{t.p1}</p>
            <p className="muted">{t.p2}</p>
            <ul className="customer-list" aria-label={t.customers}>
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
              src="/images/web/lineup-wide.jpg"
              alt={t.lineupAlt}
              loading="lazy"
              style={{ aspectRatio: "12 / 5" }}
            />
            <figcaption className="photo-caption">{t.caption}</figcaption>
          </figure>

          <div className="statements" style={{ marginTop: 64 }}>
            {t.statements.map(([h, p]) => (
              <div key={h} className="statement">
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">{t.partners}</h2>
              <p className="lead">{t.partnersLead}</p>
            </div>
            <Link
              href="/products"
              className="btn btn-outline section-head__aside"
            >
              {t.browse}
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
                  {b.logo ? (
                    <img src={b.logo} alt={b.name} loading="lazy" />
                  ) : (
                    <span className="brand-tile__wordmark">{b.name}</span>
                  )}
                </div>
                <div>
                  <div className="brand-tile__name">{b.name}</div>
                  <div className="brand-tile__focus">
                    {tr(b, "focus", lang)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
