/**
 * The one list of categories. Everything that has a category (packages, roadmaps, requests, projects,
 * tasks, developer profiles) reads it, so a new category is added here and in no other place in the app.
 * The order is the order everywhere. `waw` is a module of the waw framework (https://wawjs.dev/), our API product.
 */
export const DEV_DIRECTIONS = {
	angular: {
		label: 'Angular',
		icon: 'code',
		description:
			'Fast, prerendered websites and web apps built with Angular, TypeScript and Tailwind CSS.',
	},
	unity: {
		label: 'Unity',
		icon: 'deployed_code',
		description:
			'Games, 3D scenes and interactive experiences built with Unity for mobile, desktop and VR.',
	},
	waw: {
		label: 'waw',
		icon: 'waw',
		description:
			'Modules of the waw framework, our API product for building backends and services.',
	},
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
} satisfies Record<string, { label: string; icon: string; description: string }>;

export type DevDirection = keyof typeof DEV_DIRECTIONS;
/** A category and a direction are the same thing. */
export type PackageCategory = DevDirection;

/** The categories as options of the chip picker, in the shared order. */
export const DEV_DIRECTION_OPTIONS: { value: DevDirection; label: string; icon: string }[] = (
	Object.keys(DEV_DIRECTIONS) as DevDirection[]
).map((key) => ({
	value: key,
	label: DEV_DIRECTIONS[key].label,
	icon: DEV_DIRECTIONS[key].icon,
}));

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

export const PACKAGE_CATEGORIES = DEV_DIRECTION_OPTIONS;

/** The licenses a package or project can have. MIT is the only one for now, and the default. */
export const LICENSES = [{ value: 'mit', label: 'MIT' }] satisfies { value: string; label: string }[];

export type License = (typeof LICENSES)[number]['value'];

export const DEFAULT_LICENSE: License = 'mit';

/** Items saved before licenses existed count as MIT. */
export const licenseLabel = (license?: License) =>
	LICENSES.find((item) => item.value === (license ?? DEFAULT_LICENSE))?.label ?? '';

export type TaskStatus = 'new' | 'in-progress' | 'completed';

export const TASK_STATUSES: Record<TaskStatus, string> = {
	new: 'New',
	'in-progress': 'In progress',
	completed: 'Completed',
};

export type RoadmapStatus = 'open' | 'planned' | 'in-progress' | 'done';

export const ROADMAP_STATUSES: { value: RoadmapStatus; label: string }[] = [
	{ value: 'open', label: 'Open' },
	{ value: 'planned', label: 'Planned' },
	{ value: 'in-progress', label: 'In progress' },
	{ value: 'done', label: 'Done' },
];

export type RequestType = 'package' | 'roadmap' | 'improvement' | 'bug';

export const REQUEST_TYPES: { value: RequestType; label: string; icon: string }[] = [
	{ value: 'package', label: 'Package', icon: 'package_2' },
	{ value: 'roadmap', label: 'Roadmap', icon: 'route' },
	{ value: 'improvement', label: 'Improvement', icon: 'trending_up' },
	{ value: 'bug', label: 'Bug', icon: 'bug_report' },
];

export type RequestStatus = 'new' | 'handled';
