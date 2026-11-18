import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../feature/auth/auth.service';

export const authGuard: CanActivateFn = async () => {
	// Prerender has no session; the empty shell is served and the browser re-checks.
	if (isPlatformServer(inject(PLATFORM_ID))) {
		return true;
	}

	const authService = inject(AuthService);
	const router = inject(Router);
	await authService.whenReady();

	return authService.allowed() ? true : router.createUrlTree(['/auth']);
};
