import Link from "next/link";
import { useLang } from "@/i18n";

/** Navy page header used by the inner pages. */
export default function PageHead({ title, lead, photo, crumb, children }) {
  const lang = useLang();
  return (
    <section className="page-head">
      {photo && <img className="page-head__photo" src={photo} alt="" />}
      <div className="container page-head__inner">
        <ol className="crumbs">
          <li>
            <Link href="/">{lang === "ja" ? "ホーム" : "Home"}</Link>
          </li>
          <li aria-current="page">{crumb || title}</li>
        </ol>
        <h1 className="h1">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
