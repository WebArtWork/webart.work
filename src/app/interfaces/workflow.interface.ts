import {
	DevDirection,
	License,
	PackageCategory,
	ProjectLinkType,
	RequestStatus,
	RequestType,
	RoadmapStatus,
	TaskStatus,
} from '../../data/workflow.const';

export interface ProjectLink {
	type: ProjectLinkType;
	url: string;
}

/** Shared by every signed-in user. */
export interface Project {
	id: string;
	name: string;
	description: string;
	/** Missing on projects saved before directions existed. */
	directions?: DevDirection[];
	/** Missing on projects saved before links existed. */
	links?: ProjectLink[];
	/** Missing on projects saved before licenses existed: they are MIT. */
	license?: License;
	createdAt: number;
}

/** Shared by every signed-in user. */
export interface Package {
	id: string;
	name: string;
	description: string;
	/** Github repository URL. */
	repo: string;
	/** npm package page URL, when the package is published there. */
	npm?: string;
	category: PackageCategory;
	/** Missing on items saved before licenses existed: they are MIT. */
	license?: License;
	createdAt: number;
}

/** One per signed-in user; the document id is the Firebase uid. Readable by every signed-in user. */
export interface Profile {
	id: string;
	email: string;
	fullName: string;
	/** Public URL of the avatar uploaded through the API. */
	avatar: string;
	/** Missing on profiles saved before contacts existed. */
	phone?: string;
	linkedin?: string;
	upwork?: string;
	/** Categories this developer can work on. */
	directions: DevDirection[];
	/** Other emails their commits may use, for example on another GitHub account. Private to the team. */
	alternativeEmails?: string[];
	/** Written by the API when an MCP token is generated; the token itself is never stored. */
	mcpTokenExpiresAt?: number;
	createdAt: number;
}

/** Private to the user in `uid`. */
export interface WorkflowTask {
	id: string;
	uid: string;
	title: string;
	status: TaskStatus;
	/** Legacy flag from tasks saved before statuses existed. */
	done?: boolean;
	/** Categories worked on; only used when the project has more than one direction. */
	directions?: DevDirection[];
	/** Who created it; decides the timeline column. */
	ownerEmail?: string;
	/** ISO week keys such as `2026-W47`, written when the task is started and completed. */
	startedWeek?: string;
	startedAt?: number;
	completedWeek?: string;
	completedAt?: number;
	/** Empty when the task belongs to no project. */
	projectId: string;
	createdAt: number;
}

/** What a roadmap shows publicly about a linked task: no owner and no email. */
export interface RoadmapTask {
	id: string;
	title: string;
	status: TaskStatus;
}

/**
 * A bigger piece of work that groups projects, tasks, packages and developers. The public Development
 * page lists the title and description; the rest opens in a modal.
 */
export interface Roadmap {
	id: string;
	title: string;
	description: string;
	/** At least one; missing on roadmaps saved before there could be several. */
	categories?: PackageCategory[];
	status: RoadmapStatus;
	projectIds: string[];
	taskIds: string[];
	/** Snapshot of the linked tasks for the public modal; kept up to date while the team uses the workflow. */
	tasks?: RoadmapTask[];
	packageIds: string[];
	/** Firebase uids of the developers working on it. */
	developerIds: string[];
	createdAt: number;
}

/** Public part of a developer's profile; written whenever they save their profile. */
export interface Developer {
	/** The Firebase uid. */
	id: string;
	fullName: string;
	avatar: string;
	linkedin: string;
	upwork: string;
	directions: DevDirection[];
	createdAt: number;
}

/** What the week holds for one package or roadmap. */
export interface PlanEntry {
	/** A package id or a roadmap id, depending on the section. */
	id: string;
	text: string;
}

/** The AI-prepared plan for one week; readable by everyone. */
export interface DevelopmentPlan {
	id: string;
	title: string;
	/** ISO week key such as 2026-W48. */
	week: string;
	/** Short summary of the week. */
	content: string;
	/** Work on public packages. Missing on plans saved before sections existed. */
	packages?: PlanEntry[];
	/** Work on roadmaps, which are local to the team. */
	roadmaps?: PlanEntry[];
	createdAt: number;
}

/** A signed-in account that asked for access to the workflow. Written by the account, read by the CEO. */
export interface AccessRequest {
	/** The Firebase uid. */
	id: string;
	email: string;
	name: string;
	createdAt: number;
}

/** A developer the CEO approved. The document id is the Firebase uid. */
export interface TeamMember {
	id: string;
	email: string;
	name: string;
	createdAt: number;
}

/** One vote per visitor and target; the document id is targetId, an underscore and the uid. */
export interface Vote {
	id: string;
	targetId: string;
	uid: string;
	value: 1 | -1;
	createdAt: number;
}

/** Written by visitors signed in with Google. */
export interface FeedbackComment {
	id: string;
	/** A feature or plan id. */
	targetId: string;
	uid: string;
	authorName: string;
	text: string;
	createdAt: number;
}

/** Sent from the public Development page by a visitor signed in with Google; only the team reads it. */
export interface WorkRequest {
	id: string;
	type: RequestType;
	category: PackageCategory;
	title: string;
	description: string;
	/** Only for package requests, and optional. */
	repo: string;
	status: RequestStatus;
	uid: string;
	authorName: string;
	authorEmail: string;
	createdAt: number;
}
