export const WEBSITE_META = {
	title: 'Website Design & Development Agency',
	description:
		'Professional website design and development by Web Art Work. 10+ years building custom business websites, landing pages, online stores, catalogs and multilingual sites.',
	image: 'https://webart.work/seo/website.jpg',
};

export const WEBSITE_KEYWORDS = [
	'website development agency',
	'professional website design',
	'custom website development',
	'business website development',
	'web design agency',
	'Angular website development',
	'corporate website design',
	'e-commerce development',
	'multilingual website development',
	'landing page development',
	'website redesign',
];

export const WEBSITE_HIGHLIGHTS = [
	'10+ years of web development',
	'Custom design and development',
	'Full delivery and ongoing support',
	'Clients worldwide',
];

export interface WebsiteProject {
	name: string;
	image: string;
	industry: string;
	text: string;
	highlights: string[];
	url: string;
	label: string;
	preview?: boolean;
	path: string;
}

export const WEBSITE_PROJECTS: WebsiteProject[] = [
	{
		name: 'Demchuk Denys',
		image: '/website/demchuk-denys.jpg',
		industry: 'Custom furniture',
		text: 'A custom kitchen and furniture workshop presents its services and work, collects inquiries and lets visitors walk through its showroom in 360°.',
		highlights: ['Service presentation', 'Lead generation', '360° virtual tour'],
		url: 'https://demchukdenys.com/',
		label: 'demchukdenys.com',
		path: '/partner/demchuk-denys',
	},
	{
		name: 'T.Potier',
		image: '/website/tpotier.jpg',
		industry: 'Bridal fashion',
		text: 'A Ukrainian wholesale bridal brand shows its wedding dress collections and product details to buyers around the world.',
		highlights: ['Product collections', 'Wholesale catalog', 'International audience'],
		url: 'https://tpotier.com/',
		label: 'tpotier.com',
		path: '/partner/tpotier',
	},
	{
		name: 'Salon Leather',
		image: '/website/salon-leather.jpg',
		industry: 'Furniture and leather goods',
		text: 'Upholstered furniture and leather goods, organized into clear categories so customers find the right product line fast.',
		highlights: ['Product catalog', 'Category navigation', 'Product discovery'],
		url: 'https://salon-leather.com/',
		label: 'salon-leather.com',
		path: '/partner/salon-leather',
	},
	{
		name: 'Potier Cake',
		image: '/website/potier-cake.jpg',
		industry: 'Cakes and desserts',
		text: 'A cake and dessert studio built around appetizing visuals, product information and direct contact from a phone.',
		highlights: ['Brand presentation', 'Mobile-friendly layout', 'Customer contact'],
		url: 'https://potiercake.webart.work/',
		label: 'potiercake.webart.work',
		preview: true,
		path: '/partner/potier-cake',
	},
];

export const WEBSITE_FOCUS = [
	'Memorable design that reflects your brand',
	'Clear navigation and easy next steps',
	'Fast, responsive pages on every device',
	'A search-friendly foundation',
	'Tools for talking to customers',
	'Integrations with your business systems',
	'Room to grow later',
];

export interface WebsiteType {
	icon: string;
	title: string;
	text: string;
	points: string[];
}

export const WEBSITE_TYPES: WebsiteType[] = [
	{
		icon: 'ads_click',
		title: 'Landing pages',
		text: 'A focused page that turns interest in one product, campaign or event into action.',
		points: [
			'Launches and campaigns',
			'Lead generation',
			'Events and offers',
			'Startup validation',
		],
	},
	{
		icon: 'apartment',
		title: 'Business and corporate websites',
		text: 'Show who you are, what you offer and why customers should choose you.',
		points: [
			'Service pages and portfolio',
			'Testimonials and team',
			'Clear contact paths',
			'From small firms to B2B brands',
		],
	},
	{
		icon: 'menu_book',
		title: 'Product catalogs',
		text: 'For makers, wholesalers and brands that sell on request rather than through a cart.',
		points: [
			'Categories, search and filters',
			'Variants and specifications',
			'Inquiry and quote requests',
			'CRM and inventory sync',
		],
	},
	{
		icon: 'shopping_cart',
		title: 'Online stores',
		text: 'Custom storefronts or a fitting commerce platform, connected to the work behind every order.',
		points: [
			'Cart, checkout and payments',
			'Delivery options and discounts',
			'Customer accounts and tracking',
			'Order management',
		],
	},
	{
		icon: 'event_available',
		title: 'Booking websites',
		text: 'Hotels, studios, salons and venues take bookings directly, with less manual work.',
		points: [
			'Availability calendars',
			'Date, time and service choice',
			'Payments or deposits',
			'Confirmations and reminders',
		],
	},
	{
		icon: 'translate',
		title: 'Multilingual websites',
		text: 'More than translated buttons: localized content, URLs, search indexing and regional details.',
		points: [
			'Language versions and switching',
			'Language-specific SEO',
			'International catalogs',
			'Local contacts and currencies',
		],
	},
	{
		icon: 'view_in_ar',
		title: 'Interactive websites',
		text: 'Features that help visitors explore products and spaces, without slowing the site down.',
		points: [
			'Animations and configurators',
			'Calculators and quote tools',
			'Interactive maps',
			'360° tours and 3D products',
		],
	},
	{
		icon: 'autorenew',
		title: 'Redesign and modernization',
		text: 'We review what you have, keep what works and fix what does not before suggesting a rebuild.',
		points: [
			'Visual and mobile redesign',
			'Speed and technical SEO',
			'Platform or CMS migration',
			'New integrations',
		],
	},
];

export interface WebsiteStyle {
	id: string;
	title: string;
	text: string;
}

export const WEBSITE_STYLES: WebsiteStyle[] = [
	{
		id: 'minimal',
		title: 'Minimal and modern',
		text: 'Clean layouts, careful typography and generous space.',
	},
	{
		id: 'corporate',
		title: 'Corporate and professional',
		text: 'Structured information and a confident identity for business audiences.',
	},
	{
		id: 'luxury',
		title: 'Luxury and premium',
		text: 'Refined imagery, elegant details and considered interactions.',
	},
	{
		id: 'bold',
		title: 'Bold and creative',
		text: 'Expressive color, original layouts and motion that tells a story.',
	},
	{
		id: 'editorial',
		title: 'Editorial',
		text: 'Typography and imagery designed for reading and discovery.',
	},
	{
		id: 'immersive',
		title: 'Interactive and immersive',
		text: 'Motion, 3D content and interactive elements that fit the brand.',
	},
];

export interface WebsiteQuality {
	icon: string;
	title: string;
	text: string;
}

export const WEBSITE_QUALITIES: WebsiteQuality[] = [
	{
		icon: 'chat',
		title: 'Design that communicates',
		text: 'Clear messages, easy navigation and visible calls to action on every page.',
	},
	{
		icon: 'bolt',
		title: 'Speed',
		text: 'Efficient code, optimized images and the right rendering, measured with Core Web Vitals.',
	},
	{
		icon: 'smartphone',
		title: 'Mobile first',
		text: 'Layouts that stay usable on phones, tablets and desktops.',
	},
	{
		icon: 'travel_explore',
		title: 'SEO foundations',
		text: 'Semantic structure, titles, sitemaps, canonical URLs, structured data and multilingual tags. Rankings cannot be guaranteed.',
	},
	{
		icon: 'accessibility_new',
		title: 'Accessibility',
		text: 'Readable type, contrast and keyboard navigation. Formal compliance can be added to the scope.',
	},
	{
		icon: 'insights',
		title: 'Analytics',
		text: 'Track inquiries, bookings and purchases, with consent handled properly.',
	},
	{
		icon: 'edit_note',
		title: 'Easy content updates',
		text: 'An admin panel, a CMS or updates done by us: whatever suits your team.',
	},
	{
		icon: 'lock',
		title: 'Security and reliability',
		text: 'HTTPS, access control, dependable integrations, monitoring and maintenance.',
	},
];

export const WEBSITE_INTEGRATIONS: WebsiteQuality[] = [
	{
		icon: 'contacts',
		title: 'CRM',
		text: 'Inquiries go straight into your sales workflow.',
	},
	{
		icon: 'payments',
		title: 'Payments',
		text: 'Products, bookings and deposits through suitable providers.',
	},
	{
		icon: 'calendar_month',
		title: 'Booking',
		text: 'Availability checks, requests and appointments.',
	},
	{
		icon: 'inventory_2',
		title: 'Products and inventory',
		text: 'Catalog data synced with your databases or software.',
	},
	{
		icon: 'forum',
		title: 'Customer communication',
		text: 'Email, messengers and notifications.',
	},
	{
		icon: 'map',
		title: 'Maps and locations',
		text: 'Branches, service areas and directions.',
	},
	{
		icon: 'api',
		title: 'APIs and services',
		text: 'Your existing tools and third-party services.',
	},
	{
		icon: 'web',
		title: 'Portals and web apps',
		text: 'When the site grows into a customer portal or system.',
	},
];

export interface WebsiteTechGroup {
	title: string;
	items: string;
}

export const WEBSITE_TECH: WebsiteTechGroup[] = [
	{
		title: 'Frontend',
		items: 'Angular, React, Next.js, Vue, Nuxt, TypeScript, HTML, SCSS, Tailwind CSS',
	},
	{
		title: 'Backend and APIs',
		items: 'Node.js, Express, NestJS, Python, PHP',
	},
	{
		title: 'Databases',
		items: 'MongoDB, PostgreSQL, MySQL',
	},
	{
		title: 'Infrastructure',
		items: 'Cloud hosting, CI/CD, CDN, monitoring',
	},
];

export const WEBSITE_SERVICES = [
	'Planning and business analysis',
	'UI/UX design',
	'Brand and visual direction',
	'Content preparation',
	'Frontend development',
	'Backend development',
	'Integrations',
	'Quality assurance',
	'Deployment and hosting',
	'Maintenance and growth',
];

export interface WebsiteStep {
	title: string;
	text: string;
}

export const WEBSITE_STEPS: WebsiteStep[] = [
	{
		title: 'Discovery',
		text: 'Your products, customers, brand, goals, pages and existing software.',
	},
	{
		title: 'Planning and estimate',
		text: 'Structure, features, technology and stages, in a proposal with timeline and cost.',
	},
	{
		title: 'Design and approval',
		text: 'You review layout, content structure and key interactions before development moves on.',
	},
	{
		title: 'Development and testing',
		text: 'Frontend, CMS, integrations and responsive behavior, with key user flows tested.',
	},
	{
		title: 'Launch',
		text: 'Hosting, domain, integrations and analytics checked on the live site.',
	},
	{
		title: 'Support and improvement',
		text: 'Updates, fixes, content changes and new features, or a clean handover.',
	},
];

export interface WebsitePackage {
	name: string;
	price: string;
	title: string;
	text: string;
	highlight?: boolean;
}

export const WEBSITE_PACKAGES: WebsitePackage[] = [
	{
		name: 'Basic',
		price: 'from $200',
		title: 'Get online with a proven structure',
		text: 'A professional, responsive site for simple presentations without heavy customization.',
	},
	{
		name: 'Pro',
		price: 'from $500',
		title: 'Shaped around your business',
		text: 'More control over layout, branding and content, plus selected custom features.',
		highlight: true,
	},
	{
		name: 'Extended',
		price: 'from $900',
		title: 'A more capable business site',
		text: 'Expanded SEO, multilingual content, booking or advanced integrations within the package scope.',
	},
	{
		name: 'Custom project',
		price: 'Individual estimate',
		title: 'Beyond the packages',
		text: 'Large corporate sites, complex catalogs, online stores and interactive experiences.',
	},
];

export const WEBSITE_REASONS: WebsiteQuality[] = [
	{
		icon: 'workspace_premium',
		title: 'Over 10 years of experience',
		text: 'Practical decisions and no unnecessary technical complexity.',
	},
	{
		icon: 'groups',
		title: 'One multidisciplinary team',
		text: 'Design, frontend, backend, integrations, cloud and testing, without juggling contractors.',
	},
	{
		icon: 'palette',
		title: 'Design that fits your brand',
		text: 'No single house style. We adapt to your brand and market.',
	},
	{
		icon: 'alt_route',
		title: 'Flexible technology',
		text: 'Angular is a core strength, but we pick what suits the project.',
	},
	{
		icon: 'hub',
		title: 'Connected to your operations',
		text: 'CRM, booking, payments and catalogs that work with your team.',
	},
	{
		icon: 'handshake',
		title: 'Transparent collaboration',
		text: 'Scope, milestones, costs and responsibilities agreed before development.',
	},
	{
		icon: 'trending_up',
		title: 'A long-term partner',
		text: 'Start with a simple site and grow into a platform or app with the same team.',
	},
];

export interface WebsiteFaq {
	question: string;
	answer: string;
}

export const WEBSITE_FAQS: WebsiteFaq[] = [
	{
		question: 'How much does it cost to build a website?',
		answer: 'Our packages start at $200. The final price depends on design, pages, features, integrations and content. Projects outside the packages get an individual estimate.',
	},
	{
		question: 'How long does it take to build a website?',
		answer: 'A site on a ready structure can launch within a few days once materials are ready. Custom and Premium packages usually take one to three weeks. Larger projects are planned individually.',
	},
	{
		question: 'Can you create a completely custom design?',
		answer: 'Yes. We can design from scratch around your brand, work from your existing designs or adapt a layout when that is more economical.',
	},
	{
		question: 'Do you only build websites with Angular?',
		answer: 'No. Angular is one of our main tools, but we also use React, Next.js, Vue and others, depending on the project.',
	},
	{
		question: 'Can you redesign my existing website?',
		answer: 'Yes. We review the current site first, then improve design, navigation, speed or features, or rebuild parts of it.',
	},
	{
		question: 'Can you build an online store?',
		answer: 'Yes: catalog, product management, cart, checkout, payments and integrations, designed around your products and systems.',
	},
	{
		question: 'Can you build a website in several languages?',
		answer: 'Yes, with language switching, localized content and the right technical SEO. Languages and scope are agreed during planning.',
	},
	{
		question: 'Can I edit the content myself?',
		answer: 'Yes, when content management is part of the solution. We can build an editor, connect a CMS or update content for you.',
	},
	{
		question: 'Will my website appear on Google?',
		answer: 'We build technical SEO foundations and offer extended SEO services. Specific rankings and traffic cannot be guaranteed.',
	},
	{
		question: 'Can you connect the site to my CRM or other software?',
		answer: 'Yes: CRMs, payment gateways, booking platforms and other tools, depending on their APIs.',
	},
	{
		question: 'Can you help with texts and images?',
		answer: 'Yes. We help with structure, copywriting and visuals. The amount of content work is set in the package or agreed separately.',
	},
	{
		question: 'Who provides hosting and the domain?',
		answer: 'You can use your own, or we set them up for you. Hosting, domain and third-party costs are clarified during planning.',
	},
	{
		question: 'Will I own my website?',
		answer: 'Ownership, source code, design files, domain access and handover are defined in the agreement, so responsibilities are clear.',
	},
	{
		question: 'Can you add features later?',
		answer: 'Yes: new pages, features, languages and integrations, up to connected web applications and custom backends.',
	},
	{
		question: 'Do you provide ongoing maintenance?',
		answer: 'Yes: updates, fixes, support, content changes, speed improvements and new development, as agreed.',
	},
	{
		question: 'Can you take over a site built by another company?',
		answer: 'Yes. We first review the code, infrastructure and dependencies to find risks and plan maintenance or migration.',
	},
];

export const WEBSITE_RELATED = [
	{ label: 'Website Pricing', path: '/pricing' },
	{ label: 'Mobile apps', path: '/app' },
	{ label: '360° virtual tours', path: '/virtual-tour' },
	{ label: 'Web Development', path: '/service/web-development' },
	{ label: 'UI/UX Design', path: '/service/ui-ux-design' },
	{ label: 'Search Engine Optimization', path: '/service/search-engine-optimization' },
	{ label: 'System Integration', path: '/service/system-integration' },
	{ label: 'Digital Marketing', path: '/service/digital-marketing' },
];
