import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { AuthService } from '../../../feature/auth/auth.service';
import { CommentsService } from '../../../feature/workflow/comments.service';
import { VotesService } from '../../../feature/workflow/votes.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/** Votes and comments under one feature or plan. The page watches the two collections. */
@Component({
	selector: 'app-feedback',
	imports: [DatePipe, TranslatePipe],
	templateUrl: './feedback.component.html',
	styleUrl: './feedback.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
	protected readonly authService = inject(AuthService);
	protected readonly votesService = inject(VotesService);
	protected readonly commentsService = inject(CommentsService);

	readonly targetId = input.required<string>();

	protected readonly open = signal(false);
	protected readonly text = signal('');
	protected readonly busy = signal(false);

	protected readonly score = computed(() => this.votesService.scores().get(this.targetId()) ?? 0);
	protected readonly mine = computed(() => this.votesService.mine().get(this.targetId()) ?? 0);
	protected readonly comments = computed(
		() => this.commentsService.byTarget().get(this.targetId()) ?? [],
	);

	protected vote(value: 1 | -1) {
		return this.votesService.toggle(this.targetId(), value);
	}

	protected valueOf(event: Event) {
		return (event.target as HTMLTextAreaElement).value;
	}

	protected canDelete(uid: string) {
		const user = this.authService.member();

		return !!user && (user.uid === uid || this.authService.allowed());
	}

	protected async post(event: Event) {
		event.preventDefault();

		if (this.busy() || !this.text().trim()) {
			return;
		}

		this.busy.set(true);

		if (await this.commentsService.post(this.targetId(), this.text())) {
			this.text.set('');
		}

		this.busy.set(false);
	}

	protected signIn() {
		return this.authService.signInWithGoogle();
	}

	protected remove(id: string) {
		return this.commentsService.remove(id);
	}
}
