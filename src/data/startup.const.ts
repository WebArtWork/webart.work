export interface Startup {
	id: string;
	name: string;
	tagline: string;
	description: string;
	image: string;
	website?: string;
}

export const STARTUPS: Startup[] = [
	{
		id: 'bodycare',
		name: 'Body Care',
		tagline: 'Care That Feels Personal',
		description:
			'A body care marketplace for finding trusted studios, specialists, treatments, and wellbeing services in one thoughtful place.',
		image: '/startup/bodycare.png',
		website: 'bodycare.webart.work',
	},
	{
		id: 'healthcare',
		name: 'Health Care',
		tagline: 'Care You Can Trust',
		description:
			'A healthcare marketplace for discovering trusted clinics, specialists, services, and the information needed to make confident care decisions.',
		image: '/startup/healthcare.png',
		website: 'healthcare.webart.work',
	},
	{
		id: 'fashion',
		name: 'Fashion',
		tagline: 'Find Your Personal Style',
		description:
			'A fashion marketplace for discovering boutiques, designers, collections, and style services that make every look feel personal.',
		image: '/startup/fashion.png',
		website: 'fashion.webart.work',
	},
	{
		id: 'conference',
		name: 'Conference',
		tagline: 'Your Talk, Live and Interactive',
		description:
			'A live companion for conferences, talks, workshops, and webinars — visitors follow along, ask questions, join polls and quizzes, and react per chapter, all from a single link with no account required.',
		image: '/startup/conference.png',
		website: 'conference.webart.work',
	},
	{
		id: 'meetka',
		name: 'Meetka',
		tagline: 'Social Meetups Over Coffee',
		description:
			'A social app that turns coffee shops into meeting points — discover meetups, nearby cafés, and baristas, and build real connections over coffee.',
		image: '/startup/meetka.png',
		website: 'meetka.webart.work',
	},
	{
		id: 'kp-sup-kp',
		name: 'KP - SUP - KP',
		tagline: 'SUP Adventures on the Dniester',
		description:
			'Guided SUP adventures on the Dniester with transfers from Kamianets-Podilskyi, curated routes, challenges, booking, maps, and groups up to four.',
		image: '/startup/kp-sup-kp.png',
		website: 'kp-sup-kp.itkamianets.com',
	},
	{
		id: 'neryxomka',
		name: 'Neryxomka',
		tagline: 'Digital History for Real Estate',
		description:
			"A real estate platform for discovering properties, listings, agents and developers while preserving each property's long-term records and history.",
		image: '/startup/neryxomka.png',
	},
	{
		id: 'waiter-cloud',
		name: 'Waiter Cloud',
		tagline: 'Food, People, Places, Opportunities',
		description:
			'A food industry platform for recipes, restaurants, cooking schools, professionals, jobs, contracts, reviews, discovery, and cooking ideas.',
		image: '/startup/waiter-cloud.png',
	},
	{
		id: 'todo',
		name: 'ToDo',
		tagline: 'Boards Meet Structure',
		description:
			'A project/task management app sitting between lightweight boards and structured issue tracking, organized around tags, projects, tasks, sprints, and releases.',
		image: '/startup/todo.png',
		website: 'todo.webart.work',
	},
	{
		id: 'vinhub',
		name: 'Vinhub',
		tagline: 'Digital History for Every Vehicle',
		description:
			'A vehicle industry platform for discovering cars, listings, dealers, and ownership records while preserving each vehicle’s long-term history.',
		image: '/startup/vinhub.png',
		website: 'vinhub.webart.work',
	},
	{
		id: 'ternopil-space',
		name: 'Ternopil Space',
		tagline: 'Digital services for Ternopil',
		description:
			'Ternopil Space builds websites, CRM systems, portals, and automation tools for local businesses, students, and community projects.',
		image: '/startup/ternopil-space.png',
		website: 'ternopil.space',
	},
	{
		id: 'uman-it-space',
		name: 'Uman IT Space',
		tagline: 'IT portal for Uman',
		description:
			'Uman IT Space provides websites, CRM systems, booking tools, and automation for local businesses, students, and community projects.',
		image: '/startup/uman-it-space.png',
		website: 'umanit.space',
	},
	{
		id: 'volyn-it-space',
		name: 'Volyn IT Space',
		tagline: 'Regional digital infrastructure',
		description:
			'Volyn IT Space builds regional websites, CRM systems, portals, and automation tools for businesses, students, and communities.',
		image: '/startup/volyn-it-space.png',
		website: 'volynit.space',
	},
	{
		id: 'vinnytsia-it-space',
		name: 'Vinnytsia IT Space',
		tagline: 'Digital products for Vinnytsia',
		description:
			'Vinnytsia IT Space creates websites, CRM systems, portals, and automation tools for local businesses, students, and community projects.',
		image: '/startup/vinnytsia-it-space.png',
		website: 'vinnytsiait.space',
	},
	{
		id: 'frankivsk-space',
		name: 'Frankivsk Space',
		tagline: 'IT services for Frankivsk',
		description:
			'Frankivsk Space builds websites, CRM systems, portals, and automation tools for Ivano-Frankivsk businesses, students, and communities.',
		image: '/startup/frankivsk-space.png',
		website: 'frankivsk.space',
	},
	{
		id: 'chernivtsi-space',
		name: 'Chernivtsi Space',
		tagline: 'Digital growth for Chernivtsi',
		description:
			'Chernivtsi Space provides websites, CRM systems, local portals, and automation tools for businesses, students, and community projects.',
		image: '/startup/chernivtsi-space.png',
		website: 'chernivtsi.space',
	},
	{
		id: 'london-it-space',
		name: 'London IT Space',
		tagline: 'Digital services for London',
		description:
			'London IT Space creates websites, CRM systems, portals, and automation tools for London businesses, startups, and community projects.',
		image: '/startup/london-it-space.png',
		website: 'londonit.space',
	},
	{
		id: 'greece-it-space',
		name: 'Greece IT Space',
		tagline: 'IT services for Greece',
		description:
			'Greece IT Space builds websites, CRM systems, business portals, and automation tools for Greek companies, startups, and communities.',
		image: '/startup/greece-it-space.png',
		website: 'greeceit.space',
	},
];

export const STARTUPS_META = {
	title: 'Startups',
	description:
		'Explore the startups Web Art Work is building and growing in-house, alongside client delivery.',
};
