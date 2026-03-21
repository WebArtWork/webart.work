import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/landing/landing.component').then((m) => m.LandingComponent),
	},
	{
		path: 'service/:id',
		loadComponent: () =>
			import('./pages/service/service.component').then((m) => m.ServiceComponent),
	},
	{
		path: 'intern/:id',
		loadComponent: () => import('./pages/intern/intern.component').then((m) => m.InternComponent),
	},
	{
		path: 'partner/:id',
		loadComponent: () =>
			import('./pages/partner/partner.component').then((m) => m.PartnerComponent),
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
