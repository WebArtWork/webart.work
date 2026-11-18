import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CategoryIconComponent } from '../../../components/category-icon.component';
import { ModalService } from '@wawjs/ngx-ui';
import {
	DEV_DIRECTIONS,
	DevDirection,
	License,
	PROJECT_LINK_TYPES,
	licenseLabel,
} from '../../../../data/workflow.const';
import { ProjectsService } from '../../../feature/workflow/projects.service';
import { Project, ProjectLink } from '../../../interfaces/workflow.interface';
import { SeoService } from '../../../services/seo.service';
import { ConfirmDeleteComponent } from '../confirm-delete.component';
import { ProjectFormComponent } from './project-form.component';

@Component({
	imports: [CategoryIconComponent],
	templateUrl: './projects.component.html',
	styleUrl: './projects.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
	private readonly _modalService = inject(ModalService);

	protected readonly projectsService = inject(ProjectsService);
	protected readonly licenseLabel = licenseLabel;
	protected readonly directionInfo = DEV_DIRECTIONS;
	protected readonly linkInfo = Object.fromEntries(
		PROJECT_LINK_TYPES.map((type) => [type.value, type]),
	);

	constructor() {
		inject(SeoService).apply({
			title: 'Projects',
			description: 'Projects shared by the Web Art Work team.',
			path: '/workflow/projects',
			robots: 'noindex, nofollow',
		});

		this.projectsService.watch();
		inject(DestroyRef).onDestroy(() => this.projectsService.unwatch());
	}

	protected isUrl(value: string) {
		return /^https?:\/\//i.test(value);
	}

	protected add() {
		this._modalService.show({
			component: ProjectFormComponent,
			size: 'fullscreen',
			ariaLabelledBy: 'project-form-title',
			save: (value: {
				name: string;
				description: string;
				directions: DevDirection[];
				links: ProjectLink[];
				license: License;
			}) => this.projectsService.add(value),
		});
	}

	protected edit(project: Project) {
		this._modalService.show({
			component: ProjectFormComponent,
			size: 'fullscreen',
			ariaLabelledBy: 'project-form-title',
			project,
			save: (value: {
				name: string;
				description: string;
				directions: DevDirection[];
				links: ProjectLink[];
				license: License;
			}) => this.projectsService.update(project.id, value),
		});
	}

	protected remove(item: { id: string; name: string }) {
		this._modalService.show({
			component: ConfirmDeleteComponent,
			size: 'small',
			ariaLabelledBy: 'confirm-delete-title',
			heading: 'Delete project',
			message: `Delete "${item.name}"? This cannot be undone.`,
			confirm: () => this.projectsService.remove(item.id),
		});
	}
}
