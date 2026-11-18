import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { PACKAGE_CATEGORIES } from '../../data/workflow.const';
import { CategoryIconComponent } from './category-icon.component';

export interface ChipOption {
	value: string;
	label: string;
	icon?: string;
}

/**
 * The category picker used everywhere: a row of chips. With `multiple` any number can be on
 * (`values`); otherwise one at most (`value`, empty when none), and a second click on the
 * chosen chip clears it.
 */
@Component({
	selector: 'app-category-chips',
	imports: [CategoryIconComponent],
	template: `
		<div
			class="chips"
			[attr.role]="multiple() ? 'group' : 'radiogroup'"
			[attr.aria-label]="label() || null"
			[attr.aria-labelledby]="labelledBy() || null"
		>
			@for (option of options(); track option.value) {
				<button
					type="button"
					class="chip"
					[class.chip--on]="isOn(option.value)"
					[attr.role]="multiple() ? null : 'radio'"
					[attr.aria-pressed]="multiple() ? isOn(option.value) : null"
					[attr.aria-checked]="multiple() ? null : isOn(option.value)"
					(click)="toggle(option.value)"
				>
					@if (option.icon) {
						<app-category-icon [icon]="option.icon" />
					}
					{{ option.label }}
				</button>
			}
		</div>
	`,
	styles: `
		:host {
			--chip-accent: #a16207;
			--chip-accent-soft: rgb(161 98 7 / 0.1);

			display: block;
		}

		:host-context(html[data-mode='dark']) {
			--chip-accent: #f4d37b;
			--chip-accent-soft: rgb(244 211 123 / 0.12);
		}

		.chips {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		.chip {
			display: inline-flex;
			align-items: center;
			gap: 0.375rem;
			border: 1px solid var(--c-border);
			border-radius: 999px;
			background: var(--c-bg-secondary);
			color: var(--c-text-primary);
			cursor: pointer;
			padding: 0.375rem 0.875rem;
			font-size: 0.8125rem;
			font-weight: 700;
			opacity: 0.6;
			transition:
				opacity 0.2s ease,
				border-color 0.2s ease,
				background-color 0.2s ease;
		}

		.chip--on {
			border-color: var(--chip-accent-soft);
			background: var(--chip-accent-soft);
			color: var(--chip-accent);
			opacity: 1;
		}

		.chip:focus-visible {
			outline: 2px solid var(--c-text-secondary);
			outline-offset: 2px;
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryChipsComponent {
	readonly options = input<ChipOption[]>(PACKAGE_CATEGORIES);
	readonly multiple = input(false);
	/** Whether a second click on the chosen chip clears the choice (one at a time only). */
	readonly clearable = input(true);
	readonly label = input('');
	readonly labelledBy = input('');

	/** The chosen option when `multiple` is off; empty for none. */
	readonly value = model('');
	/** The chosen options when `multiple` is on. */
	readonly values = model<string[]>([]);

	protected isOn(value: string) {
		return this.multiple() ? this.values().includes(value) : this.value() === value;
	}

	protected toggle(value: string) {
		if (this.multiple()) {
			this.values.update((current) =>
				current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
			);
		} else {
			this.value.set(this.value() === value && this.clearable() ? '' : value);
		}
	}
}
