import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../feature/auth/auth.service';
import { RoadmapTasksSyncService } from '../../feature/workflow/roadmap-tasks-sync.service';

@Component({
	imports: [RouterLink, RouterLinkActive, RouterOutlet],
	templateUrl: './workflow.component.html',
	styleUrl: './workflow.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowComponent {
	private readonly _router = inject(Router);

	protected readonly authService = inject(AuthService);

	constructor() {
		const sync = inject(RoadmapTasksSyncService);

		sync.watch();
		inject(DestroyRef).onDestroy(() => sync.unwatch());
	}

	private readonly _links = [
		{ path: '/workflow', label: 'Workflow', icon: 'timeline', exact: true },
		{ path: '/workflow/roadmaps', label: 'Roadmaps', icon: 'route', exact: false },
		{ path: '/workflow/packages', label: 'Packages', icon: 'package_2', exact: false },
		{ path: '/workflow/projects', label: 'Projects', icon: 'folder', exact: false },
		{ path: '/workflow/tasks', label: 'Tasks', icon: 'task_alt', exact: false },
		{ path: '/workflow/requests', label: 'Requests', icon: 'inbox', exact: false },
		{ path: '/workflow/plans', label: 'Plans', icon: 'event_note', exact: false },
		{ path: '/workflow/mcp', label: 'MCP', icon: 'hub', exact: false },
	];

	/** The Access page is for the CEO only. */
	protected readonly links = computed(() => [
		...this._links,
		...(this.authService.isCeo()
			? [{ path: '/workflow/access', label: 'Access', icon: 'verified_user', exact: false }]
			: []),
	]);

	protected async logout() {
		await this.authService.signOut();
		this._router.navigateByUrl('/auth');
	}
}
