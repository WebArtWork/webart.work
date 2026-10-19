import {
	SolutionCard,
	SolutionCopy,
	SolutionExample,
	SolutionFaq,
	SolutionStep,
} from '../../interfaces/solution-page.interface';

export const WEBSITE_META = {
	title: 'Website Development for Small Business',
	description:
		'Web Art Work builds fast, multilingual websites for small and medium businesses: landing pages, company sites and online shops, from $200.',
};

export const WEBSITE_COPY: SolutionCopy = {
	title: 'Websites that load fast and sell',
	subtitle:
		'Landing pages, company sites and online shops for small and medium businesses, from a ready template to a fully custom build.',
	cta: 'Discuss your website',
	secondary: { label: 'See packages from $200', href: '/pricing' },
	examplesTitle: 'Sites we built for our partners',
	examplesText: 'Local businesses that run on websites we designed, built and still support.',
	cardsTitle: 'What every site includes',
	stepsTitle: 'From first call to launch',
	stepsText: 'One team handles design, build, content and launch.',
	honestTitle: 'Not every business needs a custom site',
	honestText:
		'If you need a simple page to show up online quickly, our Ready package is enough. We will not sell you a custom build you do not need.',
	closingTitle: 'Ready to talk about your website?',
	closingText: 'Tell us about your business. We will suggest a package and what the launch takes.',
};

export const WEBSITE_EXAMPLES: SolutionExample[] = [
	{
		name: 'Demchuk Denys',
		image: '/partner/demchuk-denys.png',
		description: 'Custom kitchen and furniture workshop, with a 360° virtual tour of the showroom.',
		path: '/partner/demchuk-denys',
		link: { label: 'demchukdenys.com', href: 'https://demchukdenys.com' },
	},
	{
		name: 'Tpotier',
		image: '/partner/tpotier.png',
		description: 'Bridal textiles studio with a multilingual catalog for an international market.',
		path: '/partner/tpotier',
		link: { label: 'tpotier.com', href: 'https://tpotier.com' },
	},
	{
		name: 'Salon leather',
		image: '/partner/salon-leather.png',
		description: 'Leather goods brand with online ordering connected to a CRM.',
		path: '/partner/salon-leather',
		link: { label: 'salon-leather.com', href: 'https://salon-leather.com' },
	},
	{
		name: 'Potier Cake',
		image: '/partner/potier-cake.png',
		description: 'Cake and dessert studio where clients browse the menu and place orders online.',
		path: '/partner/potier-cake',
		link: { label: 'potiercake.webart.work', href: 'https://potiercake.webart.work' },
	},
];

export const WEBSITE_CARDS: SolutionCard[] = [
	{
		icon: 'bolt',
		title: 'Fast static pages',
		text: 'Pages are prerendered with Angular, so they open almost instantly and rank better.',
	},
	{
		icon: 'travel_explore',
		title: 'SEO built in',
		text: 'Titles, descriptions, structured data, sitemap and share images on every page.',
	},
	{
		icon: 'translate',
		title: 'Multilingual from day one',
		text: 'Add languages without a second site. Each page gets proper language tags.',
	},
	{
		icon: 'edit_note',
		title: 'Easy to update',
		text: 'Change texts, prices and photos yourself, or send them to us.',
	},
];

export const WEBSITE_STEPS: SolutionStep[] = [
	{
		title: 'Brief and package',
		text: 'We agree on pages, languages and the package that fits your budget.',
	},
	{
		title: 'Design',
		text: 'A layout in your brand colors that you approve before we build.',
	},
	{
		title: 'Build and content',
		text: 'We build the pages, add your texts and photos, and set up SEO.',
	},
	{
		title: 'Review',
		text: 'You check every page on phone and desktop and send your changes.',
	},
	{
		title: 'Launch',
		text: 'We connect your domain, hosting and analytics, then go live.',
	},
	{
		title: 'Support after launch',
		text: 'We keep the site updated, fast and secure.',
	},
];

export const WEBSITE_FAQS: SolutionFaq[] = [
	{
		question: 'How long does it take to build a website?',
		answer: 'It depends on the package and the number of pages. After the first call we give you a timeline for each stage.',
	},
	{
		question: 'Who hosts the website?',
		answer: 'We can host it for you or deploy it to your own hosting. Either way, the domain and the code stay yours.',
	},
	{
		question: 'Can I edit the content myself?',
		answer: 'Yes. We can set up editing for texts, prices and photos, or you send changes and we make them.',
	},
	{
		question: 'What happens after launch?',
		answer: 'We fix issues, update content on request and keep the site fast and secure. Support terms depend on the package.',
	},
];
