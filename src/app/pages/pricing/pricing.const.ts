export const PRICING_META = {
	title: 'Website Pricing',
	description:
		'Compare our Ready, Custom, and Premium website packages and find the right fit for your project, budget, and timeline.',
	image: 'https://webart.work/img/avatar.png',
};

export interface PricingTier {
	id: 'ready' | 'custom' | 'premium';
	name: string;
	price: string;
	tagline: string;
	highlight: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
	{
		id: 'ready',
		name: 'Ready',
		price: '$200',
		tagline: 'Launch your website fast',
		highlight: false,
	},
	{
		id: 'custom',
		name: 'Custom',
		price: '$500',
		tagline: 'A site built around your business',
		highlight: true,
	},
	{
		id: 'premium',
		name: 'Premium',
		price: '$900',
		tagline: 'Turn your site into a growth tool',
		highlight: false,
	},
];

export type FeatureValue = boolean | 'partial' | string;

export interface PricingFeatureRow {
	label: string;
	values: [FeatureValue, FeatureValue, FeatureValue];
}

export const PRICING_FEATURE_ROWS: PricingFeatureRow[] = [
	{ label: 'Ready-made design', values: [true, true, true] },
	{ label: 'Your photos and texts', values: [true, true, true] },
	{ label: 'Mobile-friendly version', values: [true, true, true] },
	{ label: 'Your brand colors', values: ['partial', true, true] },
	{ label: 'Structure changes', values: [false, true, true] },
	{ label: 'Custom sections', values: [false, true, true] },
	{ label: 'Extra pages', values: [false, true, true] },
	{ label: 'Application forms', values: [false, true, true] },
	{ label: 'SEO', values: ['Basic', 'Basic', 'Advanced'] },
	{ label: 'Multiple languages', values: [false, '—', 'Up to 3 languages'] },
	{ label: 'Online booking', values: [false, false, true] },
	{ label: 'Integrations', values: [false, 'Basic', 'Advanced'] },
	{ label: 'Ongoing support', values: [false, '—', true] },
];

export interface PricingFaq {
	question: string;
	answer: string;
}

export const PRICING_FAQS: PricingFaq[] = [
	{
		question: 'How do I choose between the Ready, Custom, and Premium packages?',
		answer:
			'Pick Ready if you need a working website fast and can adapt to a proven layout. Pick Custom if you want the structure, sections, and pages built around your business. Pick Premium if you also need booking, deeper integrations, and ongoing support.',
	},
	{
		question: 'Can I upgrade my package later?',
		answer:
			'Yes, you can start with Ready or Custom and upgrade later. We will credit part of your original payment toward the difference.',
	},
	{
		question: 'What do I need to provide to get started?',
		answer:
			'Your logo (if you have one), your brand colors, your photos, and the texts for your pages. If you do not have texts or photos yet, we can help you prepare them for an additional fee.',
	},
	{
		question: 'How long does it take to build a website?',
		answer:
			'A Ready package typically launches within a few days. Custom and Premium packages usually take one to three weeks, depending on scope and how quickly content is provided.',
	},
];
