import { Translate } from 'wacom';

export const hr = {
	'Go to homepage': 'Idi na početnu stranicu',
	'Switch to dark mode': 'Prebaci na tamni način rada',
	'Switch to light mode': 'Prebaci na svijetli način rada',
	'Open language menu': 'Otvori izbornik jezika',
	'Switch language to': 'Promijeni jezik na',
	'Our Services': 'Naše usluge',
	'Technologies': 'Tehnologije',
	'How We Work': 'Kako radimo',
	'Partners': 'Partneri',
	'Contact': 'Kontakt',
	'IT Solutions': 'IT rješenja',
	'Main navigation': 'Glavna navigacija',
} as const;

export type HrTranslationKey = keyof typeof hr;

export const hrTranslates: Translate[] = Object.entries(hr).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
