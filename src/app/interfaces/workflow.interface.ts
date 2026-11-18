import { DevDirection, ProjectLinkType, TaskStatus } from '../../data/workflow.const';

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
