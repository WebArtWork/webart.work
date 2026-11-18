import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A list of short values typed one after another: Enter, a comma, a space or leaving the field turns
 * the text into a tag, Backspace in an empty field removes the last one. With `kind="email"` a value
 * must look like an email address; it is lowercased and never added twice.
 */
@Component({
	selector: 'app-tags-input',
	template: `
		<div class="tags" (click)="entry.focus()">
			@for (value of values(); track value) {
				<span class="tag">
					{{ value }}
					<button
						type="button"
						class="tag-remove"
						[attr.aria-label]="'Remove ' + value"
						(click)="remove(value); $event.stopPropagation()"
					>
						<span class="material-symbols-outlined" aria-hidden="true">close</span>
					</button>
				</span>
			}
			<input
				#entry
				class="tags-field"
				type="text"
				autocomplete="off"
				autocapitalize="off"
				spellcheck="false"
				[attr.aria-labelledby]="labelledBy() || null"
				[attr.aria-label]="labelledBy() ? null : placeholder()"
				[placeholder]="values().length ? '' : placeholder()"
				[value]="draft()"
				(input)="onInput($event)"
				(keydown)="onKey($event)"
				(blur)="commit()"
			/>
		</div>
		@if (error()) {
			<p class="tags-error" role="alert">{{ error() }}</p>
		}
	`,
	styles: `
		:host {
			--tag-accent: #a16207;
			--tag-accent-soft: rgb(161 98 7 / 0.1);

			display: block;
		}

		:host-context(html[data-mode='dark']) {
			--tag-accent: #f4d37b;
			--tag-accent-soft: rgb(244 211 123 / 0.12);
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.5rem;
			min-height: 3rem;
			border: 1px solid var(--c-border);
			border-radius: 0.75rem;
			background: var(--c-bg-primary);
			padding: 0.375rem 0.5rem;
			cursor: text;
		}

		.tags:focus-within {
			outline: 2px solid var(--c-text-secondary);
			outline-offset: 2px;
		}

		.tag {
			display: inline-flex;
			align-items: center;
			gap: 0.25rem;
			border: 1px solid var(--tag-accent-soft);
			border-radius: 999px;
			background: var(--tag-accent-soft);
			color: var(--tag-accent);
			padding: 0.125rem 0.25rem 0.125rem 0.75rem;
			font-size: 0.8125rem;
			font-weight: 700;
			overflow-wrap: anywhere;
		}

		.tag-remove {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border-radius: 999px;
			color: inherit;
			cursor: pointer;
			padding: 0.125rem;
		}

		.tag-remove .material-symbols-outlined {
			font-size: 16px;
		}

		.tag-remove:hover {
			background: var(--tag-accent-soft);
		}

		.tag-remove:focus-visible {
			outline: 2px solid var(--c-text-secondary);
		}

		.tags-field {
			flex: 1 1 10rem;
			min-width: 8rem;
			border: 0;
			background: transparent;
			color: var(--c-text-primary);
			padding: 0.375rem 0.25rem;
			font-size: 0.9375rem;
			outline: 0;
		}

		.tags-error {
			margin-top: 0.25rem;
			color: var(--c-text-primary);
			font-size: 0.8125rem;
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsInputComponent {
	readonly values = model<string[]>([]);
	readonly kind = input<'text' | 'email'>('text');
	readonly placeholder = input('');
	readonly labelledBy = input('');
	/** Values that are refused, such as the email the account already has. */
	readonly exclude = input<string[]>([]);

	protected readonly draft = signal('');
	protected readonly error = signal('');

	protected remove(value: string) {
		this.values.update((current) => current.filter((item) => item !== value));
	}

	protected onInput(event: Event) {
		const text = (event.target as HTMLInputElement).value;

		this.draft.set(text);

		// A separator typed or pasted ends a value.
		if (/[\s,;]/.test(text)) {
			this.commit();
		}
	}

	protected onKey(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ',') {
			event.preventDefault();
			this.commit();
		} else if (event.key === 'Backspace' && !this.draft() && this.values().length) {
			this.values.update((current) => current.slice(0, -1));
		}
	}

	/** Adds every value in the field that is acceptable and keeps the rest to be corrected. */
	protected commit() {
		const tokens = this.draft().split(/[\s,;]+/).filter(Boolean);

		if (!tokens.length) {
			this.draft.set('');

			return;
		}

		const rejected: string[] = [];
		let message = '';
		let next = this.values();

		for (const token of tokens) {
			const value = this.kind() === 'email' ? token.toLowerCase().slice(0, 254) : token.slice(0, 100);

			if (this.kind() === 'email' && !EMAIL.test(value)) {
				rejected.push(token);
				message = 'Enter a valid email address.';
			} else if (this.exclude().some((item) => item.toLowerCase() === value)) {
				message = 'That is already your main email.';
			} else if (!next.includes(value)) {
				next = [...next, value];
			}
		}

		if (next !== this.values()) {
			this.values.set(next);
		}

		this.draft.set(rejected.join(' '));
		// What is still waiting in the field comes first.
		this.error.set(rejected.length ? 'Enter a valid email address.' : message);
	}
}
