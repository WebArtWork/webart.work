export type DevDirection = 'ai' | 'blockchain' | 'unity' | 'angular';

export const DEV_DIRECTIONS: Record<
	DevDirection,
	{ label: string; icon: string; description: string }
> = {
	ai: {
		label: 'AI',
		icon: 'smart_toy',
		description:
			'AI assistants, automation and smart features we build into websites, apps and CRM systems.',
	},
	blockchain: {
		label: 'Blockchain',
		icon: 'link',
		description:
			'Smart contracts, tokens and on-chain integrations for products that need transparent, verifiable data.',
	},
	unity: {
		label: 'Unity',
		icon: 'deployed_code',
		description:
			'Games, 3D scenes and interactive experiences built with Unity for mobile, desktop and VR.',
	},
	angular: {
		label: 'Angular',
		icon: 'code',
		description:
			'Fast, prerendered websites and web apps built with Angular, TypeScript and Tailwind CSS.',
	},
};

export type DevPersonKey = 'denys' | 'kristina';

export interface DevPerson {
	key: DevPersonKey;
	name: string;
	role: string;
	about: string;
}

/** Signs in with this email; every other allowed account is Denys. */
export const KRISTINA_EMAIL = 'kristina@webart.work';

export const DEV_PEOPLE: DevPerson[] = [
	{
		key: 'denys',
		name: 'Denys Honchar',
		role: 'CEO',
		about: 'Leads Web Art Work and builds the products, from architecture to delivery. Projects he works on will be listed here.',
	},
	{
		key: 'kristina',
		name: 'Kristina Olefirenko',
		role: 'Full stack developer',
		about: 'Builds both the frontend and the backend of our websites and apps. Projects she works on will be listed here.',
	},
];

export type ProjectLinkType =
	'github' | 'website' | 'instagram' | 'linkedin' | 'thread' | 'facebook' | 'other';

export const PROJECT_LINK_TYPES: { value: ProjectLinkType; label: string; icon: string }[] = [
	{ value: 'github', label: 'Github', icon: 'code' },
	{ value: 'website', label: 'Website', icon: 'language' },
	{ value: 'instagram', label: 'Instagram', icon: 'photo_camera' },
	{ value: 'linkedin', label: 'LinkedIn', icon: 'work' },
	{ value: 'thread', label: 'Thread', icon: 'forum' },
	{ value: 'facebook', label: 'Facebook', icon: 'groups' },
	{ value: 'other', label: 'Other', icon: 'link' },
];

export type TaskStatus = 'new' | 'in-progress' | 'completed';

export const TASK_STATUSES: Record<TaskStatus, string> = {
	new: 'New',
	'in-progress': 'In progress',
	completed: 'Completed',
};
