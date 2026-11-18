import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ModalService } from '@wawjs/ngx-ui';
import {
	PACKAGE_CATEGORIES,
	PackageCategory,
	RoadmapStatus,
} from '../../../../data/workflow.const';
import { CategoryIconComponent } from '../../../components/category-icon.component';
import { RoadmapsService } from '../../../feature/workflow/roadmaps.service';
import { Roadmap, RoadmapTask } from '../../../interfaces/workflow.interface';
import { SeoService } from '../../../services/seo.service';
import { ConfirmDeleteComponent } from '../confirm-delete.component';
import { RoadmapFormComponent } from './roadmap-form.component';

interface RoadmapValue {
	title: string;
	description: string;
	categories: PackageCategory[];
	status: RoadmapStatus;
	projectIds: string[];
	taskIds: string[];
	tasks: RoadmapTask[];
	packageIds: string[];
	developerIds: string[];
}

@Component({
	imports: [CategoryIconComponent],
	templateUrl: './roadmaps.component.html',
	styleUrl: './roadmaps.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapsComponent {
	private readonly _modalService = inject(ModalService);

	protected readonly roadmapsService = inject(RoadmapsService);
	protected readonly categoryInfo = Object.fromEntries(
		PACKAGE_CATEGORIES.map((category) => [category.value, category]),
	);

	constructor() {
		inject(SeoService).apply({
			title: 'Roadmaps',
			description: 'Roadmaps of the Web Art Work team.',
			path: '/workflow/roadmaps',
			robots: 'noindex, nofollow',
		});

		this.roadmapsService.watch();
		inject(DestroyRef).onDestroy(() => this.roadmapsService.unwatch());
	}

	protected add() {
		this._modalService.show({
			component: RoadmapFormComponent,
			size: 'fullscreen',
			ariaLabelledBy: 'roadmap-form-title',
			save: (value: RoadmapValue) => this.roadmapsService.add(value),
		});
	}

	protected edit(item: Roadmap) {
		this._modalService.show({
			component: RoadmapFormComponent,
			size: 'fullscreen',
			ariaLabelledBy: 'roadmap-form-title',
			item,
			save: (value: RoadmapValue) => this.roadmapsService.update(item.id, value),
		});
	}

	protected remove(item: { id: string; title: string }) {
		this._modalService.show({
			component: ConfirmDeleteComponent,
			size: 'small',
			ariaLabelledBy: 'confirm-delete-title',
			heading: 'Delete roadmap',
			message: `Delete "${item.title}"? This cannot be undone.`,
			confirm: () => this.roadmapsService.remove(item.id),
		});
	}
}
