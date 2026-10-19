import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import {
	FOOTER_COMPANY_LINKS,
	FOOTER_SERVICES,
	FOOTER_TECHNOLOGIES,
} from './footer.const';
import { SOLUTIONS } from '../../../data/solution.const';

@Component({
	selector: 'app-footer',
	imports: [RouterLink, TranslatePipe],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	protected readonly footerServices = FOOTER_SERVICES;
	protected readonly footerTechnologies = FOOTER_TECHNOLOGIES;
	protected readonly footerCompanyLinks = FOOTER_COMPANY_LINKS;
	protected readonly footerSolutions = SOLUTIONS;
}
