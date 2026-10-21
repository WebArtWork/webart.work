export interface Solution {
	path: string;
	icon: string;
	image: string;
	title: string;
	text: string;
}

/** Dedicated solution pages, shown in the landing grid, /solutions and the footer. */
export const SOLUTIONS: Solution[] = [
	{
		path: '/website',
		image: '/service/web_development.jpg',
		icon: 'web',
		title: 'Websites',
		text: 'Landing pages and company sites, from $200.',
	},
	{
		path: '/market',
		image: '/service/business_analysis_strategy.jpg',
		icon: 'storefront',
		title: 'Marketplaces & e-commerce',
		text: 'Online stores, B2B platforms and multi-vendor marketplaces.',
	},
	{
		path: '/crm',
		image: '/service/data_solutions.jpg',
		icon: 'dashboard',
		title: 'CRM & business software',
		text: 'Custom CRM, automation and business operating systems.',
	},
	{
		path: '/virtual-tour',
		image: '/service/augmented_virtual_reality_solutions.jpg',
		icon: '360',
		title: '360° virtual tours',
		text: 'Let customers walk through your space online before they visit.',
	},
	{
		path: '/app',
		image: '/service/mobile_development.jpg',
		icon: 'smartphone',
		title: 'Mobile apps',
		text: 'One codebase for iOS, Android and web with Capacitor.',
	},
	{
		path: '/unity',
		image: '/service/unity_development.jpg',
		icon: 'sports_esports',
		title: 'Unity games and 3D',
		text: 'Games, 3D configurators and VR for web, mobile and Meta Quest.',
	},
	{
		path: '/ai',
		image: '/service/system_integration.jpg',
		icon: 'smart_toy',
		title: 'AI & automation',
		text: 'AI agents, chatbots, knowledge assistants and workflow automation.',
	},
	{
		path: '/blockchain',
		image: '/service/blockchain_solutions.jpg',
		icon: 'deployed_code',
		title: 'Blockchain development',
		text: 'Smart contracts, dApps, wallets and custom Cosmos SDK networks.',
	},
	{
		path: '/quantum',
		image: '/seo/artwork/quantum.png',
		icon: 'blur_on',
		title: 'Quantum computing',
		text: 'IBM Quantum in our startups and in client projects on request.',
	},
];

export const SOLUTIONS_META = {
	title: 'Solutions We Build: Websites, Apps, CRM and More',
	titleSuffix: '',
	description:
		'Websites, marketplaces, CRM, mobile apps, Unity games, 360° tours, AI, blockchain and quantum computing, each with its own page of examples and process.',
};
