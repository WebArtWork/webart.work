import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	computed,
	inject,
	signal,
} from '@angular/core';
import { ModalService } from '@wawjs/ngx-ui';
import {
	DEV_DIRECTIONS,
	DevDirection,
	TASK_STATUSES,
	TaskStatus,
} from '../../../../data/workflow.const';
import { AuthService } from '../../../feature/auth/auth.service';
import { ProjectsService } from '../../../feature/workflow/projects.service';
import { TasksService } from '../../../feature/workflow/tasks.service';
import { weekKey } from '../../../feature/workflow/week';
import { taskDirections, taskStatus } from '../../../feature/workflow/workflow.helpers';
import { WorkflowTask } from '../../../interfaces/workflow.interface';
import { SeoService } from '../../../services/seo.service';
import { ConfirmDeleteComponent } from '../confirm-delete.component';
import { TaskFormComponent } from './task-form.component';

@Component({
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
	private readonly _modalService = inject(ModalService);
	private readonly _projectsService = inject(ProjectsService);
	private readonly _authService = inject(AuthService);

	protected readonly tasksService = inject(TasksService);
	protected readonly directionInfo = DEV_DIRECTIONS;
	protected readonly statusLabels = TASK_STATUSES;

	protected readonly showCompleted = signal(false);

	protected readonly completedCount = computed(
		() =>
			this.tasksService.items().filter((task) => this.statusOf(task) === 'completed').length,
	);

	/** Open tasks by default; only completed ones while the toggle is on. */
	protected readonly visibleTasks = computed(() =>
		this.tasksService
			.items()
			.filter((task) => (this.statusOf(task) === 'completed') === this.showCompleted()),
	);

	private readonly _projects = computed(
		() => new Map(this._projectsService.items().map((project) => [project.id, project])),
	);

	constructor() {
		inject(SeoService).apply({
			title: 'Tasks',
			description: 'Your private Web Art Work tasks.',
			path: '/workflow/tasks',
			robots: 'noindex, nofollow',
		});

		this.tasksService.watch();
		this._projectsService.watch();
		inject(DestroyRef).onDestroy(() => {
			this.tasksService.unwatch();
			this._projectsService.unwatch();
		});
	}

	protected statusOf(task: WorkflowTask): TaskStatus {
		return taskStatus(task);
	}

	protected projectName(task: WorkflowTask) {
		return this._projects().get(task.projectId)?.name;
	}

	protected directionsOf(task: WorkflowTask): DevDirection[] {
		return taskDirections(task, this._projects().get(task.projectId));
	}

	protected add() {
		this._modalService.show({
			component: TaskFormComponent,
			size: 'small',
			ariaLabelledBy: 'task-form-title',
			save: (value: { title: string; projectId: string; directions: DevDirection[] }) =>
				this.tasksService.add({
					...value,
					status: 'new',
					ownerEmail: this._authService.user()?.email ?? '',
				}),
		});
	}

	protected edit(task: WorkflowTask) {
		this._modalService.show({
			component: TaskFormComponent,
			size: 'small',
			ariaLabelledBy: 'task-form-title',
			task,
			save: (value: { title: string; projectId: string; directions: DevDirection[] }) =>
				this.tasksService.update(task.id, value),
		});
	}

	protected setStatus(task: WorkflowTask, status: TaskStatus) {
		const now = Date.now();
		const week = weekKey();

		// The week is memoed so the timeline can show when work started and finished.
		this.tasksService.update(
			task.id,
			status === 'in-progress'
				? { status, startedAt: now, startedWeek: week }
				: { status, completedAt: now, completedWeek: week },
		);
	}

	protected remove(item: { id: string; title: string }) {
		this._modalService.show({
			component: ConfirmDeleteComponent,
			size: 'small',
			ariaLabelledBy: 'confirm-delete-title',
			heading: 'Delete task',
			message: `Delete "${item.title}"? This cannot be undone.`,
			confirm: () => this.tasksService.remove(item.id),
		});
	}
}
