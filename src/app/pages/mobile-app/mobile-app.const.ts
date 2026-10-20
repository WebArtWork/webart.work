export const MOBILE_APP_META = {
	title: 'Mobile App Development Company: iOS & Android',
	description:
		'Custom mobile app development by Web Art Work. iOS, Android and cross-platform apps with design, backend, MVP, store publishing and support from one team.',
	image: 'https://webart.work/seo/app.jpg',
};

export const MOBILE_APP_KEYWORDS = [
	'mobile app development company',
	'custom mobile app development',
	'iOS app development',
	'Android app development',
	'cross-platform app development',
	'Angular Capacitor development',
	'hybrid app development',
	'mobile MVP development',
	'business app development',
	'app store publishing services',
	'mobile app backend development',
];

export const MOBILE_APP_HIGHLIGHTS = [
	'10+ years of software development',
	'iOS, Android and web',
	'Full-stack engineering',
	'App Store and Google Play releases',
	'Long-term maintenance',
];

export const MOBILE_APP_DELIVERABLES = [
	'UX and interface design',
	'iOS and Android apps',
	'Backend and APIs',
	'Accounts and sign-in',
	'Databases and cloud',
	'Payments and subscriptions',
	'Push notifications',
	'Admin dashboards',
	'Third-party integrations',
	'Testing and QA',
	'Store publishing',
	'Ongoing maintenance',
];

export interface MobileAppProduct {
	name: string;
	category: string;
	status: string;
	live: boolean;
	text: string;
	areas: string[];
	images: string[];
	framed: boolean;
	cta: string;
	url: string;
}

export const MOBILE_APP_PRODUCTS: MobileAppProduct[] = [
	{
		name: 'UA Code',
		category: 'Education',
		status: 'Published on the App Store',
		live: true,
		text: 'Learn programming with Ukrainian-language commands: write and run code, explore concepts, practice with examples and compete in quizzes and challenges.',
		areas: ['Interactive code editor', 'Lessons and examples', 'Quizzes and challenges', 'App Store release'],
		images: ['/app/ua-code-3.jpg', '/app/ua-code-2.jpg'],
		framed: false,
		cta: 'View UA Code on the App Store',
		url: 'https://apps.apple.com/ua/app/ua-code/id6744689084',
	},
	{
		name: 'TrainUp',
		category: 'Fitness',
		status: 'Web version live, phone apps in development',
		live: false,
		text: 'Builds a realistic training plan from your goal, level, schedule, equipment and space, then adjusts the next sessions to how you feel.',
		areas: ['Workout planning', 'Exercise library', 'Training schedules', 'Progress tracking'],
		images: ['/app/trainup-phone.jpg'],
		framed: true,
		cta: 'Explore TrainUp',
		url: 'https://trainup.work/',
	},
	{
		name: 'HotelUp',
		category: 'Hospitality',
		status: 'In-house product, in development',
		live: false,
		text: 'One system for a hotel: bookings, guests, payments, housekeeping and communication, with tools for staff and guests.',
		areas: ['Bookings and calendar', 'Guest services', 'Staff workflows', 'Payments and reports'],
		images: ['/app/hotelup-phone.jpg'],
		framed: true,
		cta: 'Explore HotelUp',
		url: 'https://hotelup.work/',
	},
];

export interface MobileAppCard {
	icon: string;
	title: string;
	text: string;
	points?: string[];
}

export const MOBILE_APP_TYPES: MobileAppCard[] = [
	{
		icon: 'business_center',
		title: 'Business apps',
		text: 'Tools for your team on the go, connected to CRM, ERP, inventory and accounting.',
		points: ['Tasks and approvals', 'Time and attendance', 'Orders and stock', 'Offline data collection'],
	},
	{
		icon: 'storefront',
		title: 'Marketplaces and booking',
		text: 'Connect customers with products, services and professionals.',
		points: ['Listings and search', 'Booking and payments', 'Ratings and messaging', 'Provider dashboards'],
	},
	{
		icon: 'shopping_bag',
		title: 'Shopping apps',
		text: 'Your store in your customers’ pockets, standalone or on top of your shop.',
		points: ['Catalog and checkout', 'Wishlists and history', 'Delivery tracking', 'Loyalty and offers'],
	},
	{
		icon: 'school',
		title: 'Education',
		text: 'Lessons, practice and feedback that keep learners coming back.',
		points: ['Courses and quizzes', 'Progress tracking', 'Achievements and leaderboards', 'Teacher accounts'],
	},
	{
		icon: 'fitness_center',
		title: 'Fitness and lifestyle',
		text: 'Habit and progress apps people open every day. Health data needs careful privacy design.',
		points: ['Plans and exercise library', 'Goals and reminders', 'Wearable integrations', 'Subscriptions'],
	},
	{
		icon: 'hotel',
		title: 'Hospitality and services',
		text: 'Better visits for hotels, restaurants and wellness centers, for guests, staff or both.',
		points: ['Reservations and check-in', 'Service requests', 'Loyalty programs', 'Staff tasks'],
	},
	{
		icon: 'groups',
		title: 'Community and social',
		text: 'Platforms that connect people, with permissions and moderation built in.',
		points: ['Profiles and groups', 'Feeds and messaging', 'Events and media', 'Reporting tools'],
	},
	{
		icon: 'extension',
		title: 'Custom apps',
		text: 'Field work, equipment, logistics, research or portals: we design the architecture around your workflow.',
	},
];

export interface MobileAppService {
	title: string;
	text: string;
	receive: string;
}

export const MOBILE_APP_SERVICES: MobileAppService[] = [
	{
		title: 'Consulting and planning',
		text: 'From a sketch or an idea to features, user roles, platforms, MVP scope, budget and timeline.',
		receive: 'A product concept, technical approach, feature scope and plan.',
	},
	{
		title: 'UI/UX design',
		text: 'User journeys, wireframes, screens and prototypes built around real tasks, with your brand or a new one.',
		receive: 'Approved designs ready for development.',
	},
	{
		title: 'MVP development',
		text: 'Launch the essentials, collect feedback and plan the next steps on evidence.',
		receive: 'A working app with core features and a roadmap.',
	},
	{
		title: 'Full-cycle development',
		text: 'Mobile app, backend, APIs, databases, admin tools, cloud and testing from one team.',
		receive: 'A complete, tested product.',
	},
	{
		title: 'Store publishing',
		text: 'Developer accounts, signing, listings, screenshots, privacy disclosures, beta testing and review submission.',
		receive: 'Release-ready builds and submission support.',
	},
	{
		title: 'Maintenance and growth',
		text: 'Fixes, OS updates, security, new features and analytics. We can also take over an existing app.',
		receive: 'An app that keeps working and improving.',
	},
];

export const MOBILE_APP_PLATFORMS: MobileAppCard[] = [
	{
		icon: 'devices',
		title: 'Cross-platform',
		text: 'One shared foundation for iOS, Android and the web with Angular, TypeScript and Capacitor. Some platform-specific work and testing remain.',
	},
	{
		icon: 'phone_iphone',
		title: 'Native',
		text: 'Swift and Kotlin when you need deep device access, heavy background work or specific performance.',
	},
	{
		icon: 'install_mobile',
		title: 'Progressive web app',
		text: 'An installable, app-like site with some offline features and no store release. Browser support varies.',
	},
];

export const MOBILE_APP_FEATURES: MobileAppCard[] = [
	{ icon: 'person', title: 'Accounts and sign-in', text: 'Email, social sign-in, recovery and roles.' },
	{ icon: 'credit_card', title: 'Payments and subscriptions', text: 'One-time, recurring and in-app purchases within store rules.' },
	{ icon: 'notifications', title: 'Push notifications', text: 'Messages, bookings and reminders, with user preferences.' },
	{ icon: 'qr_code_scanner', title: 'Camera and QR codes', text: 'Photos, uploads, QR and document scanning.' },
	{ icon: 'location_on', title: 'Maps and location', text: 'Directions, nearby places and check-ins.' },
	{ icon: 'cloud_off', title: 'Offline mode', text: 'Chosen tasks work offline and sync later.' },
	{ icon: 'chat', title: 'Messaging', text: 'In-app chat and external channels.' },
	{ icon: 'auto_awesome', title: 'AI features', text: 'Assistants, search and recommendations, weighed for accuracy, privacy and cost.' },
	{ icon: 'insights', title: 'Analytics', text: 'Usage, journeys and performance.' },
	{ icon: 'bluetooth', title: 'Devices and hardware', text: 'Bluetooth, NFC, sensors and wearables where supported.' },
	{ icon: 'dashboard', title: 'Admin dashboards', text: 'Manage users, content, payments and settings.' },
];

export const MOBILE_APP_AUDIENCES: MobileAppCard[] = [
	{ icon: 'rocket_launch', title: 'Startups', text: 'Shape the concept, prioritize the MVP and grow from feedback.' },
	{ icon: 'store', title: 'Small and medium businesses', text: 'Bookings, sales, field work and loyalty in your customers’ hands.' },
	{ icon: 'domain', title: 'Established companies', text: 'Bring your databases, CRM and ERP to mobile devices.' },
	{ icon: 'code', title: 'Product companies', text: 'Extra engineering capacity for your roadmap.' },
	{ icon: 'school', title: 'Organizations and education', text: 'Learning, scheduling and communication for members and students.' },
];

export const MOBILE_APP_DESIGN = [
	{ title: 'Clarity', text: 'The purpose and main actions are obvious.' },
	{ title: 'Consistency', text: 'Patterns behave the same across the app.' },
	{ title: 'Platform awareness', text: 'iOS, Android, tablet and browser each feel right.' },
	{ title: 'Accessibility', text: 'Readable text, large touch targets and good contrast.' },
	{ title: 'Performance', text: 'Fast responses and sensible loading.' },
	{ title: 'Brand identity', text: 'Your personality, without hurting usability.' },
];

export const MOBILE_APP_BACKEND: MobileAppCard[] = [
	{ icon: 'api', title: 'APIs and business logic', text: 'Workflows, permissions and data access.' },
	{ icon: 'database', title: 'Databases', text: 'Models for users, products, transactions and content.' },
	{ icon: 'hub', title: 'CRM and ERP integration', text: 'Customer and operational data in sync.' },
	{ icon: 'cloud', title: 'Cloud infrastructure', text: 'Hosting, deployment and monitoring.' },
	{ icon: 'shield', title: 'Security and access', text: 'Authentication, authorization and safe data handling.' },
	{ icon: 'admin_panel_settings', title: 'Admin interfaces', text: 'Control over the app’s daily operations.' },
];

export const MOBILE_APP_TECH = [
	{ title: 'Cross-platform', items: 'Angular, Ionic, Capacitor, React, React Native, Flutter, PWA' },
	{ title: 'Native', items: 'Swift, Kotlin, iOS and Android platform APIs' },
	{ title: 'Backend', items: 'Node.js, Express, NestJS, Python, PHP, Java, .NET' },
	{ title: 'Databases', items: 'MongoDB, PostgreSQL, MySQL, Redis' },
	{ title: 'Infrastructure', items: 'AWS, Google Cloud, Azure, Docker, CI/CD, monitoring' },
];

export interface MobileAppStep {
	title: string;
	text: string;
}

export const MOBILE_APP_STEPS: MobileAppStep[] = [
	{ title: 'Discovery', text: 'Goals, users, the concept and anything you already have.' },
	{ title: 'Planning and estimate', text: 'Scope, platforms, architecture, milestones, risks and cost.' },
	{ title: 'UI/UX design', text: 'Wireframes, mockups and prototypes for your approval.' },
	{ title: 'Development and QA', text: 'Iterations tested on devices: flows, APIs, permissions and performance.' },
	{ title: 'Publishing and launch', text: 'Beta, store assets, signing, submission and review feedback.' },
	{ title: 'Support and growth', text: 'Maintenance and new features based on real usage.' },
];

export const MOBILE_APP_PHASES: MobileAppStep[] = [
	{ title: 'Concept', text: 'Product, users and core value.' },
	{ title: 'Prototype', text: 'Validate screens and key flows.' },
	{ title: 'MVP', text: 'Essentials for a first audience.' },
	{ title: 'Product release', text: 'Features and infrastructure for a wider launch.' },
	{ title: 'Growth', text: 'Improve from usage and feedback.' },
];

export const MOBILE_APP_REASONS: MobileAppCard[] = [
	{ icon: 'workspace_premium', title: 'Over 10 years of experience', text: 'Planning, complexity and life after release, handled.' },
	{ icon: 'layers', title: 'A full-stack team', text: 'Design, mobile, backend, data, cloud and testing.' },
	{ icon: 'devices', title: 'Cross-platform expertise', text: 'Deep Angular and Capacitor experience, and alternatives when they fit better.' },
	{ icon: 'lightbulb', title: 'Business first', text: 'We start from the problem and users, not from screens or frameworks.' },
	{ icon: 'visibility', title: 'Transparent delivery', text: 'Scope, milestones and responsibilities agreed up front, progress you can review.' },
	{ icon: 'support_agent', title: 'A long-term partner', text: 'Publishing, updates and new features as your business grows.' },
];

export interface MobileAppFaq {
	question: string;
	answer: string;
}

export const MOBILE_APP_FAQS: MobileAppFaq[] = [
	{
		question: 'How much does it cost to develop a mobile app?',
		answer: 'It depends on features, design, platforms, backend and integrations. A small MVP and a large marketplace are very different. After we discuss your needs, you get a scope and estimate.',
	},
	{
		question: 'How long does it take to build an app?',
		answer: 'It depends on complexity, requirements and integrations. We estimate during planning and split the work into milestones.',
	},
	{
		question: 'Can one app work on iOS and Android?',
		answer: 'Yes. Cross-platform technology shares much of the app between both. How much depends on the features and architecture.',
	},
	{
		question: 'Do you only use Angular and Capacitor?',
		answer: 'No. They are our core tools, but we also use other frameworks and native development when the product needs it.',
	},
	{
		question: 'Should I build a hybrid or a native app?',
		answer: 'Cross-platform suits most business and consumer apps. Native is better for specialized device features, demanding performance or platform-specific behavior. We compare both first.',
	},
	{
		question: 'Can you build the backend too?',
		answer: 'Yes: APIs, databases, authentication, business logic and infrastructure, or integration with your existing backend.',
	},
	{
		question: 'Can my app work without internet?',
		answer: 'Selected workflows can work offline, storing data on the device and syncing when the connection returns.',
	},
	{
		question: 'Can you add payments and subscriptions?',
		answer: 'Yes. The right method depends on your business model, platforms and store policies.',
	},
	{
		question: 'Can you add AI features?',
		answer: 'Yes: assistants, recommendations, content processing and search. We check reliability, privacy and running costs first.',
	},
	{
		question: 'Can you publish my app to the App Store and Google Play?',
		answer: 'Yes. We help with accounts, signing, listings and submission. Apple and Google make the final decision and may ask for changes.',
	},
	{
		question: 'Who owns the developer accounts?',
		answer: 'We recommend you keep your own Apple and Google accounts and give us delegated access for publishing.',
	},
	{
		question: 'Who owns the source code?',
		answer: 'Code ownership, IP rights, infrastructure access and handover are set in the agreement before development starts.',
	},
	{
		question: 'Can you turn my website into an app?',
		answer: 'Possibly. We review the site first. Some parts can be reused, but simply wrapping a website rarely makes a good store app.',
	},
	{
		question: 'Can you improve or finish an existing app?',
		answer: 'Yes. We review the code, dependencies, documentation and risks, then propose fixes, modernization or next steps.',
	},
	{
		question: 'Can you build an admin dashboard?',
		answer: 'Yes, for users, products, payments, content and analytics. It can run in the browser even when the product is a mobile app.',
	},
	{
		question: 'Do you provide ongoing maintenance?',
		answer: 'Yes: fixes, OS updates, security, new features and releases, with the scope agreed separately.',
	},
	{
		question: 'Will my app be secure?',
		answer: 'We plan security around your features and risks. Testing, data handling and any external audits are set in the scope. No software is guaranteed free of vulnerabilities.',
	},
	{
		question: 'What if Apple or Google rejects the app?',
		answer: 'We review the feedback, find the rule involved and help make the changes.',
	},
	{
		question: 'Can we start with an MVP and grow later?',
		answer: 'Yes, and we often recommend it. You validate the product first and plan the next features with real user data.',
	},
];

export const MOBILE_APP_RELATED = [
	{ label: 'Website development', path: '/website' },
	{ label: 'Unity games and 3D', path: '/unity' },
	{ label: 'Mobile Development', path: '/service/mobile-development' },
	{ label: 'Back-End Development', path: '/service/back-end-development' },
	{ label: 'UI/UX Design', path: '/service/ui-ux-design' },
	{ label: 'System Integration', path: '/service/system-integration' },
	{ label: 'Quality Assurance', path: '/service/quality-assurance' },
	{ label: 'Technical Support Services', path: '/service/technical-support-services' },
];
