import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	OnInit,
	WritableSignal,
	computed,
	inject,
	signal,
} from '@angular/core';
import {
	PackageCategory,
	ROADMAP_STATUSES,
	RoadmapStatus,
} from '../../../../data/workflow.const';
import { CategoryChipsComponent } from '../../../components/category-chips.component';
import { PackagesService } from '../../../feature/workflow/packages.service';
import { ProfilesService } from '../../../feature/workflow/profiles.service';
import { ProjectsService } from '../../../feature/workflow/projects.service';
import { TimelineTasksService } from '../../../feature/workflow/timeline-tasks.service';
import { taskStatus } from '../../../feature/workflow/workflow.helpers';
import { Roadmap, RoadmapTask } from '../../../interfaces/workflow.interface';

@Component({
	imports: [CategoryChipsComponent],
	selector: 'app-roadmap-form',
	templateUrl: './roadmap-form.component.html',
	styleUrl: './roadmap-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapFormComponent implements OnInit {
	protected readonly projectsService = inject(ProjectsService);
	protected readonly packagesService = inject(PackagesService);
	private readonly _profilesService = inject(ProfilesService);
	private readonly _tasksService = inject(TimelineTasksService);

	// Assigned by ModalService from the modal config.
	item?: Roadmap;
	save!: (value: {
		title: string;
		description: string;
		categories: PackageCategory[];
		status: RoadmapStatus;
		projectIds: string[];
		taskIds: string[];
		tasks: RoadmapTask[];
		packageIds: string[];
		developerIds: string[];
	}) => Promise<boolean>;
	close!: () => void;

	protected readonly statuses = ROADMAP_STATUSES;
	protected readonly title = signal('');
	protected readonly description = signal('');
	protected readonly categories = signal<PackageCategory[]>([]);
	protected readonly status = signal<RoadmapStatus>('open');
	protected readonly projectIds = signal<string[]>([]);
	protected readonly taskIds = signal<string[]>([]);
	protected readonly packageIds = signal<string[]>([]);
	protected readonly developerIds = signal<string[]>([]);
	protected readonly busy = signal(false);
	protected readonly failed = signal(false);

	protected readonly tasks = this._tasksService.items;
	protected readonly developers = computed(() =>
		this._profilesService
			.items()
			.map((profile) => ({ id: profile.id, name: profile.fullName || profile.email })),
	);

	constructor() {
		const services = [
			this.projectsService,
			this.packagesService,
			this._tasksService,
			this._profilesService,
		];

		services.forEach((service) => service.watch());
		inject(DestroyRef).onDestroy(() => services.forEach((service) => service.unwatch()));
	}

	ngOnInit() {
		this.title.set(this.item?.title ?? '');
		this.description.set(this.item?.description ?? '');
		this.categories.set(this.item?.categories ?? []);
		this.status.set(this.item?.status ?? 'open');
		this.projectIds.set(this.item?.projectIds ?? []);
		this.taskIds.set(this.item?.taskIds ?? []);
		this.packageIds.set(this.item?.packageIds ?? []);
		this.developerIds.set(this.item?.developerIds ?? []);
	}

	protected valueOf(event: Event) {
		return (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
	}

	protected toggle(list: WritableSignal<string[]>, id: string, checked: boolean) {
		list.update((current) =>
			checked ? [...current.filter((item) => item !== id), id] : current.filter((item) => item !== id),
		);
	}

	protected async submit(event: Event) {
		event.preventDefault();
		const title = this.title().trim();

		if (!title || !this.categories().length || this.busy()) {
			return;
		}

		this.busy.set(true);
		this.failed.set(false);
		const saved = await this.save({
			title,
			description: this.description().trim(),
			categories: this.categories(),
			status: this.status(),
			projectIds: this.projectIds(),
			taskIds: this.taskIds(),
			tasks: this.taskIds()
				.map((id) => this.tasks().find((task) => task.id === id))
				.filter((task) => !!task)
				.map((task) => ({ id: task.id, title: task.title, status: taskStatus(task) })),
			packageIds: this.packageIds(),
			developerIds: this.developerIds(),
		});
		this.busy.set(false);

		if (saved) {
			this.close();
		} else {
			this.failed.set(true);
		}
	}
}
