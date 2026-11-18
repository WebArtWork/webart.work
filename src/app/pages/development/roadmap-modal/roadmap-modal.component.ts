import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import {
	PACKAGE_CATEGORIES,
	PROJECT_LINK_TYPES,
	ROADMAP_STATUSES,
	TASK_STATUSES,
	licenseLabel,
} from '../../../../data/workflow.const';
import { CategoryIconComponent } from '../../../components/category-icon.component';
import { DevelopersService } from '../../../feature/workflow/developers.service';
import { PackagesService } from '../../../feature/workflow/packages.service';
import { PlansService } from '../../../feature/workflow/plans.service';
import { ProjectsService } from '../../../feature/workflow/projects.service';
import { weekLabel } from '../../../feature/workflow/week';
import { Roadmap, RoadmapTask } from '../../../interfaces/workflow.interface';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { FeedbackComponent } from '../feedback/feedback.component';

/** Everything linked to one roadmap: packages, projects, tasks, plans and developers. */
@Component({
	selector: 'app-roadmap-modal',
	imports: [TranslatePipe, FeedbackComponent, CategoryIconComponent],
	templateUrl: './roadmap-modal.component.html',
	styleUrl: './roadmap-modal.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapModalComponent implements OnInit {
	private readonly _packagesService = inject(PackagesService);
	private readonly _projectsService = inject(ProjectsService);
	private readonly _plansService = inject(PlansService);
	private readonly _developersService = inject(DevelopersService);

	// Assigned by ModalService from the modal config.
	roadmap!: Roadmap;
	close!: () => void;

	protected readonly current = signal<Roadmap | undefined>(undefined);
	protected readonly tasks = computed(() => this.current()?.tasks ?? []);
	protected readonly categoryInfo = Object.fromEntries(
		PACKAGE_CATEGORIES.map((category) => [category.value, category]),
	);
	protected readonly linkInfo = Object.fromEntries(
		PROJECT_LINK_TYPES.map((type) => [type.value, type]),
	);
	protected readonly statusLabel = Object.fromEntries(
		ROADMAP_STATUSES.map((status) => [status.value, status.label]),
	);
	protected readonly taskLabel = TASK_STATUSES;
	protected readonly licenseLabel = licenseLabel;

	protected readonly packages = computed(() => {
		const ids = this.current()?.packageIds ?? [];

		return this._packagesService.items().filter((item) => ids.includes(item.id));
	});
	protected readonly projects = computed(() => {
		const ids = this.current()?.projectIds ?? [];

		return this._projectsService.items().filter((item) => ids.includes(item.id));
	});
	protected readonly developers = computed(() => {
		const ids = this.current()?.developerIds ?? [];

		return this._developersService.items().filter((item) => ids.includes(item.id));
	});
	/** Every plan that has something to say about this roadmap, newest week first. */
	protected readonly plans = computed(() => {
		const id = this.current()?.id;

		return this._plansService
			.items()
			.map((plan) => ({ plan, entry: plan.roadmaps?.find((entry) => entry.id === id) }))
			.filter((item) => item.entry)
			.sort((a, b) => b.plan.week.localeCompare(a.plan.week))
			.map(({ plan, entry }) => ({
				id: plan.id,
				label: weekLabel(plan.week),
				text: entry!.text,
			}));
	});

	ngOnInit() {
		this.current.set(this.roadmap);
	}

	protected statusOf(task: RoadmapTask) {
		return this.taskLabel[task.status];
	}

	protected isUrl(value: string) {
		return /^https?:\/\//i.test(value);
	}
}
