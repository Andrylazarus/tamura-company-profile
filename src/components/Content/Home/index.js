import Link from "next/link";
import AssemblyLine from "@/components/site/AssemblyLine";
import ProductCard from "@/components/site/ProductCard";
import { brands, categories, products, featuredIds } from "@/data/catalog";
import { company } from "@/data/company";
import { tr, useLang } from "@/i18n";

const T = {
  en: {
    heroTitle: "Equipment and support for PCB assembly lines",
    heroLead: (n) =>
      `We supply inspection, soldering, coating and test machines from ${n} manufacturers to electronics factories in Indonesia, and keep them running with local engineers and spare parts.`,
    browse: (n) => `Browse ${n} products`,
    talk: "Talk to our sales team",
    lineTitle: "Browse products by process",
    lineHint: "Choose a category to see its machines",
    aboutTitle: "A trading partner for electronics manufacturers",
    aboutLead: `${company.name} is an industrial supplier and general trading company serving manufacturing industries.`,
    aboutText:
      "We help customers choose the right machine for their boards and volumes, install it, and support it for the years it runs. That combination has cut costs and raised quality on many of our customers' lines.",
    facts: (b, p, c) => [
      [String(b), "Equipment manufacturers represented"],
      [String(p), `Machine models across ${c} product categories`],
      ["Jakarta", "Local sales, service and spare-parts team"],
      [
        "One stop",
        "Supply, installation, spare parts and sourcing from one supplier",
      ],
    ],
    moreAbout: "More about the company",
    featured: "Featured equipment",
    featuredLead: "A few of the machines customers ask us about most.",
    seeAll: "See all products",
    brandsTitle: "Manufacturers we represent",
    brandsLead:
      "Each brand covers a part of the line, so one supplier can equip all of it.",
    supportAlt: "Technician placing a component on a circuit board",
    supportTitle: "Support after installation",
    supportLead:
      "A machine is only useful while it runs. Our service team stays with it.",
    services: [
      [
        "Technical support",
        "Engineers in Jakarta who troubleshoot, calibrate and keep your machines in production.",
      ],
      [
        "Spare parts",
        "Parts held in stock for the machines we supply, with warranty on most of them.",
      ],
      [
        "Used machines",
        "Checked second-hand equipment and trade-ins when you upgrade a line.",
      ],
      [
        "Sourcing",
        "We find replacement parts or alternative suppliers through our network.",
      ],
    ],
    howServices: "How our services work",
    ctaTitle: "Planning a new line or upgrading one?",
    ctaText:
      "Tell us about your boards, volumes and process. We will recommend equipment and arrange a demonstration.",
    quote: "Request a quote",
    call: "Call",
  },
  ja: {
    heroTitle: "PCB実装ラインのための装置とサポート",
    heroLead: (n) =>
      `${n}社のメーカーの検査装置、はんだ付け装置、コーティング装置、テスト装置をインドネシアの電子機器工場にお届けし、現地のエンジニアとスペアパーツで稼働を支えます。`,
    browse: (n) => `${n}機種の製品を見る`,
    talk: "営業担当に相談する",
    lineTitle: "工程から製品を探す",
    lineHint: "分野を選ぶと該当する装置が表示されます",
    aboutTitle: "電子機器メーカーのための商社パートナー",
    aboutLead: `${company.name}は、製造業向けの産業機器サプライヤー兼総合商社です。`,
    aboutText:
      "基板や生産量に合った装置選びから据付、そして長年にわたる稼働のサポートまでお手伝いします。その結果、多くのお客様のラインでコスト削減と品質向上を実現してきました。",
    facts: (b, p, c) => [
      [`${b}社`, "取り扱いメーカー"],
      [`${p}機種`, `${c}つの製品分野の装置`],
      ["ジャカルタ", "現地の営業・サービス・スペアパーツ体制"],
      ["ワンストップ", "装置の供給、据付、スペアパーツ、調達をまとめて対応"],
    ],
    moreAbout: "会社概要を見る",
    featured: "おすすめの装置",
    featuredLead: "お問い合わせの多い装置をご紹介します。",
    seeAll: "すべての製品を見る",
    brandsTitle: "取り扱いメーカー",
    brandsLead:
      "各メーカーがラインの各工程をカバーしているため、ライン全体を一社でそろえられます。",
    supportAlt: "基板に部品を実装する技術者",
    supportTitle: "導入後のサポート",
    supportLead:
      "装置は稼働してこそ価値があります。私たちのサービスチームが寄り添い続けます。",
    services: [
      [
        "技術サポート",
        "ジャカルタのエンジニアがトラブル対応や調整を行い、装置の稼働を維持します。",
      ],
      [
        "スペアパーツ",
        "納入装置の部品を在庫し、多くの部品に保証を付けています。",
      ],
      [
        "中古装置",
        "点検済みの中古装置の販売や、ライン更新時の下取りに対応します。",
      ],
      ["調達", "ネットワークを活かして交換部品や代替サプライヤーを探します。"],
    ],
    howServices: "サービス内容を見る",
    ctaTitle: "新しいラインの立ち上げや更新をご検討ですか？",
    ctaText:
      "基板、生産量、工程についてお聞かせください。最適な装置のご提案とデモンストレーションを手配します。",
    quote: "お見積り依頼",
    call: "電話する",
  },
};

export default function HomeContent() {
  const lang = useLang();
  const t = T[lang];
  const featured = featuredIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <>
      <section className="hero">
        <img className="hero__photo" src="/images/web/pcb-dark.jpg" alt="" />
        <div className="container hero__content">
          <p className="hero__company">{company.name}</p>
          <h1 className="display">{t.heroTitle}</h1>
          <p className="hero__lead">{t.heroLead(brands.length)}</p>
          <div className="btn-row">
            <Link href="/products" className="btn btn-light">
              {t.browse(products.length)}
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              {t.talk}
            </Link>
          </div>
        </div>
      </section>

      <div className="line-plate">
        <div className="container">
          <AssemblyLine title={t.lineTitle} hint={t.lineHint} />
        </div>
      </div>

      <section className="section">
        <div className="container split">
          <div className="sticky-head">
            <h2 className="h2">{t.aboutTitle}</h2>
          </div>
          <div>
            <div className="prose">
              <p className="lead" style={{ color: "var(--ink)" }}>
                {t.aboutLead}
              </p>
              <p className="muted">{t.aboutText}</p>
            </div>
            <dl className="facts" style={{ marginTop: 36 }}>
              {t
                .facts(brands.length, products.length, categories.length)
                .map(([dt, dd]) => (
                  <div key={dd}>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                  </div>
                ))}
            </dl>
            <p style={{ marginTop: 28 }}>
              <Link href="/about" className="text-link">
                {t.moreAbout}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--steel">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="h2">{t.featured}</h2>
              <p className="lead">{t.featuredLead}</p>
            </div>
            <Link
              href="/products"
              className="btn btn-outline section-head__aside"
            >
              {t.seeAll}
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
              <h2 className="h2">{t.brandsTitle}</h2>
              <p className="lead">{t.brandsLead}</p>
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

      <section className="section section--steel">
        <div className="container split">
          <div>
            <img
              className="photo photo--tall"
              src="/images/web/pcb-tweezers.jpg"
              alt={t.supportAlt}
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="h2">{t.supportTitle}</h2>
            <p className="lead" style={{ margin: "14px 0 32px" }}>
              {t.supportLead}
            </p>
            <ul className="service-list">
              {t.services.map(([title, text]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 28 }}>
              <Link href="/services" className="text-link">
                {t.howServices}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2 className="h2">{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-light">
              {t.quote}
            </Link>
            <a
              href={`tel:${company.phones[0].tel}`}
              className="btn btn-ghost-light"
            >
              {t.call} {company.phones[0].display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
