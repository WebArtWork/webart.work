import {
	SolutionCard,
	SolutionCopy,
	SolutionExample,
	SolutionFaq,
	SolutionStep,
} from '../../interfaces/solution-page.interface';

const LIVE_TOUR_URL = 'https://demchukdenys.com/virtual-tour';

export const VIRTUAL_TOUR_META = {
	title: '360° Virtual Tour Development',
	description:
		'Let customers walk through your showroom, hotel, office or property online. Web Art Work builds 360° virtual tours that embed into your website.',
};

export const VIRTUAL_TOUR_COPY: SolutionCopy = {
	title: 'Let customers walk through your space',
	subtitle:
		'A 360° virtual tour lets people move from room to room online, like in a street view map, before they visit.',
	cta: 'Discuss your tour',
	secondary: { label: 'See a live tour', href: LIVE_TOUR_URL },
	examplesTitle: 'A live tour you can try',
	examplesText:
		'The Demchuk Denys furniture showroom: 7 scenes, from the entrance to the living room, kitchen and bedroom.',
	cardsTitle: 'How the tour works',
	stepsTitle: 'From shoot to launch',
	stepsText: 'We handle the shoot, the scenes and the launch.',
	honestTitle: 'When a tour is not worth it',
	honestText:
		'If your space is one small room, good photos and a short video will do the job for less. We will tell you so.',
	closingTitle: 'Want your own virtual tour?',
	closingText: 'Tell us about your space. We will suggest the route and what the shoot takes.',
};

export const VIRTUAL_TOUR_EXAMPLES: SolutionExample[] = [
	{
		name: 'Demchuk Denys',
		image: '/partner/demchuk-denys.png',
		description: 'Custom kitchen and furniture workshop, with a 360° virtual tour of the showroom.',
		path: '/partner/demchuk-denys',
		link: { label: 'Open the virtual tour', href: LIVE_TOUR_URL },
	},
];

export const VIRTUAL_TOUR_CARDS: SolutionCard[] = [
	{
		icon: '360',
		title: 'Drag to look around',
		text: 'Turn in any direction with a finger or a mouse.',
	},
	{
		icon: 'footprint',
		title: 'Move between rooms',
		text: 'Tap a marker to step into the next room.',
	},
	{
		icon: 'devices',
		title: 'Works on phone and desktop',
		text: 'Opens in any browser, with no app to install.',
	},
	{
		icon: 'code',
		title: 'Embeds into your site',
		text: 'The tour lives on your own website, not on a third-party page.',
	},
];

export const VIRTUAL_TOUR_STEPS: SolutionStep[] = [
	{
		title: 'Plan the route',
		text: 'We choose the rooms and the path a visitor will walk.',
	},
	{
		title: 'Shoot 360° photos',
		text: 'Panoramas from each point, with even light.',
	},
	{
		title: 'Build scenes and transitions',
		text: 'We connect the panoramas and add markers between rooms.',
	},
	{
		title: 'Embed and launch',
		text: 'The tour goes live on your website and works on every device.',
	},
];

export const VIRTUAL_TOUR_FAQS: SolutionFaq[] = [
	{
		question: 'What equipment is needed?',
		answer: 'A 360° camera and a tripod. We can do the shoot, or work with 360° photos you already have.',
	},
	{
		question: 'Can we shoot it ourselves?',
		answer: 'Yes. We send you simple instructions, and you send us the 360° photos to build the tour.',
	},
	{
		question: 'How many rooms can a tour have?',
		answer: 'As many as you need. The showroom tour above has 7 scenes.',
	},
	{
		question: 'Can the tour be updated later?',
		answer: 'Yes. When a room changes, we reshoot that scene and replace it without rebuilding the tour.',
	},
];
