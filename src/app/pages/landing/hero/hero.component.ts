import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ThemeState } from '../../../theme/theme-state';
import { HERO_HIGHLIGHTS, METRICS } from '../landing.const';

@Component({
	selector: 'app-landing-hero',
	imports: [TranslatePipe],
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
	private readonly _themeState = inject(ThemeState);

	protected readonly themeMode = this._themeState.mode;
	protected readonly heroHighlights = HERO_HIGHLIGHTS;
	protected readonly metrics = METRICS;
}
