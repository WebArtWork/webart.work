export const PRICING_META = {
	title: 'Website Pricing: Packages from $200',
	description:
		'Website packages from $200: Basic, Pro and Extended. Compare features and find the right fit for your project and budget. Other solutions priced separately.',
};

export interface PricingTier {
	id: 'basic' | 'pro' | 'extended';
	name: string;
	price: string;
	billing: string;
	tagline: string;
	highlight: boolean;
	features: string[];
}

export const PRICING_TIERS: PricingTier[] = [
	{
		id: 'basic',
		name: 'Basic',
		price: '$200',
		billing: 'one-time',
		tagline: 'A fast start on a proven layout',
		highlight: false,
		features: [
			'Ready-made design',
			'Your photos and texts',
			'Basic SEO setup',
			'Mobile-friendly version',
			'Contact form connected to your inbox',
		],
	},
	{
		id: 'pro',
		name: 'Pro',
		price: '$500',
		billing: 'one-time',
		tagline: 'A site built around your business',
		highlight: true,
		features: [
			'Everything in Basic',
			'Custom design matched to your brand',
			'Up to 5 extra pages',
			'Structure and sections built around your content',
			'Application and inquiry forms',
		],
	},
	{
		id: 'extended',
		name: 'Extended',
		price: '$900',
		billing: 'one-time',
		tagline: 'Turn your site into a growth tool',
		highlight: false,
		features: [
			'Everything in Pro',
			'Multilingual, up to 3 languages',
			'Online booking or scheduling',
			'Advanced integrations: CRM, payments and more',
			'Ongoing support included',
		],
	},
];

export const PRICING_NOTE =
	'Domain, hosting, paid third-party services, content production and custom features beyond a package may cost extra.';

export interface OtherSolution {
	path: string;
	icon: string;
	title: string;
	text: string;
	price: string;
}

export const OTHER_SOLUTIONS: OtherSolution[] = [
	{
		path: '/market',
		icon: 'storefront',
		title: 'Marketplaces & e-commerce',
		text: 'Online stores, B2B platforms and multi-vendor marketplaces.',
		price: 'From $1,200',
	},
	{
		path: '/crm',
		icon: 'dashboard',
		title: 'CRM & business software',
		text: 'Custom CRM, automation and business operating systems.',
		price: 'From $2,000',
	},
	{
		path: '/virtual-tour',
		icon: '360',
		title: '360° virtual tours',
		text: 'Let customers walk through your space online before they visit.',
		price: 'From $250',
	},
	{
		path: '/app',
		icon: 'smartphone',
		title: 'Mobile apps',
		text: 'One codebase for iOS, Android and web with Capacitor.',
		price: 'From $800',
	},
	{
		path: '/unity',
		icon: 'sports_esports',
		title: 'Unity games and 3D',
		text: 'Games, 3D configurators and VR for web, mobile and Meta Quest.',
		price: 'From $1,000',
	},
	{
		path: '/ai',
		icon: 'smart_toy',
		title: 'AI & automation',
		text: 'AI agents, chatbots, knowledge assistants and workflow automation.',
		price: 'From $600',
	},
	{
		path: '/blockchain',
		icon: 'deployed_code',
		title: 'Blockchain development',
		text: 'Smart contracts, dApps, wallets and custom Cosmos SDK networks.',
		price: 'From $1,500',
	},
	{
		path: '/quantum',
		icon: 'blur_on',
		title: 'Quantum computing',
		text: 'IBM Quantum in our startups and in client projects on request.',
		price: 'On request',
	},
];

export interface PricingFaq {
	question: string;
	answer: string;
}

export const PRICING_FAQS: PricingFaq[] = [
	{
		question: 'How do I choose between the Basic, Pro, and Extended packages?',
		answer: 'Pick Basic if you need a working website fast and can adapt to a proven layout. Pick Pro if you want the structure, sections, and pages built around your business. Pick Extended if you also need booking, deeper integrations, and ongoing support.',
	},
	{
		question: 'Can I upgrade my package later?',
		answer: 'Yes, you can start with Basic or Pro and upgrade later. We will credit part of your original payment toward the difference.',
	},
	{
		question: 'What do I need to provide to get started?',
		answer: 'Your logo (if you have one), your brand colors, your photos, and the texts for your pages. If you do not have texts or photos yet, we can help you prepare them for an additional fee.',
	},
	{
		question: 'How long does it take to build a website?',
		answer: 'A Basic package typically launches within a few days. Pro and Extended packages usually take one to three weeks, depending on scope and how quickly content is provided.',
	},
	{
		question: 'What about marketplaces, CRM, mobile apps or other solutions?',
		answer: 'Those are priced separately from the website packages above, since scope varies far more widely. The figures shown are a realistic starting point; after a short discovery call we provide a fixed estimate for your specific project.',
	},
];
