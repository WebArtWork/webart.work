import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/landing/landing.component').then((m) => m.LandingComponent),
	},
	{
		path: 'services',
		loadComponent: () =>
			import('./pages/services/services.component').then((m) => m.ServicesComponent),
	},
	{
		path: 'solutions',
		loadComponent: () =>
			import('./pages/solutions/solutions.component').then((m) => m.SolutionsComponent),
	},
	{
		path: 'partners',
		loadComponent: () =>
			import('./pages/partners/partners.component').then((m) => m.PartnersComponent),
	},
	{
		path: 'service/:id',
		loadComponent: () =>
			import('./pages/service/service.component').then((m) => m.ServiceComponent),
	},
	{
		path: 'intern/:id',
		loadComponent: () =>
			import('./pages/intern/intern.component').then((m) => m.InternComponent),
	},
	{
		path: 'partner/:id',
		loadComponent: () =>
			import('./pages/partner/partner.component').then((m) => m.PartnerComponent),
	},
	{
		path: 'startups',
		loadComponent: () =>
			import('./pages/startups/startups.component').then((m) => m.StartupsComponent),
	},
	{
		path: 'startup/:id',
		loadComponent: () =>
			import('./pages/startup/startup.component').then((m) => m.StartupComponent),
	},
	{
		path: 'pricing',
		loadComponent: () =>
			import('./pages/pricing/pricing.component').then((m) => m.PricingComponent),
	},
	{
		path: 'website',
		loadComponent: () =>
			import('./pages/website/website.component').then((m) => m.WebsiteComponent),
	},
	{
		path: 'market',
		loadComponent: () =>
			import('./pages/market/market.component').then((m) => m.MarketComponent),
	},
	{
		path: 'crm',
		loadComponent: () => import('./pages/crm/crm.component').then((m) => m.CrmComponent),
	},
	{
		path: 'ai',
		loadComponent: () => import('./pages/ai/ai.component').then((m) => m.AiComponent),
	},
	{
		path: 'app',
		loadComponent: () =>
			import('./pages/mobile-app/mobile-app.component').then((m) => m.MobileAppComponent),
	},
	{
		path: 'unity',
		loadComponent: () => import('./pages/unity/unity.component').then((m) => m.UnityComponent),
	},
	{
		path: 'virtual-tour',
		loadComponent: () =>
			import('./pages/virtual-tour/virtual-tour.component').then(
				(m) => m.VirtualTourComponent,
			),
	},
	{
		path: 'quantum',
		loadComponent: () =>
			import('./pages/quantum/quantum.component').then((m) => m.QuantumComponent),
	},
	{
		path: 'blockchain',
		loadComponent: () =>
			import('./pages/blockchain/blockchain.component').then((m) => m.BlockchainComponent),
	},
	{
		path: 'proposal',
		loadComponent: () =>
			import('./pages/proposal/proposal.component').then((m) => m.ProposalComponent),
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
