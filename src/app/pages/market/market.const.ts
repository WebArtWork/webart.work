export const MARKET_META = {
	title: 'Marketplace & E-Commerce Development Company',
	description:
		'Custom marketplace and e-commerce development by Web Art Work. Build online stores, B2B platforms, multi-vendor marketplaces and integrated commerce solutions.',
	image: 'https://webart.work/seo/market.jpg',
	imageAlt: 'Marketplace and e-commerce: connected storefronts, shopping and order delivery by Web Art Work',
};

export const MARKET_KEYWORDS = [
	'marketplace development company',
	'custom marketplace development',
	'multi-vendor marketplace',
	'e-commerce development',
	'B2B commerce platform',
	'online store development',
	'Angular e-commerce development',
	'wholesale platform development',
];

export const MARKET_HIGHLIGHTS = [
	'10+ years of software development',
	'Custom UI/UX',
	'B2C and B2B',
	'Multi-vendor architecture',
	'Payments and logistics',
];

export const MARKET_FOCUS = [
	'Category navigation, search and filters',
	'Clear pricing and fast checkout',
	'Product, inventory and order management',
	'Seller onboarding, commissions and payouts',
	'Permissions, moderation and dispute handling',
	'CRM, ERP and payment integrations',
	'Reporting and business analytics',
];

export interface MarketType {
	icon: string;
	title: string;
	text: string;
}

export const MARKET_TYPES: MarketType[] = [
	{
		icon: 'storefront',
		title: 'Online stores & brand marketplaces',
		text: 'A storefront that reflects your brand: categories, variants and SKUs, stock indicators, galleries, carts, checkout, accounts and order management.',
	},
	{
		icon: 'hub',
		title: 'Multi-vendor marketplaces',
		text: 'Seller registration, individual storefronts, product approvals, shared search, order routing, commissions, payouts, disputes and central administration.',
	},
	{
		icon: 'inventory_2',
		title: 'B2B & wholesale platforms',
		text: 'Verified business accounts, customer-specific pricing, volume discounts, bulk ordering, quotes, approvals, invoices and system synchronization.',
	},
	{
		icon: 'home_repair_service',
		title: 'Service marketplaces',
		text: 'Provider profiles, listings, location-based search, calendars, booking requests, messaging, payments, reviews and moderation.',
	},
	{
		icon: 'category',
		title: 'Industry-specific commerce',
		text: 'Platforms adapted to manufacturing, furniture, fashion, food and beverages, construction, hospitality, agriculture and equipment.',
	},
	{
		icon: 'smartphone',
		title: 'Marketplace mobile apps',
		text: 'Connected iOS and Android experiences for shoppers, sellers, couriers or staff, sharing the marketplace backend.',
	},
];

export interface MarketQuality {
	icon: string;
	title: string;
	text: string;
}

export const MARKET_CAPABILITIES: MarketQuality[] = [
	{
		icon: 'travel_explore',
		title: 'Customer experience',
		text: 'Category navigation, search, filters, comparisons, favorites, cart, checkout, accounts, order history and reviews.',
	},
	{
		icon: 'inventory',
		title: 'Catalog & inventory',
		text: 'Products, variants, SKUs, attributes, photos, pricing, availability, import/export and multilingual descriptions.',
	},
	{
		icon: 'local_shipping',
		title: 'Orders & fulfillment',
		text: 'Confirmation, payment state, statuses, shipment creation, tracking, cancellations, returns and notifications.',
	},
	{
		icon: 'payments',
		title: 'Payments & financial workflows',
		text: 'Card payments, bank transfers, subscriptions, refunds, invoices, commissions and supported payouts.',
	},
	{
		icon: 'route',
		title: 'Delivery & logistics',
		text: 'Carrier integrations, pickup-point choice, shipping rates and labels, tracking and multiple warehouses.',
	},
	{
		icon: 'admin_panel_settings',
		title: 'Sellers & administration',
		text: 'Role-specific dashboards for onboarding, products, orders, performance, commissions and support.',
	},
];

export const MARKET_BUSINESS_MODELS = [
	'Direct sales',
	'Commissions',
	'Seller subscriptions',
	'Promoted listings',
	'Wholesale',
	'Service booking',
	'Hybrid models',
];

export const MARKET_INTEGRATIONS: MarketQuality[] = [
	{
		icon: 'contacts',
		title: 'CRM',
		text: 'Leads and customer records synced with your sales workflow.',
	},
	{
		icon: 'inventory_2',
		title: 'ERP & inventory',
		text: 'Stock, pricing and orders kept in sync with your systems.',
	},
	{
		icon: 'receipt_long',
		title: 'Accounting',
		text: 'Invoices and financial records for orders and commissions.',
	},
	{
		icon: 'credit_card',
		title: 'Payment gateways',
		text: 'Providers evaluated against your country, business type and APIs.',
	},
	{
		icon: 'local_shipping',
		title: 'Shipping carriers',
		text: 'Regional and international carriers for rates, labels and tracking.',
	},
	{
		icon: 'insights',
		title: 'Analytics & marketing',
		text: 'Measurement and marketing tools connected to your storefront.',
	},
];

export interface MarketTechGroup {
	title: string;
	items: string;
}

export const MARKET_TECH: MarketTechGroup[] = [
	{
		title: 'Frontend',
		items: 'Angular, React, Next.js, Vue, Nuxt, TypeScript',
	},
	{
		title: 'Backend',
		items: 'Node.js, NestJS, Express, Python, PHP',
	},
	{
		title: 'Data',
		items: 'MongoDB, PostgreSQL, MySQL, Redis',
	},
	{
		title: 'Commerce platforms',
		items: 'Integrated when that is the better decision over a fully custom build',
	},
];

export interface MarketStep {
	title: string;
	text: string;
}

export const MARKET_STEPS: MarketStep[] = [
	{
		title: 'Discovery',
		text: 'Understand the business, customers, sellers, workflows and constraints.',
	},
	{
		title: 'Planning',
		text: 'Agree on architecture, scope, milestones, estimate and integrations.',
	},
	{
		title: 'UI/UX design',
		text: 'Design storefronts, buyer journeys, seller portals and dashboards.',
	},
	{
		title: 'Development & QA',
		text: 'Implement and test catalog, orders, payments, logistics and integrations.',
	},
	{
		title: 'Launch',
		text: 'Configure infrastructure, migrate agreed data and coordinate release.',
	},
	{
		title: 'Support',
		text: 'Maintain the platform and develop features as the business grows.',
	},
];

export const MARKET_REASONS: MarketQuality[] = [
	{
		icon: 'workspace_premium',
		title: '10+ years of experience',
		text: 'A multidisciplinary team covering design, frontend, backend, APIs, databases, QA and infrastructure.',
	},
	{
		icon: 'storefront',
		title: 'A tangible commerce example',
		text: 'Our PANACEA project shows a real single-brand storefront we designed, built and maintain.',
	},
	{
		icon: 'alt_route',
		title: 'Technology chosen for the project',
		text: 'Angular and TypeScript are core strengths; we select the right stack for scale, budget and existing systems.',
	},
	{
		icon: 'handshake',
		title: 'A long-term partner',
		text: 'Clear deliverables and milestones, with ongoing maintenance and feature development after launch.',
	},
];

export interface MarketFaq {
	question: string;
	answer: string;
}

export const MARKET_FAQS: MarketFaq[] = [
	{
		question: 'What is the difference between a store and a marketplace?',
		answer: 'A store usually sells one business’s products. A multi-vendor marketplace lets independent sellers operate within one platform and needs additional onboarding, permissions, moderation, commissions and settlement processes.',
	},
	{
		question: 'Can we start with one seller and expand later?',
		answer: 'Yes, but future vendor ownership, roles, order routing and payment requirements should influence the initial architecture.',
	},
	{
		question: 'Can suppliers manage their own products?',
		answer: 'Yes. We can provide seller dashboards and approval workflows with appropriate data isolation.',
	},
	{
		question: 'Can you build B2B pricing and wholesale orders?',
		answer: 'Yes. Business accounts, negotiated prices, minimum order quantities, bulk orders, quotes and repeat purchasing can be included.',
	},
	{
		question: 'Can you integrate payments and shipping?',
		answer: 'Yes, where the provider supports the required workflow, country, business type and API access. We assess this before implementation.',
	},
	{
		question: 'Can you connect to our CRM or ERP?',
		answer: 'Yes. We review the available APIs, data mapping, synchronization requirements and operational rules.',
	},
	{
		question: 'Can you build a mobile marketplace app?',
		answer: 'Yes. We can build connected iOS and Android apps when a dedicated mobile experience is justified.',
	},
	{
		question: 'Do you only develop with Angular?',
		answer: 'No. Angular is a core expertise, but we select suitable frontend, backend or commerce technologies for each project.',
	},
	{
		question: 'How much does development cost, and how long does it take?',
		answer: 'That depends on the business model, design, user roles, workflows, integrations and migration needs. After discovery, we provide a project-specific scope, estimate and timeline.',
	},
	{
		question: 'Do you provide maintenance and take over existing platforms?',
		answer: 'Yes. We assess existing software before taking responsibility and can agree on upgrades, support and ongoing feature delivery.',
	},
	{
		question: 'Can you guarantee sales or SEO rankings?',
		answer: 'No. We can implement solid technical foundations and measurement tools, but business results depend on products, pricing, competition and marketing.',
	},
];

export const MARKET_RELATED = [
	{ label: 'Websites', path: '/website' },
	{ label: 'Mobile apps', path: '/app' },
	{ label: 'Website Pricing', path: '/pricing' },
	{ label: 'Web Development', path: '/service/web-development' },
	{ label: 'Back-End Development', path: '/service/back-end-development' },
	{ label: 'UI/UX Design', path: '/service/ui-ux-design' },
	{ label: 'System Integration', path: '/service/system-integration' },
];
