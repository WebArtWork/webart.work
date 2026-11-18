import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	DEV_DIRECTIONS,
	DevPerson,
	PROJECT_LINK_TYPES,
	TASK_STATUSES,
} from '../../../../data/workflow.const';
import { weekText } from '../../../feature/workflow/week';
import { taskDirections, taskStatus } from '../../../feature/workflow/workflow.helpers';
import { Project, WorkflowTask } from '../../../interfaces/workflow.interface';

@Component({
	selector: 'app-task-modal',
	templateUrl: './task-modal.component.html',
	styleUrl: './task-modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskModalComponent {
	// Assigned by ModalService from the modal config.
	task!: WorkflowTask;
	project?: Project;
	person!: DevPerson;

	protected readonly directionInfo = DEV_DIRECTIONS;

	get status() {
		return taskStatus(this.task);
	}

	get statusLabel() {
		return TASK_STATUSES[this.status];
	}

	get directions() {
		return taskDirections(this.task, this.project);
	}

	get started() {
		return this.task.startedWeek ? weekText(this.task.startedWeek) : '';
	}

	get completed() {
		return this.task.completedWeek ? weekText(this.task.completedWeek) : '';
	}

	get projectDirections() {
		return this.project?.directions ?? [];
	}

	get links() {
		return (this.project?.links ?? []).map((link) => ({
			...link,
			...PROJECT_LINK_TYPES.find((type) => type.value === link.type)!,
			isUrl: /^https?:\/\//i.test(link.url),
		}));
	}
}
