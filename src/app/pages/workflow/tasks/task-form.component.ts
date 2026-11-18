import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	computed,
	inject,
	signal,
} from '@angular/core';
import { DEV_DIRECTIONS, DevDirection } from '../../../../data/workflow.const';
import { ProjectsService } from '../../../feature/workflow/projects.service';
import { WorkflowTask } from '../../../interfaces/workflow.interface';

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
	protected readonly projectsService = inject(ProjectsService);

	// Assigned by ModalService from the modal config.
	task?: WorkflowTask;
	save!: (value: {
		title: string;
		projectId: string;
		directions: DevDirection[];
	}) => Promise<boolean>;
	close!: () => void;

	protected readonly title = signal('');
	protected readonly projectId = signal('');
	protected readonly directions = signal<DevDirection[]>([]);
	protected readonly busy = signal(false);
	protected readonly failed = signal(false);

	/** Categories to pick from: only asked when the project has more than one. */
	protected readonly directionOptions = computed(() => {
		const project = this.projectsService.items().find((item) => item.id === this.projectId());
		const available = project?.directions ?? [];

		return available.length > 1
			? available.map((key) => ({ key, ...DEV_DIRECTIONS[key] }))
			: [];
	});

	ngOnInit() {
		this.title.set(this.task?.title ?? '');
		this.projectId.set(this.task?.projectId ?? '');
		this.directions.set(this.task?.directions ?? []);
	}

	protected valueOf(event: Event) {
		return (event.target as HTMLInputElement | HTMLSelectElement).value;
	}

	protected toggleDirection(direction: DevDirection, checked: boolean) {
		this.directions.update((current) =>
			checked
				? [...current.filter((d) => d !== direction), direction]
				: current.filter((d) => d !== direction),
		);
	}

	protected async submit(event: Event) {
		event.preventDefault();
		const title = this.title().trim();

		if (!title || this.busy()) {
			return;
		}

		const allowed = this.directionOptions().map((option) => option.key);

		this.busy.set(true);
		this.failed.set(false);
		const saved = await this.save({
			title,
			projectId: this.projectId(),
			directions: this.directions().filter((direction) => allowed.includes(direction)),
		});
		this.busy.set(false);

		if (saved) {
			this.close();
		} else {
			this.failed.set(true);
		}
	}
}
