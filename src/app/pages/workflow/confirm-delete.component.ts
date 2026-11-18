import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
	selector: 'app-confirm-delete',
	templateUrl: './confirm-delete.component.html',
	styleUrl: './confirm-delete.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteComponent {
	// Assigned by ModalService from the modal config.
	heading = 'Delete';
	message = '';
	confirm!: () => Promise<boolean>;
	close!: () => void;

	protected readonly busy = signal(false);
	protected readonly failed = signal(false);

	protected async accept() {
		if (this.busy()) {
			return;
		}

		this.busy.set(true);
		this.failed.set(false);
		const deleted = await this.confirm();
		this.busy.set(false);

		if (deleted) {
			this.close();
		} else {
			this.failed.set(true);
		}
	}
}
