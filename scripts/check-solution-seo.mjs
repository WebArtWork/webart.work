import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(
	import.meta.dirname,
	'..',
	process.env.SEO_BUILD_PATH ?? 'dist/app/browser',
);
const routes =
	process.argv.length > 2
		? process.argv.slice(2).map((route) => route.replace(/^\//, ''))
		: ['website', 'app', 'unity', 'virtual-tour', 'blockchain'];
const origin = 'https://webart.work';
const output = process.env.SEO_REVIEW_OUTPUT;
if (output) fs.mkdirSync(output, { recursive: true });
const server = http.createServer((request, response) => {
	const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
	let file = path.resolve(root, '.' + pathname);
	if (!file.startsWith(root + path.sep) && file !== root) {
		response.writeHead(403).end();
		return;
	}
	if (fs.existsSync(file) && fs.statSync(file).isDirectory())
		file = path.join(file, 'index.html');
	if (!fs.existsSync(file)) {
		response.writeHead(404).end();
		return;
	}
	const types = {
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.css': 'text/css',
		'.json': 'application/json',
		'.jpg': 'image/jpeg',
		'.png': 'image/png',
		'.svg': 'image/svg+xml',
		'.webp': 'image/webp',
	};
	response.setHeader('Content-Type', types[path.extname(file)] ?? 'application/octet-stream');
	response.end(fs.readFileSync(file));
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:' + server.address().port;
let browser;
try {
	browser = await chromium.launch({ headless: true });
	const crawler = await browser.newContext({ javaScriptEnabled: false });
	for (const route of routes) {
		const page = await crawler.newPage();
		await page.goto(base + '/' + route);
		const head = await page.locator('head').innerHTML();
		const data = await page.locator('script[data-ld="page"]').textContent();
		const graph = JSON.parse(data)['@graph'];
		const webPage = graph.find((node) => ['WebPage', 'CollectionPage'].includes(node['@type']));
		const service = graph.find((node) => node['@id'] === webPage.mainEntity?.['@id']);
		const image = origin + '/seo/' + route + '.jpg';
		assert.equal(
			await page.locator('html').getAttribute('lang'),
			'en',
			route + ' prerender language',
		);
		assert.equal(
			await page.locator('link[rel="canonical"]').getAttribute('href'),
			origin + '/' + route,
		);
		assert.equal(
			await page.locator('meta[property="og:url"]').getAttribute('content'),
			origin + '/' + route,
		);
		for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
			assert.equal(await page.locator(selector).getAttribute('content'), image);
			assert.equal(await page.locator(selector).count(), 1);
		}
		assert.equal(
			await page.locator('meta[property="og:locale"]').getAttribute('content'),
			'en_US',
		);
		assert.equal(
			await page.locator('meta[property="og:image:width"]').getAttribute('content'),
			'1200',
		);
		assert.equal(
			await page.locator('meta[property="og:image:height"]').getAttribute('content'),
			'630',
		);
		assert.ok((await page.title()).length > 0);
		const description = await page.locator('meta[name="description"]').getAttribute('content');
		assert.ok(description.length > 60 && description.length <= 160);
		assert.equal(webPage.mainEntity['@id'], service['@id']);
		assert.equal(
			graph.find((node) => node['@id'] === service.image?.['@id'])?.contentUrl,
			image,
		);
		assert.equal(
			graph.find((node) => node['@id'] === webPage.primaryImageOfPage?.['@id'])?.contentUrl,
			image,
		);
		assert.equal(webPage.inLanguage, 'en');
		assert.equal(await page.locator('h1').count(), 1);
		assert.ok(!head.includes('noindex'));
		const response = await page.request.get(base + '/seo/' + route + '.jpg');
		assert.equal(response.status(), 200);
		const bytes = await response.body();
		assert.ok(bytes.length > 10000);
		await page.close();
	}
	await crawler.close();
	const states = [];
	for (const route of routes) {
		const context = await browser.newContext({
			locale: 'en-US',
			viewport: { width: 1440, height: 1000 },
		});
		await context.route('**/*', (request) =>
			request.request().url().startsWith(base) ? request.continue() : request.abort(),
		);
		const page = await context.newPage();
		await page.goto(base + '/' + route, { waitUntil: 'networkidle' });
		await page.waitForFunction(
			() => !!document.querySelector('app-root')?.getAttribute('ng-version'),
		);
		const brokenImages = await page
			.locator('img')
			.evaluateAll((images) =>
				images
					.filter((image) => image.complete && !image.naturalWidth)
					.map((image) => image.getAttribute('src')),
			);
		assert.deepEqual(brokenImages, [], route + ' broken images');
		await page.locator('button[aria-expanded]').click();
		await page.locator('.language-menu button').filter({ hasText: 'English' }).click();
		await page.waitForFunction(
			() =>
				document.documentElement.lang === 'en' &&
				document.querySelector('meta[property="og:locale"]')?.content === 'en_US',
		);
		await page.locator('button[aria-expanded]').click();
		await page.locator('.language-menu button').filter({ hasText: 'Українська' }).click();
		await page.waitForFunction(
			() => document.documentElement.lang === 'uk' && /[А-Яа-яІіЇїЄє]/.test(document.title),
		);
		const graph = await page
			.locator('script[data-ld="page"]')
			.evaluate((element) => JSON.parse(element.textContent)['@graph']);
		const webPage = graph.find((node) => ['WebPage', 'CollectionPage'].includes(node['@type']));
		const service = graph.find((node) => node['@id'] === webPage.mainEntity?.['@id']);
		const faq = graph.find((node) => node['@type'] === 'FAQPage');
		if (service['@type'] === 'Service') assert.match(service.name, /[А-Яа-яІіЇїЄє]/);
		assert.equal(webPage.inLanguage, 'uk');
		assert.equal(
			await page.locator('meta[property="og:locale"]').getAttribute('content'),
			'uk_UA',
		);
		assert.equal(await page.locator('script[data-ld="page"]').count(), 1);
		if (faq) {
			assert.equal(
				faq.mainEntity[0].name,
				await page
					.locator('details summary')
					.first()
					.textContent()
					.then((text) => text.trim()),
			);
			assert.equal(
				faq.mainEntity[0].acceptedAnswer.text,
				await page
					.locator('details p')
					.first()
					.textContent()
					.then((text) => text.trim()),
			);
		}
		for (const width of route === 'services' ? [390, 1440, 1728] : [1440]) {
			await page.setViewportSize({ width, height: 1000 });
			if (output)
				await page.screenshot({
					path: path.join(output, route + '-' + width + '.png'),
					fullPage: true,
				});
			if (route === 'services' && process.env.SEO_SPACING_CAPTURE) {
				const snapshot = await page.evaluate(
					fs.readFileSync(process.env.SEO_SPACING_CAPTURE, 'utf8'),
				);
				snapshot.name = 'Services hero ' + width;
				snapshot.elements = snapshot.elements.filter(
					(element) => element.rect.y < 600 && element.rect.y + element.rect.height < 720,
				);
				states.push(snapshot);
			}
		}
		await context.close();
	}
	if (output && states.length)
		fs.writeFileSync(path.join(output, 'spacing.json'), JSON.stringify(states));
	console.log(
		'PASS: Prerendered pages, share images, canonical URLs, main entities, and English/Ukrainian metadata and FAQs.',
	);
} finally {
	if (browser) await browser.close();
	await new Promise((resolve) => server.close(resolve));
}
