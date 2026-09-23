import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MetaService } from '@wawjs/ngx-core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CanonicalService } from '../../services/canonical.service';
import { STARTUPS, STARTUPS_META } from '../../../data/startup.const';

@Component({
	imports: [NgOptimizedImage, RouterLink, TranslatePipe],
	templateUrl: './startups.component.html',
	styleUrl: './startups.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupsComponent {
	private readonly _metaService = inject(MetaService);
	private readonly _canonicalService = inject(CanonicalService);

	protected readonly startups = STARTUPS;

	constructor() {
		this._metaService.applyMeta(STARTUPS_META);
		this._canonicalService.sync();
	}
}
