import Link from "next/link";
import PageHead from "@/components/site/PageHead";
import { useLang } from "@/i18n";

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

// Japanese copy for each service, keyed by id.
const JA = {
  "technical-support": {
    title: "技術サポート",
    alt: "マーキング装置内で基板パネルを検査するコードリーダー",
    text: "当社は製品に自信を持っていますが、万一に備えて強力な技術チームを擁しています。納入装置のトラブル対応はエンジニアがお手伝いし、東南アジアに拠点があるため遠方のサプライヤーより迅速に対応できます。",
    points: [
      "納入装置のトラブルシューティング",
      "ジャカルタのチームによる迅速な対応",
      "据付後も続くサポート",
    ],
  },
  "spare-parts": {
    title: "スペアパーツ",
    alt: "基板マーキング装置内部のレーザーユニット",
    text: "ラインの停止時間はスペアパーツで決まります。幅広い部品を在庫し、多くの装置部品に保証を付け、お客様のチームと協力して装置を最高の状態に保ちます。",
    points: [
      "幅広い部品をすぐにご用意",
      "多くの装置部品に保証付き",
      "部品故障時は技術チームがサポート",
    ],
  },
  "used-machines": {
    title: "新品・中古装置",
    alt: "PTI、Maker-Ray、Koh Young の検査装置",
    text: "新規事業の立ち上げでも既存設備の更新でも、ご予算とご要望に合った装置をお探しします。新品・中古ともに競争力のある価格でご提供します。",
    points: [
      "新品・中古装置を競争力のある価格で",
      "設備更新時の下取りに対応",
      "生産量とご予算に合わせたご提案",
    ],
  },
  sourcing: {
    title: "調達",
    alt: "当社が取引する装置メーカーのロゴ",
    text: "交換部品や代替サプライヤーが必要な場合は、ワンストップサービスの一環として、当社のネットワークを活かして最適な調達先をお探しします。",
    points: [
      "当社取扱品以外の交換部品も対応",
      "代替サプライヤーのご提案",
      "ライン全体の窓口を一本化",
    ],
  },
  networking: {
    title: "ビジネスネットワーク",
    alt: "展示会でのタムラのチーム",
    text: "お客様とパートナーをおつなぎします。ご紹介や推薦を通じて商機を広げ、信頼を築き、適切な人材とリソースを結び付けます。",
    points: [
      "パートナーやサプライヤーのご紹介",
      "ネットワーク内での推薦",
      "信頼に基づく長期的な関係",
    ],
  },
};

const T = {
  en: {
    title: "Services",
    lead: "Everything that keeps your equipment productive after it arrives: support, spare parts, machines and sourcing.",
    ctaTitle: "Need help with a machine?",
    ctaText:
      "Tell us the model and what is happening. Our technical team will get back to you.",
    cta: "Contact support",
  },
  ja: {
    title: "サービス",
    lead: "納入後も装置の生産性を保つために。技術サポート、スペアパーツ、装置、調達までお任せください。",
    ctaTitle: "装置についてお困りですか？",
    ctaText: "型番と状況をお知らせください。技術チームからご連絡します。",
    cta: "サポートに問い合わせる",
  },
};

export default function Services() {
  const lang = useLang();
  const t = T[lang];
  const list = services.map((s) => (lang === "ja" ? { ...s, ...JA[s.id] } : s));
  return (
    <>
      <PageHead
        title={t.title}
        lead={t.lead}
        photo="/images/web/head-services.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="service-rows">
            {list.map((s) => (
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
            <h2 className="h2">{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-light">
              {t.cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
