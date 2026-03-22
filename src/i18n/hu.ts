import { Translate } from 'wacom';

export const hu = {
	'Go to homepage': 'Ugrás a kezdőlapra',
	'Switch to dark mode': 'Váltás sötét módra',
	'Switch to light mode': 'Váltás világos módra',
	'Open language menu': 'Nyelvi menü megnyitása',
	'Switch language to': 'Nyelv váltása erre',
	'Our Services': 'Szolgáltatásaink',
	'Technologies': 'Technológiák',
	'How We Work': 'Hogyan dolgozunk',
	'Partners': 'Partnerek',
	'Contact': 'Kapcsolat',
	'IT Solutions': 'IT-megoldások',
	'Main navigation': 'Fő navigáció',
} as const;

export type HuTranslationKey = keyof typeof hu;

export const huTranslates: Translate[] = Object.entries(hu).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
