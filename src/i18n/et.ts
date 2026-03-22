import { Translate } from 'wacom';

export const et = {
	'Go to homepage': 'Mine avalehele',
	'Switch to dark mode': 'Lülitu tumedale režiimile',
	'Switch to light mode': 'Lülitu heledale režiimile',
	'Open language menu': 'Ava keelemenüü',
	'Switch language to': 'Vaheta keel keeleks',
	'Our Services': 'Meie teenused',
	'Technologies': 'Tehnoloogiad',
	'How We Work': 'Kuidas me töötame',
	'Partners': 'Partnerid',
	'Contact': 'Kontakt',
	'IT Solutions': 'IT-lahendused',
	'Main navigation': 'Põhinavigeerimine',
} as const;

export type EtTranslationKey = keyof typeof et;

export const etTranslates: Translate[] = Object.entries(et).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
