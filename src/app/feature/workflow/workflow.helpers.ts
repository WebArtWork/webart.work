import { DevDirection, TaskStatus } from '../../../data/workflow.const';
import { Project, WorkflowTask } from '../../interfaces/workflow.interface';

/** Tasks saved before statuses existed only carry the legacy `done` flag. */
export const taskStatus = (task: WorkflowTask): TaskStatus =>
	task.status ?? (task.done ? 'completed' : 'new');

/** A single-category project tags its tasks automatically; otherwise the developer's picks. */
export const taskDirections = (task: WorkflowTask, project?: Project): DevDirection[] => {
	const projectDirections = project?.directions ?? [];

	return projectDirections.length === 1 ? projectDirections : (task.directions ?? []);
};
