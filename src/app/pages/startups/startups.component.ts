import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '@wawjs/ngx-core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { STARTUPS, STARTUPS_META } from '../../../data/startup.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './startups.component.html',
	styleUrl: './startups.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupsComponent {
	private readonly _metaService = inject(MetaService);

	protected readonly startups = STARTUPS;

	constructor() {
		this._metaService.applyMeta(STARTUPS_META);
	}
}
