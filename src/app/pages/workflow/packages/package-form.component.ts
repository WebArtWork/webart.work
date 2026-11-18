import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CategoryChipsComponent } from '../../../components/category-chips.component';
import { DEFAULT_LICENSE, LICENSES, License, PackageCategory } from '../../../../data/workflow.const';
import { Package } from '../../../interfaces/workflow.interface';

@Component({
	imports: [CategoryChipsComponent],
	selector: 'app-package-form',
	templateUrl: './package-form.component.html',
	styleUrl: './package-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageFormComponent implements OnInit {
	// Assigned by ModalService from the modal config.
	item?: Package;
	save!: (value: {
		name: string;
		description: string;
		repo: string;
		npm: string;
		category: PackageCategory;
		license: License;
	}) => Promise<boolean>;
	close!: () => void;

	protected readonly name = signal('');
	protected readonly description = signal('');
	protected readonly repo = signal('');
	protected readonly npm = signal('');
	protected readonly category = signal<PackageCategory>('angular');
	protected readonly licenses = LICENSES;
	protected readonly license = signal<License>(DEFAULT_LICENSE);
	protected readonly busy = signal(false);
	protected readonly failed = signal(false);

	ngOnInit() {
		this.name.set(this.item?.name ?? '');
		this.description.set(this.item?.description ?? '');
		this.repo.set(this.item?.repo ?? '');
		this.npm.set(this.item?.npm ?? '');
		this.category.set(this.item?.category ?? 'angular');
		this.license.set(this.item?.license ?? DEFAULT_LICENSE);
	}

	protected valueOf(event: Event) {
		return (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
	}

	protected async submit(event: Event) {
		event.preventDefault();
		const name = this.name().trim();
		const repo = this.repo().trim();

		if (!name || !repo || this.busy()) {
			return;
		}

		this.busy.set(true);
		this.failed.set(false);
		const saved = await this.save({
			name,
			description: this.description().trim(),
			repo,
			npm: this.npm().trim(),
			category: this.category(),
			license: this.license(),
		});
		this.busy.set(false);

		if (saved) {
			this.close();
		} else {
			this.failed.set(true);
		}
	}
}
