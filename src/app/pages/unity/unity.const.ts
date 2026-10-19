import {
	SolutionCard,
	SolutionCopy,
	SolutionExample,
	SolutionFaq,
	SolutionStep,
} from '../../interfaces/solution-page.interface';

export const UNITY_META = {
	title: 'Unity Game and 3D App Development',
	description:
		'Web Art Work builds Unity games and interactive 3D for web, mobile, desktop and VR headsets like Meta Quest.',
};

export const UNITY_COPY: SolutionCopy = {
	title: 'Unity games and interactive 3D',
	subtitle:
		'We build games, 3D configurators and VR experiences that run in the browser, on phones, on desktop and on Meta Quest.',
	cta: 'Discuss your project',
	examplesTitle: 'Games are part of what we do',
	examplesText: 'WAW Play and our esports team are the gaming side of Web Art Work.',
	cardsTitle: 'What we build with Unity',
	stepsTitle: 'From concept to release',
	stepsText: 'Prototype first, so you can play it before the full build.',
	honestTitle: 'Not every 3D idea needs Unity',
	honestText:
		'A simple product viewer or a 360° tour can run on plain web technology, which is lighter and cheaper. We will suggest that when it fits.',
	closingTitle: 'Have a game or 3D idea?',
	closingText:
		'Tell us what you want players to do. We will suggest platforms and what a first prototype takes.',
};

export const UNITY_EXAMPLES: SolutionExample[] = [
	{
		name: 'WAW Play',
		image: '/startup/play.webp',
		description: 'A platform for our games and fictional worlds, with rankings and a player community.',
		path: '/startup/play',
		link: { label: 'play.webart.work', href: 'https://play.webart.work' },
	},
	{
		name: 'Web Art Work Esports',
		image: '/startup/team.webp',
		description: 'Our esports teams, matches and a gaming community rooted in Ukraine.',
		path: '/startup/team',
		link: { label: 'team.webart.work', href: 'https://team.webart.work' },
	},
];

export const UNITY_CARDS: SolutionCard[] = [
	{
		icon: 'sports_esports',
		title: 'Games',
		text: 'Casual and multiplayer games for mobile, desktop and the web.',
	},
	{
		icon: 'deployed_code',
		title: 'Product configurators',
		text: 'Let customers rotate, color and assemble your product in 3D.',
	},
	{
		icon: 'view_in_ar',
		title: 'VR and AR',
		text: 'Experiences for Meta Quest headsets and AR on phones.',
	},
	{
		icon: 'language',
		title: 'WebGL in the browser',
		text: 'Unity builds that open on your website, with nothing to install.',
	},
];

export const UNITY_STEPS: SolutionStep[] = [
	{
		title: 'Concept',
		text: 'Core mechanic, platforms and art style, agreed on paper first.',
	},
	{
		title: 'Playable prototype',
		text: 'A rough build you can try, to check that the idea works.',
	},
	{
		title: 'Art and 3D',
		text: 'Models, animation and UI in the chosen style.',
	},
	{
		title: 'Production',
		text: 'Levels, features, multiplayer and backend where needed.',
	},
	{
		title: 'Testing',
		text: 'Playtests and performance checks on target devices.',
	},
	{
		title: 'Release and updates',
		text: 'Store publishing, then patches and new content.',
	},
];

export const UNITY_FAQS: SolutionFaq[] = [
	{
		question: 'Which platforms can you build for?',
		answer: 'Web (WebGL), iOS, Android, Windows, macOS and VR headsets like Meta Quest.',
	},
	{
		question: 'Can you build multiplayer games?',
		answer: 'Yes. We pick the networking setup and backend that fit the number of players and the type of game.',
	},
	{
		question: 'Can you publish to the stores?',
		answer: 'Yes. We prepare builds and listings for the App Store, Google Play and the Meta Horizon Store.',
	},
	{
		question: 'Who owns the code and assets?',
		answer: 'You do. Source code, 3D models and project files are handed over to you.',
	},
];
