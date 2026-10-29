// Company details shown in the header, footer, contact page and page metadata.
// Change them here once and every page picks them up.

export const company = {
  name: "PT Tamura Trade Indonesia",
  shortName: "Tamura Trade Indonesia",
  email: "sales@tamuratrade.com",
  phones: [
    { label: "Office", display: "+62 21 2230 5843", tel: "+622122305843" },
    { label: "Sales", display: "+62 813 1687 0626", tel: "+6281316870626" },
    { label: "Sales", display: "+62 812 8992 7484", tel: "+6281289927484" },
  ],
  address: {
    lines: [
      "Aerolink, Aeroworld Citra Garden 8",
      "Blok L3 No. 20, Pegadungan, Kalideres",
      "Jakarta Barat 11830, Indonesia",
    ],
    mapQuery:
      "Aeroworld Citra Garden 8, Pegadungan, Kalideres, Jakarta Barat 11830",
  },
};

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.address.mapQuery,
)}`;

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  company.address.mapQuery,
)}&output=embed`;
