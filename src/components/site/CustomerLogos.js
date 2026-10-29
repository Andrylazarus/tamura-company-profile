import { customers } from "@/data/customers";
import { asset } from "@/i18n";

/** Grid of customer logos, each tile captioned with the company name. */
export default function CustomerLogos() {
  return (
    <ul className="customer-grid">
      {customers.map((c) => (
        <li key={c.id} className="customer-tile">
          <div className="customer-tile__logo">
            <img
              src={asset(c.logo)}
              alt={c.name}
              width={c.width}
              height={c.height}
              loading="lazy"
            />
          </div>
          <span className="customer-tile__name">{c.name}</span>
        </li>
      ))}
    </ul>
  );
}
