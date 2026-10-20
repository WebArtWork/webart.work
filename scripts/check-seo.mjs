import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const browser = path.join(root, 'dist/app/browser');
const origin = 'https://webart.work';
const sitemap = fs.readFileSync(path.join(root, 'src/assets/sitemap.xml'), 'utf8');
const manifest = JSON.parse(
	fs.readFileSync(path.join(root, 'src/assets/seo/manifest.json'), 'utf8'),
);
const cards = new Map(manifest.map((card) => [card.route, card]));
const titles = new Set();
const descriptions = new Set();
let checked = 0;

const decode = (value) =>
	value
		.replaceAll('&amp;', '&')
		.replaceAll('&quot;', '"')
		.replaceAll('&#39;', "'")
		.replaceAll('&lt;', '<')
		.replaceAll('&gt;', '>');
const attributes = (tag) =>
	Object.fromEntries(
		[...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, decode(value)]),
	);
function walk(directory) {
	return fs
		.readdirSync(directory, { withFileTypes: true })
		.flatMap((entry) =>
			entry.isDirectory()
				? walk(path.join(directory, entry.name))
				: [path.join(directory, entry.name)],
		);
}
function dimensions(file) {
	const data = fs.readFileSync(file);
	assert.equal(data.readUInt16BE(0), 0xffd8, `Not a JPEG: ${file}`);
	let offset = 2;
	while (offset < data.length) {
		assert.equal(data[offset], 0xff, `Invalid JPEG marker: ${file}`);
		const marker = data[offset + 1];
		if ([0xc0, 0xc1, 0xc2].includes(marker)) {
			return [data.readUInt16BE(offset + 7), data.readUInt16BE(offset + 5)];
		}
		offset += 2 + data.readUInt16BE(offset + 2);
	}
	throw new Error(`JPEG dimensions not found: ${file}`);
}
for (const card of manifest) {
	assert.deepEqual(
		dimensions(path.join(root, 'src/assets', card.imagePath)),
		[1200, 630],
		card.route,
	);
}

for (const file of walk(browser).filter((file) => file.endsWith(`${path.sep}index.html`))) {
	const relative = path.relative(browser, file).replaceAll('\\', '/');
	if (relative.startsWith('intern/')) continue;
	const html = fs.readFileSync(file, 'utf8');
	if (/<meta[^>]+http-equiv="refresh"/i.test(html)) continue;
	const route = `/${relative.replace(/\/?index.html$/, '')}`;
	const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
	const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
	const meta = (key) => {
		const matches = tags.filter((tag) => (tag.name ?? tag.property) === key);
		assert.equal(matches.length, 1, `${route}: ${key} count`);
		assert.ok(matches[0].content, `${route}: empty ${key}`);
		return matches[0].content;
	};
	assert.ok(title, `${route}: missing title`);
	assert.ok(!titles.has(title), `${route}: duplicate title`);
	titles.add(title);
	const description = meta('description');
	assert.ok(!descriptions.has(description), `${route}: duplicate description`);
	assert.ok(description.length <= 160, `${route}: description too long`);
	descriptions.add(description);
	assert.equal(meta('og:title'), title, `${route}: Open Graph title`);
	assert.equal(meta('twitter:title'), title, `${route}: Twitter title`);
	assert.equal(meta('og:description'), description, `${route}: Open Graph description`);
	assert.equal(meta('twitter:description'), description, `${route}: Twitter description`);
	assert.equal(meta('og:url'), origin + route, `${route}: Open Graph URL`);
	assert.equal(meta('twitter:card'), 'summary_large_image', `${route}: Twitter card`);
	assert.equal(meta('robots'), 'index, follow', `${route}: robots`);
	const card = cards.get(route);
	assert.ok(card, `${route}: missing card manifest entry`);
	const image = origin + card.imagePath;
	for (const key of ['og:image', 'twitter:image', 'twitter:image:src']) {
		assert.equal(meta(key), image, `${route}: ${key}`);
	}
	assert.equal(meta('og:image:width'), '1200', `${route}: image width`);
	assert.equal(meta('og:image:height'), '630', `${route}: image height`);
	assert.equal(meta('og:image:type'), 'image/jpeg', `${route}: image type`);
	assert.equal(meta('twitter:image:alt'), meta('og:image:alt'), `${route}: image alt`);
	const canonical = [...html.matchAll(/<link\b[^>]*>/g)]
		.map(([tag]) => attributes(tag))
		.filter((tag) => tag.rel === 'canonical');
	assert.equal(canonical.length, 1, `${route}: canonical count`);
	assert.equal(canonical[0].href, origin + route, `${route}: canonical URL`);
	assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: H1 count`);
	const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(
		([, attrs]) => attributes(attrs).type === 'application/ld+json',
	);
	assert.equal(scripts.length, 1, `${route}: JSON-LD script count`);
	const graph = JSON.parse(scripts[0][2])['@graph'];
	const page = graph.find((node) => node['@id'] === origin + route + '#webpage');
	assert.ok(page, `${route}: missing WebPage schema`);
	assert.equal(page.url, origin + route, `${route}: schema URL`);
	assert.equal(page.description, description, `${route}: schema description`);
	const primaryImage = graph.find((node) => node['@id'] === page.primaryImageOfPage?.['@id']);
	assert.equal(primaryImage?.contentUrl, image, `${route}: schema image`);
	if (page.mainEntity) {
		const entity = graph.find((node) => node['@id'] === page.mainEntity['@id']);
		assert.ok(entity, `${route}: missing main entity`);
		assert.equal(
			entity.mainEntityOfPage?.['@id'],
			page['@id'],
			`${route}: main entity backlink`,
		);
	}
	assert.ok(sitemap.includes(`<loc>${origin + route}</loc>`), `${route}: missing from sitemap`);
	assert.ok(
		sitemap.includes(`<image:loc>${image}</image:loc>`),
		`${route}: missing sitemap image`,
	);
	checked++;
}
assert.ok(checked > 0, 'No prerendered pages checked; run npm run build first');
console.log(
	`SEO checks passed for ${checked} pages and ${manifest.length} share cards (intern pages excluded).`,
);
