import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	computed,
	inject,
	signal,
} from '@angular/core';
import { ModalService } from '@wawjs/ngx-ui';
import { License, PACKAGE_CATEGORIES, PackageCategory, licenseLabel } from '../../../../data/workflow.const';
import { CategoryChipsComponent } from '../../../components/category-chips.component';
import { CategoryIconComponent } from '../../../components/category-icon.component';
import { PackagesService } from '../../../feature/workflow/packages.service';
import { Package } from '../../../interfaces/workflow.interface';
import { SeoService } from '../../../services/seo.service';
import { ConfirmDeleteComponent } from '../confirm-delete.component';
import { PackageFormComponent } from './package-form.component';

interface PackageValue {
	name: string;
	description: string;
	repo: string;
	npm: string;
	category: PackageCategory;
	license: License;
}

@Component({
	imports: [CategoryIconComponent, CategoryChipsComponent],
	templateUrl: './packages.component.html',
	styleUrl: './packages.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesComponent {
	private readonly _modalService = inject(ModalService);

	protected readonly packagesService = inject(PackagesService);
	protected readonly licenseLabel = licenseLabel;
	protected readonly categoryInfo = Object.fromEntries(
		PACKAGE_CATEGORIES.map((category) => [category.value, category]),
	);

	/** Every category is on until the user turns some off. */
	protected readonly enabled = signal<PackageCategory[]>(PACKAGE_CATEGORIES.map((c) => c.value));

	protected readonly visible = computed(() =>
		this.packagesService.items().filter((item) => this.enabled().includes(item.category)),
	);

	constructor() {
		inject(SeoService).apply({
			title: 'Packages',
			description: 'Packages built by the Web Art Work team.',
			path: '/workflow/packages',
			robots: 'noindex, nofollow',
		});

		this.packagesService.watch();
		inject(DestroyRef).onDestroy(() => this.packagesService.unwatch());
	}

	protected isUrl(value: string) {
		return /^https?:\/\//i.test(value);
	}

	protected add() {
		this._modalService.show({
			component: PackageFormComponent,
			size: 'fullscreen',
			ariaLabelledBy: 'package-form-title',
			save: (value: PackageValue) => this.packagesService.add(value),
		});
	}

	protected edit(item: Package) {
		this._modalService.show({
			component: PackageFormComponent,
			size: 'fullscreen',
			ariaLabelledBy: 'package-form-title',
			item,
			save: (value: PackageValue) => this.packagesService.update(item.id, value),
		});
	}

	protected remove(item: { id: string; name: string }) {
		this._modalService.show({
			component: ConfirmDeleteComponent,
			size: 'small',
			ariaLabelledBy: 'confirm-delete-title',
			heading: 'Delete package',
			message: `Delete "${item.name}"? This cannot be undone.`,
			confirm: () => this.packagesService.remove(item.id),
		});
	}
}
