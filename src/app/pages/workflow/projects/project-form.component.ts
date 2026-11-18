import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import {
	DEV_DIRECTIONS,
	DevDirection,
	PROJECT_LINK_TYPES,
	ProjectLinkType,
} from '../../../../data/workflow.const';
import { Project, ProjectLink } from '../../../interfaces/workflow.interface';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrl: './project-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent implements OnInit {
	// Assigned by ModalService from the modal config.
	project?: Project;
	save!: (value: {
		name: string;
		description: string;
		directions: DevDirection[];
		links: ProjectLink[];
	}) => Promise<boolean>;
	close!: () => void;

	protected readonly name = signal('');
	protected readonly description = signal('');
	protected readonly directions = signal<DevDirection[]>([]);
	protected readonly directionOptions = (Object.keys(DEV_DIRECTIONS) as DevDirection[]).map(
		(key) => ({ key, ...DEV_DIRECTIONS[key] }),
	);
	protected readonly links = signal<ProjectLink[]>([]);
	protected readonly linkTypes = PROJECT_LINK_TYPES;
	protected readonly busy = signal(false);
	protected readonly failed = signal(false);

	ngOnInit() {
		this.name.set(this.project?.name ?? '');
		this.description.set(this.project?.description ?? '');
		this.directions.set(this.project?.directions ?? []);
		this.links.set((this.project?.links ?? []).map((link) => ({ ...link })));
	}

	protected valueOf(event: Event) {
		return (event.target as HTMLInputElement | HTMLTextAreaElement).value;
	}

	protected toggleDirection(direction: DevDirection, checked: boolean) {
		this.directions.update((current) =>
			checked
				? [...current.filter((d) => d !== direction), direction]
				: current.filter((d) => d !== direction),
		);
	}

	protected addLink() {
		this.links.update((current) => [...current, { type: 'website', url: '' }]);
	}

	protected setLink(index: number, patch: Partial<ProjectLink>) {
		this.links.update((current) =>
			current.map((link, i) => (i === index ? { ...link, ...patch } : link)),
		);
	}

	protected setLinkType(index: number, value: string) {
		this.setLink(index, { type: value as ProjectLinkType });
	}

	protected removeLink(index: number) {
		this.links.update((current) => current.filter((_, i) => i !== index));
	}

	protected async submit(event: Event) {
		event.preventDefault();
		const name = this.name().trim();

		if (!name || this.busy()) {
			return;
		}

		this.busy.set(true);
		this.failed.set(false);
		const saved = await this.save({
			name,
			description: this.description().trim(),
			directions: this.directions(),
			links: this.links()
				.map((link) => ({ type: link.type, url: link.url.trim() }))
				.filter((link) => link.url),
		});
		this.busy.set(false);

		if (saved) {
			this.close();
		} else {
			this.failed.set(true);
		}
	}
}
