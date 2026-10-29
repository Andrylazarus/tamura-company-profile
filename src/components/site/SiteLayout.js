import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import useReveal from "./useReveal";

export default function SiteLayout({ children, header = "solid" }) {
  useReveal();
  return (
    <>
      <SiteHeader variant={header} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
