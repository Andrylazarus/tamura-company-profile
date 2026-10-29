import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function SiteLayout({ children, header = "solid" }) {
  return (
    <>
      <SiteHeader variant={header} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
