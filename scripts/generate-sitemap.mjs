import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');

// Builds src/assets/sitemap.xml from the same data the prerender uses, so new
// services, startups, partners and interns are never missing. Existing lastmod
// dates are kept; new URLs get today's date.
const root = path.resolve(import.meta.dirname, '..');
const origin = 'https://webart.work';
const sitemapPath = path.join(root, 'src/assets/sitemap.xml');
const manifestPath = path.join(root, 'src/assets/seo/manifest.json');

function load(relative) {
	const source = fs.readFileSync(path.join(root, relative), 'utf8');
	const result = ts.transpileModule(source, {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
	});
	const context = { exports: {} };
	vm.runInNewContext(result.outputText, context);
	return context.exports;
}

const { SERVICES } = load('src/data/service.const.ts');
const { STARTUPS } = load('src/data/startup.const.ts');
const { PARTNERS } = load('src/data/partner.const.ts');
const { practices } = load('src/data/practice.const.ts');

const cards = new Map(
	JSON.parse(fs.readFileSync(manifestPath, 'utf8')).map((card) => [card.route, card]),
);
const url = (route) => (route === '/' ? origin + '/' : origin + route);
const previous = new Map(
	[
		...(fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '').matchAll(
			/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g,
		),
	].map(([, loc, lastmod]) => [loc.replace(/\/$/, ''), lastmod]),
);
const today = new Date().toISOString().slice(0, 10);

const pages = [
	{ route: '/', priority: '1.0' },
	{ route: '/startups', priority: '0.8' },
	{ route: '/pricing', priority: '0.9' },
	{ route: '/website', priority: '0.8' },
	{ route: '/app', priority: '0.8' },
	{ route: '/unity', priority: '0.8' },
	{ route: '/virtual-tour', priority: '0.8' },
	{ route: '/quantum', priority: '0.7' },
	{ route: '/blockchain', priority: '0.7' },
	...SERVICES.map((service) => ({ route: '/service/' + service.id, priority: '0.8' })),
	...STARTUPS.map((startup) => ({ route: '/startup/' + startup.id, priority: '0.7' })),
	...PARTNERS.map((partner) => ({ route: '/partner/' + partner.id, priority: '0.6' })),
	...practices.map((practice) => ({
		route: '/intern/' + practice.id,
		priority: '0.4',
		image: practice.thumb,
	})),
];

const escape = (value) =>
	String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

const entries = pages.map((page) => {
	const loc = url(page.route);
	const card = cards.get(page.route);
	const image = card ? card.imagePath : page.image;
	const lastmod = previous.get(loc.replace(/\/$/, '')) ?? today;

	return [
		'\t<url>',
		`\t\t<loc>${escape(loc)}</loc>`,
		`\t\t<lastmod>${lastmod}</lastmod>`,
		`\t\t<priority>${page.priority}</priority>`,
		...(image
			? [
					'\t\t<image:image>',
					`\t\t\t<image:loc>${escape(origin + image)}</image:loc>`,
					'\t\t</image:image>',
				]
			: []),
		'\t</url>',
	].join('\n');
});

fs.writeFileSync(
	sitemapPath,
	'<?xml version="1.0" encoding="UTF-8"?>\n' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
		entries.join('\n') +
		'\n</urlset>\n',
);
console.log('Wrote ' + entries.length + ' URLs to src/assets/sitemap.xml');
