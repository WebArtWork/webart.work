import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ModalService } from '@wawjs/ngx-ui';
import { PACKAGE_CATEGORIES, REQUEST_TYPES, RequestStatus } from '../../../../data/workflow.const';
import { CategoryIconComponent } from '../../../components/category-icon.component';
import { RoadmapsService } from '../../../feature/workflow/roadmaps.service';
import { RequestsService } from '../../../feature/workflow/requests.service';
import { WorkRequest } from '../../../interfaces/workflow.interface';
import { SeoService } from '../../../services/seo.service';
import { ConfirmDeleteComponent } from '../confirm-delete.component';

@Component({
	imports: [DatePipe, CategoryIconComponent],
	templateUrl: './requests.component.html',
	styleUrl: './requests.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsComponent {
	private readonly _modalService = inject(ModalService);
	private readonly _roadmapsService = inject(RoadmapsService);

	protected readonly requestsService = inject(RequestsService);
	protected readonly categoryInfo = Object.fromEntries(
		PACKAGE_CATEGORIES.map((category) => [category.value, category]),
	);
	protected readonly typeInfo = Object.fromEntries(REQUEST_TYPES.map((type) => [type.value, type]));

	constructor() {
		inject(SeoService).apply({
			title: 'Requests',
			description: 'Requests sent by visitors of the Development page.',
			path: '/workflow/requests',
			robots: 'noindex, nofollow',
		});

		this.requestsService.watch();
		inject(DestroyRef).onDestroy(() => this.requestsService.unwatch());
	}

	protected isUrl(value: string) {
		return /^https?:\/\//i.test(value);
	}

	protected setStatus(item: WorkRequest, status: RequestStatus) {
		return this.requestsService.update(item.id, { status });
	}

	/** Roadmap, improvement and bug requests become roadmaps; the request is then handled. */
	protected async addToRoadmaps(item: WorkRequest) {
		if (item.type === 'package') {
			return;
		}

		const added = await this._roadmapsService.add({
			title: item.type === 'roadmap' ? item.title : `${item.type === 'bug' ? 'Fix' : 'Improve'}: ${item.title}`,
			description: item.description,
			categories: [item.category],
			status: 'open',
			projectIds: [],
			taskIds: [],
			packageIds: [],
			developerIds: [],
		});

		if (added) {
			await this.setStatus(item, 'handled');
		}
	}

	protected remove(item: { id: string; title: string }) {
		this._modalService.show({
			component: ConfirmDeleteComponent,
			size: 'small',
			ariaLabelledBy: 'confirm-delete-title',
			heading: 'Delete request',
			message: `Delete "${item.title}"? This cannot be undone.`,
			confirm: () => this.requestsService.remove(item.id),
		});
	}
}
