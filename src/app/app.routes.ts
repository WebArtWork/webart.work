import { Routes } from '@angular/router';
import { HOME_META } from './feature/company/company.const';
import { STARTUPS_META } from '../data/startup.const';

export const routes: Routes = [
	{
		path: '',
		data: { meta: HOME_META },
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
		path: 'startups',
		data: { meta: STARTUPS_META },
		loadComponent: () =>
			import('./pages/startups/startups.component').then((m) => m.StartupsComponent),
	},
	{
		path: 'startup/:id',
		loadComponent: () =>
			import('./pages/startup/startup.component').then((m) => m.StartupComponent),
	},
	{
		path: 'proposal',
		data: {
			meta: {
				title: 'Business Proposal',
				description: 'A custom project proposal prepared by Web Art Work.',
				robots: 'noindex, nofollow',
			},
		},
		loadComponent: () =>
			import('./pages/proposal/proposal.component').then((m) => m.ProposalComponent),
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
