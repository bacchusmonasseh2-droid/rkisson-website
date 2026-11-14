# R. Kissoon Contracting Service — corporate website

A fast, static corporate website built with [Astro](https://astro.build). No database, no paid services. Deploys to Netlify's free tier.

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321. To produce and check the production build:

```bash
npm run build
```

```bash
npm run preview
```

## Project structure

```
src/
  data/
    company.ts      Name, address, phones, email, WhatsApp, map, social links, site URL
    services.ts     The six services and all their page content
    projects.ts     Project portfolio (status, client, location, source, photo)
    equipment.ts    Equipment rental catalogue (empty until verified)
  components/       Header, Footer, Logo, PageHero, ServiceCard, ProjectCard, QuoteForm, CTA, Picture
  layouts/Base.astro  Page shell: SEO tags, structured data, fonts
  pages/            index, about, services/, projects, equipment-rental, contact, privacy, thank-you, 404
  styles/global.css Design system (colours, type, components)
  assets/img/       Illustrative imagery (web masters)
  assets/projects/  Genuine project photographs go here
  assets/equipment/ Genuine equipment photographs go here
public/             favicon, robots.txt, social sharing image
scripts/            Image optimiser and QA test script
docs/               Research report, portfolio, confirmation list, asset list, visual plan, promo concepts
netlify.toml        Build settings, security headers, caching
```

## Common updates

| To change | Edit |
| --- | --- |
| Address, phones, email | `src/data/company.ts` |
| Turn on the WhatsApp link | Set `whatsapp` in `company.ts` (only once the number is confirmed) |
| Turn on the Google map | Set `mapEmbedUrl` in `company.ts` (Google Maps → Share → Embed a map → copy the `src` URL) |
| Add social links | Set `social` in `company.ts` |
| Service wording | `src/data/services.ts` |
| Add or update a project | `src/data/projects.ts` (instructions at the top of the file) |
| Mark a project completed | Change its `status` to `'completed'` |
| Add a project photo | Put the file in `src/assets/projects/`, set `photo: 'file-name.jpg'` on the project |
| Show contract values | Set `showValues = true` in `projects.ts` |
| List rental equipment | Add entries in `src/data/equipment.ts`; photos in `src/assets/equipment/` |
| Replace the logo | `src/components/Logo.astro` and `public/favicon.svg` |
| Colours and fonts | Variables at the top of `src/styles/global.css` |

### Images

Illustrative images were generated with Higgsfield and are labelled as illustrative on the site. To add or replace one, put the full-size original in `raw-assets/` and run:

```bash
pip install pillow opencv-python-headless numpy
```

```bash
npm run images
```

This writes optimised masters to `src/assets/img/`; Astro creates responsive AVIF/WebP versions at build time. Use genuine photographs only for projects and equipment.

## Deploying to Netlify

1. Push this folder to a GitHub repository.
2. In Netlify: **Add new site → Import an existing project**, choose the repository. Build command `npm run build` and publish directory `dist` are read from `netlify.toml`.
3. Deploy.
4. Set the real address: change `site` in `astro.config.mjs`, `siteUrl` in `src/data/company.ts` and the `Sitemap:` line in `public/robots.txt`, then redeploy.
5. Custom domain: **Domain management → Add a domain**, then follow Netlify's DNS instructions. HTTPS is issued automatically.

Nothing has been purchased, subscribed to or published as part of this build.

## Form handling

The quotation form uses **Netlify Forms** (free tier: 100 submissions and 10 MB of uploads per month at the time of writing).

1. After the first deploy, open **Forms** in the Netlify site dashboard and click **Enable form detection**, then redeploy. A form named `quotation-request` appears.
2. Under **Forms → Form notifications**, add an **Email notification** to the address that should receive enquiries.
3. Send a test enquiry from the live site, with an attachment, and confirm it arrives.

How it behaves:
- Fields are validated in the browser (required fields, email format, file type, 8 MB limit) with accessible error messages.
- A hidden honeypot field filters bots. Netlify also applies its own spam filtering. No cookies are used.
- On success the visitor is sent to `/thank-you/`. If sending fails, a message with the company email is shown.
- The form does not submit on a local preview, because the Netlify endpoint only exists on the deployed site.

To use a different host or service (for example Formspree or a serverless function), change the `fetch('/')` target and the form attributes in `src/components/QuoteForm.astro`.

## Quality checks

With the preview server running (`npm run preview`), in a second terminal:

```bash
node scripts/qa.mjs ./qa-screenshots
```

It loads every page at desktop, tablet and mobile widths and checks status codes, console errors, broken images, horizontal overflow, headings, meta tags, internal links, the mobile menu, project filters and the form (validation, successful post, failure message). It needs Playwright (`npm i -D playwright && npx playwright install chromium`).

## Before launch

Work through `docs/information-to-confirm.md` with the company, replace the stand-in wordmark with the official logo, and add genuine project photographs (`docs/assets-to-request.md`).

## Accessibility, SEO, privacy

- Semantic landmarks, skip link, visible focus states, labelled form fields, reduced-motion support, keyboard-operable menu and filters.
- Unique title and description per page, canonical URLs, Open Graph tags, `GeneralContractor` and `Service` structured data, XML sitemap, robots.txt.
- Self-hosted fonts, no analytics or third-party scripts, so no cookie banner is required. If analytics are added later, add consent handling and update `src/pages/privacy.astro`.
- Security headers, including a Content-Security-Policy, are set in `netlify.toml`.
