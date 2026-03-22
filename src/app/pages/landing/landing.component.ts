import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PARTNERS } from '../../../data/partner.const';
import { SERVICES } from '../../../data/service.const';
import { TECHNOLOGY_GROUPS } from '../../../data/technology.const';
import {
	CONTACT_HIGHLIGHTS,
	CONTACT_METHODS,
	HERO_HIGHLIGHTS,
	METRICS,
	TECHNOLOGY_PRINCIPLES,
	WORKFLOW_STEPS,
} from './landing.const';

@Component({
	imports: [NgOptimizedImage, RouterLink],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	protected readonly heroHighlights = HERO_HIGHLIGHTS;
	protected readonly metrics = METRICS;
	protected readonly services = SERVICES;
	protected readonly technologyGroups = TECHNOLOGY_GROUPS;
	protected readonly technologyPrinciples = TECHNOLOGY_PRINCIPLES;
	protected readonly workflowSteps = WORKFLOW_STEPS;
	protected readonly partners = PARTNERS;
	protected readonly contactMethods = CONTACT_METHODS;
	protected readonly contactHighlights = CONTACT_HIGHLIGHTS;
}
