import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../feature/auth/auth.service';

@Component({
	imports: [RouterLink, RouterLinkActive, RouterOutlet],
	templateUrl: './workflow.component.html',
	styleUrl: './workflow.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowComponent {
	private readonly _router = inject(Router);

	protected readonly authService = inject(AuthService);

	protected readonly links = [
		{ path: '/workflow', label: 'Timeline', icon: 'timeline', exact: true },
		{ path: '/workflow/projects', label: 'Projects', icon: 'folder', exact: false },
		{ path: '/workflow/tasks', label: 'Tasks', icon: 'task_alt', exact: false },
	];

	protected async logout() {
		await this.authService.signOut();
		this._router.navigateByUrl('/auth');
	}
}
