import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	FOOTER_COMPANY_LINKS,
	FOOTER_SERVICES,
	FOOTER_TECHNOLOGIES,
} from './footer.const';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	protected readonly footerServices = FOOTER_SERVICES;
	protected readonly footerTechnologies = FOOTER_TECHNOLOGIES;
	protected readonly footerCompanyLinks = FOOTER_COMPANY_LINKS;
}
