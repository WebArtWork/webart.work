import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { ModalService } from '@wawjs/ngx-ui';
import { PACKAGE_CATEGORIES, PackageCategory, licenseLabel } from '../../../data/workflow.const';
import { CategoryChipsComponent } from '../../components/category-chips.component';
import { CategoryIconComponent } from '../../components/category-icon.component';
import { usePageTranslations } from '../../feature/language/page-translations';
import { CommentsService } from '../../feature/workflow/comments.service';
import { DevelopersService } from '../../feature/workflow/developers.service';
import { PackagesService } from '../../feature/workflow/packages.service';
import { PlansService } from '../../feature/workflow/plans.service';
import { ProjectsService } from '../../feature/workflow/projects.service';
import { RoadmapsService } from '../../feature/workflow/roadmaps.service';
import { VotesService } from '../../feature/workflow/votes.service';
import { weekLabel } from '../../feature/workflow/week';
import { Roadmap } from '../../interfaces/workflow.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SeoService } from '../../services/seo.service';
import { FeedbackComponent } from './feedback/feedback.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { RoadmapModalComponent } from './roadmap-modal/roadmap-modal.component';

@Component({
	imports: [TranslatePipe, FeedbackComponent, CategoryIconComponent, CategoryChipsComponent],
	templateUrl: './development.component.html',
	styleUrl: './development.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopmentComponent {
	private readonly _modalService = inject(ModalService);
	private readonly _packagesService = inject(PackagesService);
	private readonly _roadmapsService = inject(RoadmapsService);
	private readonly _plansService = inject(PlansService);
	private readonly _votesService = inject(VotesService);
	private readonly _commentsService = inject(CommentsService);
	private readonly _projectsService = inject(ProjectsService);
	private readonly _developersService = inject(DevelopersService);

	protected readonly licenseLabel = licenseLabel;
	protected readonly categoryInfo = Object.fromEntries(
		PACKAGE_CATEGORIES.map((category) => [category.value, category]),
	);
	protected readonly packagesLoading = this._packagesService.loading;
	protected readonly packagesError = this._packagesService.error;
	protected readonly roadmapsLoading = this._roadmapsService.loading;
	protected readonly plansLoading = this._plansService.loading;

	/** Every category is on until the visitor turns some off. */
	protected readonly enabled = signal<PackageCategory[]>(PACKAGE_CATEGORIES.map((c) => c.value));

	private readonly _packageList = computed(
		() => new Map(this._packagesService.items().map((item) => [item.id, item])),
	);
	private readonly _roadmapList = computed(
		() => new Map(this._roadmapsService.items().map((item) => [item.id, item])),
	);

	protected readonly packages = computed(() =>
		[...this._packagesService.items()]
			.filter((item) => this.enabled().includes(item.category))
			.sort((a, b) => a.name.localeCompare(b.name)),
	);

	/** Not done yet, with at least one enabled category, the most liked first. */
	protected readonly roadmaps = computed(() => {
		const scores = this._votesService.scores();

		return this._roadmapsService
			.items()
			.filter((item) => item.status !== 'done')
			.filter((item) => !item.categories?.length || item.categories.some((key) => this.enabled().includes(key)))
			.sort(
				(a, b) =>
					(scores.get(b.id) ?? 0) - (scores.get(a.id) ?? 0) || b.createdAt - a.createdAt,
			);
	});

	/** The newest plan, with the packages and roadmaps of the enabled categories. */
	protected readonly plan = computed(() => {
		const [latest] = [...this._plansService.items()].sort(
			(a, b) => b.week.localeCompare(a.week) || b.createdAt - a.createdAt,
		);

		if (!latest) {
			return undefined;
		}

		const enabled = this.enabled();

		return {
			...latest,
			label: weekLabel(latest.week),
			packageEntries: (latest.packages ?? [])
				.map((entry) => ({ text: entry.text, item: this._packageList().get(entry.id) }))
				.filter((entry) => entry.item && enabled.includes(entry.item.category))
				.map((entry) => ({ name: entry.item!.name, text: entry.text })),
			roadmapEntries: (latest.roadmaps ?? [])
				.map((entry) => ({ text: entry.text, item: this._roadmapList().get(entry.id) }))
				.filter(
					(entry) =>
						entry.item &&
						(!entry.item.categories?.length ||
							entry.item.categories.some((key) => enabled.includes(key))),
				)
				.map((entry) => ({ name: entry.item!.title, text: entry.text })),
		};
	});

	constructor() {
		usePageTranslations('development');

		inject(SeoService).apply({
			title: 'Open-Source & Products Development',
			description:
				'Our roadmaps, the packages we maintain and our weekly development plan. Vote and comment.',
			path: '/development',
		});

		const services = [
			this._packagesService,
			this._roadmapsService,
			this._plansService,
			this._votesService,
			this._commentsService,
			this._projectsService,
			this._developersService,
		];

		services.forEach((service) => service.watch());
		inject(DestroyRef).onDestroy(() => services.forEach((service) => service.unwatch()));
	}

	protected open(roadmap: Roadmap) {
		this._modalService.show({
			component: RoadmapModalComponent,
			size: 'big',
			ariaLabelledBy: 'roadmap-modal-title',
			roadmap,
		});
	}

	protected request(section: 'roadmaps' | 'packages' | 'plan') {
		const config = {
			packages: {
				types: ['package'],
				heading: 'Request a new package',
				lead: 'Missing a package you need? Describe what it should do and we will consider it.',
			},
			roadmaps: {
				types: ['roadmap'],
				heading: 'Suggest a roadmap',
				lead: 'Have a bigger idea we should plan? Tell us about it.',
			},
			plan: {
				types: ['bug', 'improvement'],
				heading: 'Report a bug or suggest an improvement',
				lead: 'Found something broken, or something that could work better? Let us know.',
			},
		}[section];

		this._modalService.show({
			component: RequestFormComponent,
			size: 'mid',
			ariaLabelledBy: 'request-form-title',
			...config,
		});
	}

	protected isUrl(value: string) {
		return /^https?:\/\//i.test(value);
	}
}
