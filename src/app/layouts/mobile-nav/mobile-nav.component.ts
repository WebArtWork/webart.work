import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { NAV_LINKS } from '../navigation.const';

/** Bottom tab bar that replaces the topbar links below desktop width. */
@Component({
	selector: 'app-mobile-nav',
	imports: [RouterLink, RouterLinkActive, TranslatePipe],
	templateUrl: './mobile-nav.component.html',
	styleUrl: './mobile-nav.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent {
	protected readonly navLinks = NAV_LINKS;
}
