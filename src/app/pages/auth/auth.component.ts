import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../feature/auth/auth.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SeoService } from '../../services/seo.service';

@Component({
	imports: [RouterLink, TranslatePipe],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
	private readonly _router = inject(Router);
	private readonly _seoService = inject(SeoService);

	protected readonly authService = inject(AuthService);

	constructor() {
		this._seoService.apply({
			title: 'Sign in',
			description: 'Sign in to the Web Art Work workspace.',
			path: '/auth',
			robots: 'noindex, nofollow',
		});
	}

	protected async signIn() {
		if ((await this.authService.signInWithGoogle()) && this.authService.allowed()) {
			this._router.navigateByUrl('/workflow');
		}
	}
}
