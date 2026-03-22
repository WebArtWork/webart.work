import { Translate } from 'wacom';

export const fi = {
	'Go to homepage': 'Siirry etusivulle',
	'Switch to dark mode': 'Vaihda tummaan tilaan',
	'Switch to light mode': 'Vaihda vaaleaan tilaan',
	'Open language menu': 'Avaa kielivalikko',
	'Switch language to': 'Vaihda kieleksi',
	'Our Services': 'Palvelumme',
	'Technologies': 'Teknologiat',
	'How We Work': 'Miten työskentelemme',
	'Partners': 'Kumppanit',
	'Contact': 'Yhteystiedot',
	'IT Solutions': 'IT-ratkaisut',
	'Main navigation': 'Päänavigointi',
} as const;

export type FiTranslationKey = keyof typeof fi;

export const fiTranslates: Translate[] = Object.entries(fi).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
