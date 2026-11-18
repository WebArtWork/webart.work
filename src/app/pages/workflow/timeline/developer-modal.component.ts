import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DevPerson } from '../../../../data/workflow.const';

@Component({
	selector: 'app-developer-modal',
	template: `
		<div class="p-6">
			<h2 id="developer-modal-title" class="text-xl font-black">{{ developer.name }}</h2>
			<p class="mt-1 text-sm font-bold">{{ developer.role }}</p>
			<p class="mt-4 text-sm leading-7">{{ developer.about }}</p>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeveloperModalComponent {
	// Assigned by ModalService from the modal config.
	developer: DevPerson = { key: 'denys', name: '', role: '', about: '' };
}
