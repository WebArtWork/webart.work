import {
	SolutionCard,
	SolutionCopy,
	SolutionExample,
	SolutionFaq,
	SolutionStep,
} from '../../interfaces/solution-page.interface';

export const MOBILE_APP_META = {
	title: 'Hybrid Mobile App Development with Capacitor',
	description:
		'One codebase for iOS, Android and the web. Web Art Work builds hybrid mobile apps with Capacitor and publishes them to the App Store and Google Play.',
};

export const MOBILE_APP_COPY: SolutionCopy = {
	title: 'One app for iOS, Android and web',
	subtitle:
		'We build hybrid apps with Capacitor, so you ship on every platform from one codebase and pay for one app instead of two.',
	cta: 'Discuss your app',
	examplesTitle: 'Apps we have shipped',
	examplesText: 'UA Code, an app for learning programming in Ukrainian, is live on the App Store.',
	cardsTitle: 'Why hybrid with Capacitor',
	stepsTitle: 'From idea to the stores',
	stepsText: 'Design, build, publishing and support from one team.',
	honestTitle: 'When a native app is the better choice',
	honestText:
		'Heavy 3D, advanced games or very demanding performance work better as native or Unity apps. If your app needs that, we will tell you before we start.',
	closingTitle: 'Planning a mobile app?',
	closingText:
		'Tell us what it should do. We will say whether hybrid fits and what the first release takes.',
};

export const MOBILE_APP_EXAMPLES: SolutionExample[] = [
	{
		name: 'UA Code',
		image: '/partner/ua-code.png',
		description:
			'An app for learning programming in Ukrainian, built from design to App Store release.',
		path: '/partner/ua-code',
		link: {
			label: 'Open in the App Store',
			href: 'https://apps.apple.com/ua/app/ua-code/id6744689084?l=uk',
		},
	},
];

export const MOBILE_APP_CARDS: SolutionCard[] = [
	{
		icon: 'devices',
		title: 'One codebase, three platforms',
		text: 'The same code runs on iOS, Android and the web, so features ship everywhere at once.',
	},
	{
		icon: 'photo_camera',
		title: 'Native features',
		text: 'Camera, push notifications, geolocation and more through Capacitor plugins.',
	},
	{
		icon: 'storefront',
		title: 'Store publishing',
		text: 'We prepare the listings and publish to the App Store and Google Play.',
	},
	{
		icon: 'system_update',
		title: 'Faster updates',
		text: 'Some updates reach users without a full store release, where store rules allow.',
	},
];

export const MOBILE_APP_STEPS: SolutionStep[] = [
	{
		title: 'Scope and screens',
		text: 'We agree on the features, screens and platforms for the first release.',
	},
	{
		title: 'Design',
		text: 'Clickable screens you test on your phone before we build.',
	},
	{
		title: 'Build',
		text: 'One Angular and Capacitor codebase, with native plugins where needed.',
	},
	{
		title: 'Testing on real devices',
		text: 'We test on iPhone and Android phones, not just in a browser.',
	},
	{
		title: 'Store release',
		text: 'Listings, screenshots and review submission for both stores.',
	},
	{
		title: 'Updates and support',
		text: 'Bug fixes, OS updates and new features after launch.',
	},
];

export const MOBILE_APP_FAQS: SolutionFaq[] = [
	{
		question: 'Is a hybrid app slower than a native app?',
		answer: 'For most business apps the difference is not noticeable. Heavy 3D and demanding real-time graphics are the exception.',
	},
	{
		question: 'Who owns the store accounts?',
		answer: 'You do. We help you create Apple and Google developer accounts and publish the app under your name.',
	},
	{
		question: 'Can the app work offline?',
		answer: 'Yes. Data can be stored on the device and synced when the connection returns.',
	},
	{
		question: 'What does maintenance include?',
		answer: 'Updates for new iOS and Android versions, bug fixes and store requirement changes. We agree on the scope before launch.',
	},
];
