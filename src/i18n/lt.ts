import { Translate } from 'wacom';

export const lt = {
	'Go to homepage': 'Eiti į pagrindinį puslapį',
	'Switch to dark mode': 'Perjungti į tamsųjį režimą',
	'Switch to light mode': 'Perjungti į šviesųjį režimą',
	'Open language menu': 'Atidaryti kalbų meniu',
	'Switch language to': 'Perjungti kalbą į',
	'Our Services': 'Mūsų paslaugos',
	'Technologies': 'Technologijos',
	'How We Work': 'Kaip dirbame',
	'Partners': 'Partneriai',
	'Contact': 'Kontaktai',
	'IT Solutions': 'IT sprendimai',
	'Main navigation': 'Pagrindinė navigacija',
} as const;

export type LtTranslationKey = keyof typeof lt;

export const ltTranslates: Translate[] = Object.entries(lt).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
