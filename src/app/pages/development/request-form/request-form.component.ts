import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import {
	PackageCategory,
	REQUEST_TYPES,
	RequestType,
} from '../../../../data/workflow.const';
import { CategoryChipsComponent } from '../../../components/category-chips.component';
import { AuthService } from '../../../feature/auth/auth.service';
import { RequestsService } from '../../../feature/workflow/requests.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/** Modal with a short form that sends a request to the team. One type is fixed, two let the visitor choose. */
@Component({
	selector: 'app-request-form',
	imports: [TranslatePipe, CategoryChipsComponent],
	templateUrl: './request-form.component.html',
	styleUrl: './request-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFormComponent implements OnInit {
	protected readonly authService = inject(AuthService);
	private readonly _requestsService = inject(RequestsService);

	// Assigned by ModalService from the modal config.
	types: RequestType[] = [];
	heading = '';
	lead = '';
	close!: () => void;

	private readonly _types = signal<RequestType[]>([]);
	protected readonly options = computed(() =>
		REQUEST_TYPES.filter((option) => this._types().includes(option.value)),
	);
	protected readonly chosen = signal<RequestType | ''>('');
	protected readonly type = computed(() => this.chosen() || this._types()[0]);
	protected readonly category = signal<PackageCategory | ''>('');
	protected readonly title = signal('');
	protected readonly description = signal('');
	protected readonly repo = signal('');
	protected readonly busy = signal(false);
	protected readonly sent = signal(false);
	protected readonly failed = signal(false);

	ngOnInit() {
		this._types.set(this.types);
	}

	protected valueOf(event: Event) {
		return (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
	}

	protected signIn() {
		return this.authService.signInWithGoogle();
	}

	protected async submit(event: Event) {
		event.preventDefault();
		const title = this.title().trim();
		const category = this.category();

		if (!title || !category || this.busy()) {
			return;
		}

		this.busy.set(true);
		this.failed.set(false);

		const saved = await this._requestsService.submit({
			type: this.type(),
			category,
			title,
			description: this.description().trim(),
			repo: this.type() === 'package' ? this.repo().trim() : '',
		});

		this.busy.set(false);
		this.sent.set(saved);
		this.failed.set(!saved);
	}
}
