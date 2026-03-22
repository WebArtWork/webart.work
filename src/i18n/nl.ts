import { Translate } from 'wacom';

export const nl = {
	'Go to homepage': 'Ga naar de homepage',
	'Switch to dark mode': 'Schakel naar donkere modus',
	'Switch to light mode': 'Schakel naar lichte modus',
	'Open language menu': 'Taalmenu openen',
	'Switch language to': 'Taal wijzigen naar',
	'Our Services': 'Onze diensten',
	'Technologies': 'Technologieën',
	'How We Work': 'Hoe wij werken',
	'Partners': 'Partners',
	'Contact': 'Contact',
	'IT Solutions': 'IT-oplossingen',
	'Main navigation': 'Hoofdnavigatie',
} as const;

export type NlTranslationKey = keyof typeof nl;

export const nlTranslates: Translate[] = Object.entries(nl).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
