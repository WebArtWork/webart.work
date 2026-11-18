import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A Material Symbols icon, or the Web Art Work spider for the icon name `waw`.
 * The spider is the logo used as a mask, so it takes the surrounding text colour like the others.
 */
@Component({
	selector: 'app-category-icon',
	template: `
		@if (icon() === 'waw') {
			<span
				class="waw-spider"
				aria-hidden="true"
				[style.width.px]="size()"
				[style.height.px]="size()"
			></span>
		} @else {
			<span
				class="material-symbols-outlined"
				aria-hidden="true"
				[style.font-size.px]="size()"
				>{{ icon() }}</span
			>
		}
	`,
	styles: `
		:host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		.waw-spider {
			display: inline-block;
			background: currentColor;
			-webkit-mask: url('/landing/logo.svg') center / contain no-repeat;
			mask: url('/landing/logo.svg') center / contain no-repeat;
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryIconComponent {
	readonly icon = input.required<string>();
	readonly size = input(18);
}
