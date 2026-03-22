import { Translate } from 'wacom';

export const lv = {
	'Go to homepage': 'Doties uz sākumlapu',
	'Switch to dark mode': 'Pārslēgt uz tumšo režīmu',
	'Switch to light mode': 'Pārslēgt uz gaišo režīmu',
	'Open language menu': 'Atvērt valodu izvēlni',
	'Switch language to': 'Pārslēgt valodu uz',
	'Our Services': 'Mūsu pakalpojumi',
	'Technologies': 'Tehnoloģijas',
	'How We Work': 'Kā mēs strādājam',
	'Partners': 'Partneri',
	'Contact': 'Kontakti',
	'IT Solutions': 'IT risinājumi',
	'Main navigation': 'Galvenā navigācija',
} as const;

export type LvTranslationKey = keyof typeof lv;

export const lvTranslates: Translate[] = Object.entries(lv).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
