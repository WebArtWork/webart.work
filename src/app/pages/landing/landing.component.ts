import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SeoService } from '../../services/seo.service';
import { ContactService } from '../../feature/contact/contact.service';
import { PARTNERS } from '../../../data/partner.const';
import { SERVICES } from '../../../data/service.const';
import { STARTUPS } from '../../../data/startup.const';
import { SOLUTIONS } from '../../../data/solution.const';
import { TECHNOLOGY_GROUPS } from '../../../data/technology.const';
import { HOME_META } from '../../feature/company/company.const';
import { HeroComponent } from './hero/hero.component';
import {
	CONTACT_HIGHLIGHTS,
	CONTACT_METHODS,
	TECHNOLOGY_PRINCIPLES,
	WORKFLOW_STEPS,
} from './landing.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe, FormsModule, HeroComponent],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	private readonly _seoService = inject(SeoService);
	private readonly _contactService = inject(ContactService);

	protected readonly services = SERVICES;
	protected readonly technologyGroups = TECHNOLOGY_GROUPS;
	protected readonly technologyPrinciples = TECHNOLOGY_PRINCIPLES;
	protected readonly workflowSteps = WORKFLOW_STEPS;
	protected readonly partners = PARTNERS;
	protected readonly startups = STARTUPS.slice(0, 3);
	protected readonly solutions = SOLUTIONS;
	protected readonly contactMethods = CONTACT_METHODS;
	protected readonly contactHighlights = CONTACT_HIGHLIGHTS;

	protected readonly contactName = signal('');
	protected readonly contactEmail = signal('');
	protected readonly contactMessage = signal('');
	protected readonly contactStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

	constructor() {
		this._seoService.apply({
			...HOME_META,
			path: '/',
			jsonLd: [
				{
					'@type': 'ItemList',
					name: 'Development & business services',
					itemListElement: SERVICES.map((service, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: service.title,
						url: `https://webart.work/service/${service.id}`,
					})),
				},
			],
		});
	}

	protected async submitContact(form: NgForm) {
		if (form.invalid || this.contactStatus() === 'sending') {
			return;
		}

		this.contactStatus.set('sending');

		const message = [
			'Website: webart.work',
			`Name: ${this.contactName()}`,
			`Email: ${this.contactEmail()}`,
			'',
			this.contactMessage(),
		].join('\n');

		const success = await this._contactService.send(message);

		if (!success) {
			this.contactStatus.set('error');
			return;
		}

		this.contactStatus.set('success');
		this.contactName.set('');
		this.contactEmail.set('');
		this.contactMessage.set('');
		form.resetForm();
	}
}
