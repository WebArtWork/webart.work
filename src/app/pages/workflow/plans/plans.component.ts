import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ModalService } from '@wawjs/ngx-ui';
import { PlansService } from '../../../feature/workflow/plans.service';
import { weekText } from '../../../feature/workflow/week';
import { DevelopmentPlan, PlanEntry } from '../../../interfaces/workflow.interface';
import { SeoService } from '../../../services/seo.service';
import { ConfirmDeleteComponent } from '../confirm-delete.component';
import { PlanFormComponent } from './plan-form.component';

interface PlanValue {
	title: string;
	week: string;
	content: string;
	packages: PlanEntry[];
	roadmaps: PlanEntry[];
}

@Component({
	templateUrl: './plans.component.html',
	styleUrl: './plans.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansComponent {
	private readonly _modalService = inject(ModalService);

	protected readonly plansService = inject(PlansService);

	constructor() {
		inject(SeoService).apply({
			title: 'Plans',
			description: 'Development plans of the Web Art Work team.',
			path: '/workflow/plans',
			robots: 'noindex, nofollow',
		});

		this.plansService.watch();
		inject(DestroyRef).onDestroy(() => this.plansService.unwatch());
	}

	protected weekText(week: string) {
		return weekText(week);
	}

	protected add() {
		this._modalService.show({
			component: PlanFormComponent,
			size: 'fullscreen',
			ariaLabelledBy: 'plan-form-title',
			save: (value: PlanValue) => this.plansService.add(value),
		});
	}

	protected edit(item: DevelopmentPlan) {
		this._modalService.show({
			component: PlanFormComponent,
			size: 'fullscreen',
			ariaLabelledBy: 'plan-form-title',
			item,
			save: (value: PlanValue) => this.plansService.update(item.id, value),
		});
	}

	protected remove(item: { id: string; title: string }) {
		this._modalService.show({
			component: ConfirmDeleteComponent,
			size: 'small',
			ariaLabelledBy: 'confirm-delete-title',
			heading: 'Delete plan',
			message: `Delete "${item.title}"? This cannot be undone.`,
			confirm: () => this.plansService.remove(item.id),
		});
	}
}
