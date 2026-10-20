import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const { chromium } = require('playwright');

const root = path.resolve(import.meta.dirname, '..');
const assets = path.join(root, 'src/assets');
const output = path.join(assets, 'seo');
fs.mkdirSync(output, { recursive: true });
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
const pages = [
	{ route: '/', title: 'Web & mobile development', subtitle: 'A freelance community based in Ukraine', category: 'Web Art Work', artwork: 'home' },
	{ route: '/startups', title: 'Products we are building', subtitle: 'Explore the Web Art Work startup portfolio', category: 'Our startups', artwork: 'startups' },
	{ route: '/pricing', title: 'Website packages', subtitle: 'Basic $200 · Pro $500 · Extended $900', category: 'Website pricing', artwork: 'pricing' },
	{ route: '/website', title: 'Website development', subtitle: 'Fast, multilingual sites from $200', category: 'Web Art Work', image: '/service/web_development.jpg' },
	{ route: '/ai', title: 'AI & Automation', subtitle: 'Agents, assistants & connected workflows', category: 'Web Art Work', customCard: true },
	{ route: '/crm', title: 'Custom CRM', subtitle: 'Sales, operations & business software', category: 'Web Art Work', customCard: true },
	{ route: '/market', title: 'Marketplaces & E-commerce', subtitle: 'Online stores & multi-vendor platforms', category: 'Web Art Work', customCard: true },
	{ route: '/app', title: 'Hybrid mobile apps', subtitle: 'iOS, Android and web from one Capacitor codebase', category: 'Web Art Work', image: '/service/mobile_development.jpg' },
	{ route: '/unity', title: 'Unity games and 3D', subtitle: 'Web, mobile, desktop and Meta Quest', category: 'Web Art Work', image: '/service/unity_development.jpg' },
	{ route: '/virtual-tour', title: '360° virtual tours', subtitle: 'Let customers walk through your space online', category: 'Web Art Work', image: '/service/augmented_virtual_reality_solutions.jpg' },
	{ route: '/quantum', title: 'Quantum computing', subtitle: 'Integration, simulation & IBM Quantum', category: 'Web Art Work', artwork: 'quantum' },
	{ route: '/blockchain', title: 'Blockchain development', subtitle: 'Your own chain on Cosmos SDK', category: 'Web Art Work', image: '/service/blockchain_solutions.jpg' },
	{ route: '/proposal', title: 'Your project proposal', subtitle: 'Scope, delivery & website options', category: 'Web Art Work', image: '/seo/artwork/home.png', noindex: true },
	...SERVICES.map(p => ({ route: '/service/' + p.id, title: p.title, subtitle: p.description, category: 'Development & business services', image: p.image })),
	...STARTUPS.map(p => ({ route: '/startup/' + p.id, title: p.name, subtitle: p.tagline, category: 'Web Art Work startups', image: p.image })),
	...PARTNERS.map(p => ({ route: '/partner/' + p.id, title: p.name, subtitle: 'Explore our technology partnership', category: 'Our partners', image: p.thumb })),
];
const overrides = { '/startup/robotics.webp': '/seo/artwork/robotics.png', '/startup/play.webp': '/seo/artwork/play.png', '/startup/todo.webp': '/seo/artwork/todo.png' };
for (const p of pages) if (overrides[p.image]) p.image = overrides[p.image];
const escape = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
function dataUrl(relative) {
	const file = path.join(assets, relative.replace(/^\//, ''));
	if (!fs.existsSync(file)) throw new Error('Missing card image: ' + file);
	const mime = /\.png$/i.test(file) ? 'image/png' : /\.svg$/i.test(file) ? 'image/svg+xml' : /\.webp$/i.test(file) ? 'image/webp' : 'image/jpeg';
	return 'data:' + mime + ';base64,' + fs.readFileSync(file).toString('base64');
}
const browser = await chromium.launch({ headless: true });
try {
	const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
	for (const p of pages) {
		const key = p.route === '/' ? 'home' : p.route.slice(1).replaceAll('/', '-');
		p.imagePath = '/seo/' + key + '.jpg';
		// Preserve custom cards instead of replacing them with the generic layout.
		if (p.customCard) {
			if (!fs.existsSync(path.join(assets, p.imagePath))) throw new Error('Missing custom card: ' + p.route);
			continue;
		}
		const dark = p.artwork === 'quantum';
		const image = dataUrl(p.artwork ? '/seo/artwork/' + p.artwork + '.png' : p.image);
		await page.setContent('<!doctype html><html><head><meta charset="utf-8"><style>' +
			'*{box-sizing:border-box}body{margin:0;background:#eff2f5;color:#142039;font-family:Arial,sans-serif}' +
			'main{width:1200px;height:630px;position:relative;overflow:hidden;background:' + (dark ? '#020c20;color:white' : '#eff2f5') + '}' +
			'.art{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.wash{position:absolute;inset:0;background:linear-gradient(90deg,' + (dark ? '#020b1f 0%,#020b1fee 30%,#020b1f00 65%' : '#f0f3f7 0%,#f0f3f7f5 32%,#f0f3f700 68%') + ')}' +
			'.photo{position:absolute;right:48px;top:64px;width:442px;height:502px;object-fit:cover;border-radius:28px}' +
			'.photo.logo{object-fit:contain;padding:20px}' +
			'.copy{position:absolute;left:60px;top:55px;width:550px;height:520px;display:flex;flex-direction:column;align-items:flex-start}' +
			'.brand{font-size:25px;font-weight:700;letter-spacing:-.6px}.mark{display:inline-block;width:14px;height:14px;background:#2463ed;margin-right:12px;border-radius:3px}' +
			'.category{font-size:17px;text-transform:uppercase;letter-spacing:2px;margin-top:66px;color:' + (dark ? '#83b8ff' : '#3661a8') + '}' +
			'h1{font-size:' + (p.title.length > 38 ? '48' : '58') + 'px;line-height:1.08;letter-spacing:-2px;margin:18px 0 20px;font-weight:800;max-width:550px}' +
			'p{font-size:23px;line-height:1.4;max-width:520px;margin:0;color:' + (dark ? '#bfd1e8' : '#44546c') + '}' +
			'footer{position:absolute;bottom:40px;left:60px;font-size:17px;letter-spacing:.5px;color:' + (dark ? '#a3b8d5' : '#52627b') + '}</style></head><body><main>' +
			(p.artwork ? '<img class="art" alt="" src="' + image + '"><div class="wash"></div>' : '<img class="photo' + (p.route.startsWith('/partner/') || p.image?.startsWith('/startup/') ? ' logo' : '') + '" alt="" src="' + image + '">') +
			'<div class="copy"><div class="brand"><span class="mark"></span>Web Art Work</div><div class="category">' + escape(p.category) + '</div><h1>' + escape(p.title) + '</h1><p>' + escape(p.subtitle) + '</p></div><footer>webart.work' + escape(p.route === '/' ? '' : p.route) + '</footer></main></body></html>');
		await page.evaluate(async () => { await Promise.all([...document.images].map(i => i.decode())); await document.fonts.ready; });
		const overflow = await page.evaluate(() => {
			const heading = document.querySelector('h1').getBoundingClientRect();
			const copy = document.querySelector('p').getBoundingClientRect();
			return heading.right > 630 || copy.bottom > 550;
		});
		if (overflow) throw new Error('Card text overflow: ' + p.route);
		await page.screenshot({ path: path.join(assets, p.imagePath), type: 'jpeg', quality: 88 });
	}
} finally { await browser.close(); }
fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(pages, null, '\t') + '\n');
console.log('Generated ' + pages.length + ' unique 1200 × 630 cards.');
