import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEV_DIRECTIONS, DevDirection } from '../../../../data/workflow.const';

@Component({
	selector: 'app-direction-modal',
	template: `
		<div class="p-6">
			<div class="flex items-center gap-3">
				<span class="material-symbols-outlined text-[28px]" aria-hidden="true">{{
					info.icon
				}}</span>
				<h2 id="direction-modal-title" class="text-xl font-black">{{ info.label }}</h2>
			</div>
			<p class="mt-4 text-sm leading-7">{{ info.description }}</p>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionModalComponent {
	// Assigned by ModalService from the modal config.
	direction: DevDirection = 'angular';

	get info() {
		return DEV_DIRECTIONS[this.direction];
	}
}
