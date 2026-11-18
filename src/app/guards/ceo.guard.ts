import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../feature/auth/auth.service';

/** Only the CEO account opens the page; everyone else goes back to the workflow. */
export const ceoGuard: CanActivateFn = async () => {
	if (isPlatformServer(inject(PLATFORM_ID))) {
		return true;
	}

	const authService = inject(AuthService);
	const router = inject(Router);
	await authService.whenReady();

	return authService.isCeo() ? true : router.createUrlTree(['/workflow']);
};
