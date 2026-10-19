export interface Solution {
	path: string;
	icon: string;
	title: string;
	text: string;
}

/** Dedicated solution pages, shown in the landing grid and the footer. */
export const SOLUTIONS: Solution[] = [
	{
		path: '/website',
		icon: 'web',
		title: 'Websites',
		text: 'Landing pages, company sites and online shops, from $200.',
	},
	{
		path: '/app',
		icon: 'smartphone',
		title: 'Mobile apps',
		text: 'One codebase for iOS, Android and web with Capacitor.',
	},
	{
		path: '/unity',
		icon: 'sports_esports',
		title: 'Unity games and 3D',
		text: 'Games, 3D configurators and VR for web, mobile and Meta Quest.',
	},
	{
		path: '/virtual-tour',
		icon: '360',
		title: '360° virtual tours',
		text: 'Let customers walk through your space online before they visit.',
	},
	{
		path: '/blockchain',
		icon: 'deployed_code',
		title: 'Blockchain development',
		text: 'Smart contracts, dApps, wallets and custom Cosmos SDK networks.',
	},
	{
		path: '/quantum',
		icon: 'blur_on',
		title: 'Quantum computing',
		text: 'IBM Quantum in our startups and in client projects on request.',
	},
];
