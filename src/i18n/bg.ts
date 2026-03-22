import { Translate } from 'wacom';

export const bg = {
	'Go to homepage': 'Към началната страница',
	'Switch to dark mode': 'Превключване към тъмен режим',
	'Switch to light mode': 'Превключване към светъл режим',
	'Open language menu': 'Отваряне на менюто за езици',
	'Switch language to': 'Превключване на езика на',
	'Our Services': 'Нашите услуги',
	'Technologies': 'Технологии',
	'How We Work': 'Как работим',
	'Partners': 'Партньори',
	'Contact': 'Контакт',
	'IT Solutions': 'ИТ решения',
	'Main navigation': 'Основна навигация',
} as const;

export type BgTranslationKey = keyof typeof bg;

export const bgTranslates: Translate[] = Object.entries(bg).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
