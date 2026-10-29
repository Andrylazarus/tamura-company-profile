# Tamura Trade Indonesia – company profile

Company profile and product catalogue for PT Tamura Trade Indonesia, built with
[Next.js](https://nextjs.org/) (pages router).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Deploys to Vercel with no extra settings.

## How the site is organised

| What | Where |
| --- | --- |
| Pages | `src/pages` – home, products, about, services, contact, 404 |
| Product detail pages | `src/pages/products/[brand]/details/[slug].js` – one template for every product |
| Product content | `src/data/products/<brand>/<slug>.json` |
| Catalogue (cards, categories, brands) | `src/data/catalog.js` |
| Address, phones, email | `src/data/company.js` |
| Header, footer, cards, assembly-line filter | `src/components/site` |
| Page sections | `src/components/Content` |
| All styling | `src/styles/site.css` |
| Images and fonts | `public/` |

### Add a product

1. Put a thumbnail in `public/images/catalog/` and the product photos in `public/images/products/<brand>/`.
2. Add an entry to `products` in `src/data/catalog.js` (pick its `category` and `section` from the `categories` list).
3. For a detail page, add `src/data/products/<brand>/<slug>.json` and set the entry's
   `href` to `/products/<brand>/details/<slug>`. Leave `href: null` and the card links
   to the contact form instead.

A detail file looks like this; `blocks` can contain `h3`, `p`, `list`, `img`, `table`,
`video` and `link` items.

```json
{
  "name": "Zenith",
  "type": "Automated Optical Inspection System",
  "image": "/images/products/kohyoung/aoi/AOI_Zenith_Product-Image-285x300.png",
  "tagline": "The industry's best selling 3D AOI",
  "intro": [{ "t": "p", "text": "Short introduction" }],
  "sections": [
    {
      "title": "Specifications",
      "blocks": [{ "t": "table", "rows": [["Group heading", ""], ["Size", "330 x 460 mm"]] }]
    }
  ]
}
```

## Design

- Colours: Tamura navy `#0c248c`, deep navy `#06175a`, signal red `#e82c35`, steel `#eef1f5`.
- Type: Big Shoulders for headings, Instrument Sans for text, both self-hosted from
  `public/fonts` (SIL Open Font License, licence files included).
- Product categories follow the usual PCB assembly grouping: Marking, Surface Mount
  Technology (SMT), Through-Hole Technology (THT), Conformal Coating and Others.
  They are defined in `categories` in `src/data/catalog.js`.

Brand names and logos belong to their manufacturers.
