import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@wawjs/ngx-translate';

@Pipe({
	name: 'translate',
	standalone: true,
	pure: false,
})
export class TranslatePipe implements PipeTransform {
	private readonly _translateService = inject(TranslateService);

	transform(value: string): string {
		if (!value) {
			return '';
		}

		return this._translateService.translate(value)();
	}
}
