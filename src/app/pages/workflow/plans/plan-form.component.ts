import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { PackagesService } from '../../../feature/workflow/packages.service';
import { RoadmapsService } from '../../../feature/workflow/roadmaps.service';
import { weekKey } from '../../../feature/workflow/week';
import { DevelopmentPlan, PlanEntry } from '../../../interfaces/workflow.interface';

@Component({
	selector: 'app-plan-form',
	templateUrl: './plan-form.component.html',
	styleUrl: './plan-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanFormComponent implements OnInit {
	protected readonly packagesService = inject(PackagesService);
	protected readonly roadmapsService = inject(RoadmapsService);

	// Assigned by ModalService from the modal config.
	item?: DevelopmentPlan;
	save!: (value: {
		title: string;
		week: string;
		content: string;
		packages: PlanEntry[];
		roadmaps: PlanEntry[];
	}) => Promise<boolean>;
	close!: () => void;

	protected readonly title = signal('');
	protected readonly week = signal('');
	protected readonly content = signal('');
	protected readonly packageEntries = signal<PlanEntry[]>([]);
	protected readonly roadmapEntries = signal<PlanEntry[]>([]);
	protected readonly busy = signal(false);
	protected readonly failed = signal(false);

	constructor() {
		const services = [this.packagesService, this.roadmapsService];

		services.forEach((service) => service.watch());
		inject(DestroyRef).onDestroy(() => services.forEach((service) => service.unwatch()));
	}

	ngOnInit() {
		this.title.set(this.item?.title ?? '');
		// A new plan is for next week.
		this.week.set(this.item?.week ?? weekKey(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)));
		this.content.set(this.item?.content ?? '');
		this.packageEntries.set((this.item?.packages ?? []).map((entry) => ({ ...entry })));
		this.roadmapEntries.set((this.item?.roadmaps ?? []).map((entry) => ({ ...entry })));
	}

	protected valueOf(event: Event) {
		return (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
	}

	protected addEntry(list: WritableSignal<PlanEntry[]>) {
		list.update((current) => [...current, { id: '', text: '' }]);
	}

	protected setEntry(list: WritableSignal<PlanEntry[]>, index: number, patch: Partial<PlanEntry>) {
		list.update((current) =>
			current.map((entry, i) => (i === index ? { ...entry, ...patch } : entry)),
		);
	}

	protected removeEntry(list: WritableSignal<PlanEntry[]>, index: number) {
		list.update((current) => current.filter((_, i) => i !== index));
	}

	protected async submit(event: Event) {
		event.preventDefault();
		const title = this.title().trim();
		const week = this.week().trim();

		if (!title || !/^\d{4}-W\d{2}$/.test(week) || this.busy()) {
			return;
		}

		const clean = (entries: PlanEntry[]) =>
			entries.filter((entry) => entry.id).map((entry) => ({ id: entry.id, text: entry.text.trim() }));

		this.busy.set(true);
		this.failed.set(false);
		const saved = await this.save({
			title,
			week,
			content: this.content().trim(),
			packages: clean(this.packageEntries()),
			roadmaps: clean(this.roadmapEntries()),
		});
		this.busy.set(false);

		if (saved) {
			this.close();
		} else {
			this.failed.set(true);
		}
	}
}
