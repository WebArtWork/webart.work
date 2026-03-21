import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	CONTACT_HIGHLIGHTS,
	CONTACT_METHODS,
	HERO_HIGHLIGHTS,
	METRICS,
	PARTNERS,
	SERVICES,
	TECHNOLOGY_GROUPS,
	TECHNOLOGY_PRINCIPLES,
	WORKFLOW_STEPS,
} from './landing.const';

@Component({
	imports: [NgOptimizedImage],
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
