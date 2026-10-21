import { SOLUTIONS } from '../../data/solution.const';

/** Main navigation: the desktop topbar and the mobile bottom bar. */
export const NAV_LINKS = [
	{ label: 'Services', path: '/services', icon: 'design_services' },
	{ label: 'Solutions', path: '/solutions', icon: 'widgets' },
	{ label: 'Partners', path: '/partners', icon: 'handshake' },
	{ label: 'Startups', path: '/startups', icon: 'rocket_launch' },
	{ label: 'Pricing', path: '/pricing', icon: 'sell' },
];

/** Page name shown in the mobile topbar, keyed by the first URL segment. */
export const PAGE_NAMES: Record<string, string> = {
	'/': 'Web Art Work',
	...Object.fromEntries(NAV_LINKS.map((link) => [link.path, link.label])),
	...Object.fromEntries(SOLUTIONS.map((solution) => [solution.path, solution.title])),
	'/service': 'Services',
	'/partner': 'Partners',
	'/startup': 'Startups',
};
