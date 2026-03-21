import { RenderMode, ServerRoute } from '@angular/ssr';
import { PARTNERS } from '../data/partner.const';
import { practices } from '../data/practice.const';
import { SERVICES } from '../data/service.const';

export const serverRoutes: ServerRoute[] = [
	{
		path: 'service/:id',
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			return SERVICES.map((service) => ({ id: service.id }));
		},
	},
	{
		path: 'intern/:id',
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			return practices.map((practice) => ({ id: practice.id }));
		},
	},
	{
		path: 'partner/:id',
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			return PARTNERS.map((partner) => ({ id: partner.id }));
		},
	},
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];
