import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject } from '@angular/core';
import { CategoryIconComponent } from '../../../components/category-icon.component';
import { ModalService } from '@wawjs/ngx-ui';
import {
	DEV_DIRECTIONS,
	DEV_PEOPLE,
	DevDirection,
	DevPerson,
	DevPersonKey,
	KRISTINA_EMAIL,
} from '../../../../data/workflow.const';
import { AuthService } from '../../../feature/auth/auth.service';
import { ProfilesService } from '../../../feature/workflow/profiles.service';
import { ProjectsService } from '../../../feature/workflow/projects.service';
import { TimelineTasksService } from '../../../feature/workflow/timeline-tasks.service';
import { weekKey, weekLabel } from '../../../feature/workflow/week';
import { taskDirections } from '../../../feature/workflow/workflow.helpers';
import { Project, WorkflowTask } from '../../../interfaces/workflow.interface';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { SeoService } from '../../../services/seo.service';
import { DeveloperModalComponent } from './developer-modal.component';
import { DirectionModalComponent } from './direction-modal.component';
import { TaskModalComponent } from './task-modal.component';

interface TimelineEntry {
	task: WorkflowTask;
	project?: Project;
	directions: DevDirection[];
	/** Completed in this very week. */
	done: boolean;
}

@Component({
	imports: [TranslatePipe, CategoryIconComponent],
	templateUrl: './timeline.component.html',
	styleUrl: './timeline.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
	private readonly _seoService = inject(SeoService);
	private readonly _modalService = inject(ModalService);
	private readonly _authService = inject(AuthService);
	private readonly _tasksService = inject(TimelineTasksService);
	private readonly _projectsService = inject(ProjectsService);
	private readonly _profilesService = inject(ProfilesService);

	protected readonly directions = DEV_DIRECTIONS;
	protected readonly loading = this._tasksService.loading;
	protected readonly error = this._tasksService.error;

	/** The running week, plus every week in which a task was started or completed. */
	protected readonly weeks = computed(() => {
		const current = weekKey();
		const tasks = this._tasksService.items();
		const projects = new Map(
			this._projectsService.items().map((project) => [project.id, project]),
		);
		const keys = new Set([current]);
		// Names come from the profile each developer fills in; the static name is the fallback.
		const people = DEV_PEOPLE.map((person) => {
			const profile = this._profilesService
				.items()
				.find((item) => (item.email === KRISTINA_EMAIL ? 'kristina' : 'denys') === person.key);

			return { ...person, name: profile?.fullName || person.name };
		});

		for (const task of tasks) {
			if (task.startedWeek) {
				keys.add(task.startedWeek);
			}

			if (task.completedWeek) {
				keys.add(task.completedWeek);
			}
		}

		return [...keys]
			.sort()
			.reverse()
			.map((key) => ({
				key,
				...weekLabel(key),
				current: key === current,
				columns: people.map((person) => ({
					person,
					entries: tasks
						.filter(
							(task) =>
								this._personOf(task) === person.key &&
								(task.startedWeek === key || task.completedWeek === key),
						)
						.map((task): TimelineEntry => {
							const project = projects.get(task.projectId);

							return {
								task,
								project,
								directions: taskDirections(task, project),
								done: task.completedWeek === key,
							};
						}),
				})),
			}));
	});

	constructor() {
		this._seoService.apply({
			title: 'Workflow timeline',
			description: 'Weekly progress of the Web Art Work team.',
			path: '/workflow',
			robots: 'noindex, nofollow',
		});

		this._tasksService.watch();
		this._projectsService.watch();
		this._profilesService.watch();
		inject(DestroyRef).onDestroy(() => {
			this._tasksService.unwatch();
			this._projectsService.unwatch();
			this._profilesService.unwatch();
		});
	}

	protected openDirection(direction: DevDirection) {
		this._modalService.show({
			component: DirectionModalComponent,
			size: 'small',
			direction,
			ariaLabelledBy: 'direction-modal-title',
		});
	}

	protected openPerson(person: DevPerson) {
		this._modalService.show({
			component: DeveloperModalComponent,
			size: 'small',
			developer: person,
			ariaLabelledBy: 'developer-modal-title',
		});
	}

	protected openTask(entry: TimelineEntry, person: DevPerson) {
		this._modalService.show({
			component: TaskModalComponent,
			size: 'full',
			task: entry.task,
			project: entry.project,
			person,
			ariaLabelledBy: 'task-modal-title',
		});
	}

	/** Kristina signs in with her company email; every other account is Denys. */
	private _personOf(task: WorkflowTask): DevPersonKey {
		const me = this._authService.user();
		const email = task.ownerEmail || (task.uid === me?.uid ? (me?.email ?? '') : '');

		return email === KRISTINA_EMAIL ? 'kristina' : 'denys';
	}
}
