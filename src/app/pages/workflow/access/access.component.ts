import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ModalService } from '@wawjs/ngx-ui';
import { AccessRequestsService } from '../../../feature/workflow/access-requests.service';
import { TeamMembersService } from '../../../feature/workflow/team-members.service';
import { AccessRequest, TeamMember } from '../../../interfaces/workflow.interface';
import { SeoService } from '../../../services/seo.service';
import { ConfirmDeleteComponent } from '../confirm-delete.component';

/** The CEO approves the developers who asked for access, and can take it away again. */
@Component({
	imports: [DatePipe],
	templateUrl: './access.component.html',
	styleUrl: './access.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessComponent {
	private readonly _modalService = inject(ModalService);

	protected readonly requestsService = inject(AccessRequestsService);
	protected readonly teamService = inject(TeamMembersService);

	constructor() {
		inject(SeoService).apply({
			title: 'Access',
			description: 'Approve developers for the Web Art Work workflow.',
			path: '/workflow/access',
			robots: 'noindex, nofollow',
		});

		this.requestsService.watch();
		this.teamService.watch();
		inject(DestroyRef).onDestroy(() => {
			this.requestsService.unwatch();
			this.teamService.unwatch();
		});
	}

	protected async approve(request: AccessRequest) {
		if (await this.teamService.approve(request)) {
			await this.requestsService.remove(request.id);
		}
	}

	protected decline(request: AccessRequest) {
		return this.requestsService.remove(request.id);
	}

	protected revoke(member: TeamMember) {
		this._modalService.show({
			component: ConfirmDeleteComponent,
			size: 'small',
			ariaLabelledBy: 'confirm-delete-title',
			heading: 'Remove access',
			message: `Remove access for ${member.name || member.email}? They can ask again later.`,
			confirm: () => this.teamService.revoke(member.id),
		});
	}
}
