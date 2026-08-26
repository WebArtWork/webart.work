import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MetaService } from '@wawjs/ngx-core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ContactService } from '../../feature/contact/contact.service';
import { PARTNERS } from '../../../data/partner.const';
import { SERVICES } from '../../../data/service.const';
import { STARTUPS } from '../../../data/startup.const';
import { TECHNOLOGY_GROUPS } from '../../../data/technology.const';
import { HOME_META } from '../../feature/company/company.const';
import {
	CONTACT_HIGHLIGHTS,
	CONTACT_METHODS,
	HERO_HIGHLIGHTS,
	METRICS,
	TECHNOLOGY_PRINCIPLES,
	WORKFLOW_STEPS,
} from './landing.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe, FormsModule],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	private readonly _metaService = inject(MetaService);
	private readonly _contactService = inject(ContactService);

	protected readonly heroHighlights = HERO_HIGHLIGHTS;
	protected readonly metrics = METRICS;
	protected readonly services = SERVICES;
	protected readonly technologyGroups = TECHNOLOGY_GROUPS;
	protected readonly technologyPrinciples = TECHNOLOGY_PRINCIPLES;
	protected readonly workflowSteps = WORKFLOW_STEPS;
	protected readonly partners = PARTNERS;
	protected readonly startups = STARTUPS.slice(0, 3);
	protected readonly contactMethods = CONTACT_METHODS;
	protected readonly contactHighlights = CONTACT_HIGHLIGHTS;

	protected readonly contactName = signal('');
	protected readonly contactEmail = signal('');
	protected readonly contactMessage = signal('');
	protected readonly contactStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

	constructor() {
		this._metaService.applyMeta(HOME_META);
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
