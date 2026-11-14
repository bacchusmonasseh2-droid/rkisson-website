// Quality-control checks against the built site.
// Usage:  npm run build && npx astro preview --port 4321 &   then   node scripts/qa.mjs [screenshot-dir]
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

// Use a local Playwright if installed, otherwise a globally installed one.
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  const globalRoot = execSync('npm root -g').toString().trim();
  ({ chromium } = require(`${globalRoot}/playwright`));
}
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const shots = process.argv[2];
if (shots) mkdirSync(shots, { recursive: true });

const pages = [
  '/',
  '/about/',
  '/services/',
  '/services/water-infrastructure/',
  '/services/civil-engineering-infrastructure/',
  '/services/building-construction/',
  '/services/sea-defence-coastal-protection/',
  '/services/drainage-irrigation/',
  '/projects/',
  '/equipment-rental/',
  '/contact/',
  '/privacy/',
  '/thank-you/',
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];

const problems = [];
const note = (msg) => {
  problems.push(msg);
  console.log('  ✗', msg);
};

const browser = await chromium.launch();
const links = new Set();

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on('console', (m) => m.type() === 'error' && note(`[${vp.name}] console error on ${page.url()}: ${m.text()}`));
  page.on('pageerror', (e) => note(`[${vp.name}] page error on ${page.url()}: ${e.message}`));
  page.on('response', (r) => r.status() >= 400 && note(`[${vp.name}] ${r.status()} ${r.url()}`));

  for (const path of pages) {
    const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    if (!res || res.status() !== 200) note(`[${vp.name}] ${path} returned ${res?.status()}`);

    // Scroll through so lazy images load and reveal animations fire.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += Math.round(window.innerHeight * 0.6)) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(700);

    const report = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      description: document.querySelector('meta[name=description]')?.getAttribute('content') ?? '',
      brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc),
      missingAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
      hidden: [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity === '0').length,
      links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    }));
    if (report.overflow > 0) note(`[${vp.name}] ${path} overflows horizontally by ${report.overflow}px`);
    if (report.h1 !== 1) note(`[${vp.name}] ${path} has ${report.h1} h1 elements`);
    if (report.brokenImages.length) note(`[${vp.name}] ${path} broken images: ${report.brokenImages.join(', ')}`);
    if (report.missingAlt) note(`[${vp.name}] ${path} has ${report.missingAlt} images without alt`);
    if (report.hidden) note(`[${vp.name}] ${path} has ${report.hidden} reveal elements still hidden`);
    if (vp.name === 'desktop') {
      if (report.title.length > 65) note(`${path} title is ${report.title.length} chars`);
      if (report.description.length < 70 || report.description.length > 165)
        note(`${path} description is ${report.description.length} chars`);
      report.links.forEach((l) => links.add(l));
    }
    if (shots) {
      const file = `${shots}/${vp.name}${path.replace(/\//g, '_')}.jpg`;
      await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 70 });
    }
  }

  // Mobile navigation
  if (vp.name === 'mobile') {
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.click('.nav-toggle');
    await page.waitForTimeout(400);
    if (!(await page.isVisible('#site-nav .nav__link >> nth=2'))) note('mobile menu did not open');
    if (shots) await page.screenshot({ path: `${shots}/mobile_menu.jpg`, type: 'jpeg', quality: 70 });
    await page.click('#site-nav a[href="/projects/"]');
    await page.waitForURL('**/projects/');
  }
  await context.close();
}

// Internal links resolve
const ctx = await browser.newContext();
for (const href of [...links].filter((l) => l.startsWith('/'))) {
  const res = await ctx.request.get(BASE + href.split('#')[0]);
  if (res.status() !== 200) note(`internal link ${href} → ${res.status()}`);
}
console.log(`Checked ${[...links].filter((l) => l.startsWith('/')).length} internal links`);
const tel = [...links].filter((l) => l.startsWith('tel:'));
const mail = [...links].filter((l) => l.startsWith('mailto:'));
console.log(`tel links: ${new Set(tel).size}, mailto links: ${new Set(mail).size}`);

// Project filters
{
  const page = await ctx.newPage();
  await page.goto(BASE + '/projects/', { waitUntil: 'networkidle' });
  const total = await page.locator('#project-grid .project-card').count();
  for (const f of ['water', 'roads', 'bridges', 'drainage', 'building', 'coastal', 'all']) {
    await page.click(`.filter[data-filter="${f}"]`);
    const visible = await page.locator('#project-grid .project-card:visible').count();
    const emptyShown = await page.isVisible('#empty-note');
    console.log(`filter ${f}: ${visible}/${total}${emptyShown ? ' (empty note shown)' : ''}`);
    if (visible === 0 && !emptyShown) note(`filter ${f} shows nothing and no empty note`);
  }
}

// Contact form validation and submission
{
  const page = await ctx.newPage();
  await page.goto(BASE + '/contact/?service=water-infrastructure#quote', { waitUntil: 'networkidle' });
  if ((await page.inputValue('#f-type')) !== 'water-infrastructure') note('project type was not pre-selected from URL');

  await page.click('#form-submit');
  const errors = await page.locator('.field__error:not(:empty)').count();
  console.log(`empty submit → ${errors} field errors`);
  if (errors < 5) note('expected validation errors on empty submit');
  if ((await page.evaluate(() => document.activeElement?.id)) !== 'f-name') note('focus did not move to first invalid field');

  await page.fill('#f-name', 'Test Person');
  await page.fill('#f-phone', '+592 600 0000');
  await page.fill('#f-email', 'not-an-email');
  await page.fill('#f-location', 'Test Village, Region 9');
  await page.fill('#f-desc', 'A new potable water well and distribution network.');
  await page.click('#form-submit');
  const emailError = await page.textContent('#e-email');
  if (!emailError) note('invalid email was accepted');

  await page.setInputFiles('#f-file', { name: 'big.pdf', mimeType: 'application/pdf', buffer: Buffer.alloc(9 * 1024 * 1024) });
  if (!(await page.textContent('#e-file'))?.includes('8 MB')) note('oversized file was accepted');
  await page.setInputFiles('#f-file', { name: 'run.exe', mimeType: 'application/octet-stream', buffer: Buffer.alloc(10) });
  if (!(await page.textContent('#e-file'))?.includes('not accepted')) note('disallowed file type was accepted');
  await page.setInputFiles('#f-file', { name: 'boq.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4') });

  // Simulate the Netlify Forms endpoint to confirm what is sent and the redirect.
  let posted = null;
  await page.route('**/', async (route) => {
    if (route.request().method() === 'POST') {
      posted = route.request().postData() ?? '';
      return route.fulfill({ status: 200, body: 'ok' });
    }
    return route.continue();
  });
  await page.fill('#f-email', 'test@example.com');
  await page.click('#form-submit');
  await page.waitForURL('**/thank-you/', { timeout: 5000 }).catch(() => note('form did not redirect to thank-you'));
  const fields = ['form-name', 'name', 'organisation', 'telephone', 'email', 'project-type', 'project-location', 'description', 'attachment'];
  const missing = fields.filter((f) => !posted?.includes(`name="${f}"`));
  console.log(`valid submit → posted ${fields.length - missing.length}/${fields.length} fields, redirected to ${page.url()}`);
  if (missing.length) note(`form post missing fields: ${missing.join(', ')}`);

  // Failure path: endpoint unavailable → friendly error with email fallback.
  const page2 = await ctx.newPage();
  await page2.goto(BASE + '/contact/', { waitUntil: 'networkidle' });
  await page2.route('**/', (route) => (route.request().method() === 'POST' ? route.fulfill({ status: 500 }) : route.continue()));
  await page2.fill('#f-name', 'Test Person');
  await page2.fill('#f-phone', '+592 600 0000');
  await page2.fill('#f-email', 'test@example.com');
  await page2.selectOption('#f-type', 'other');
  await page2.fill('#f-location', 'Georgetown');
  await page2.fill('#f-desc', 'Rehabilitation of an existing office building.');
  await page2.click('#form-submit');
  await page2.waitForSelector('#form-alert:not([hidden])', { timeout: 5000 }).catch(() => note('no error shown when submission fails'));
  console.log('failed submit → error alert shown:', await page2.isVisible('#form-alert'));
}

// 404
{
  const res = await ctx.request.get(BASE + '/no-such-page/');
  console.log('unknown URL status:', res.status());
}

await browser.close();
console.log(problems.length ? `\n${problems.length} problem(s) found` : '\nAll checks passed');
process.exit(problems.length ? 1 : 0);
