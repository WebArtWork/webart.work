import { Translate } from 'wacom';

export const ua = {
	'Go to homepage': 'Перейти на головну сторінку',
	'Switch to dark mode': 'Увімкнути темний режим',
	'Switch to light mode': 'Увімкнути світлий режим',
	'Open language menu': 'Відкрити меню мов',
	'Switch language to': 'Перемкнути мову на',
	'Our Services': 'Наші послуги',
	'Technologies': 'Технології',
	'How We Work': 'Як ми працюємо',
	'Partners': 'Партнери',
	'Contact': 'Контакти',
	'IT Solutions': 'ІТ-рішення',
	'Main navigation': 'Головна навігація',
} as const;

export type UkrainianTranslationKey = keyof typeof ua;

export const uaTranslates: Translate[] = Object.entries(ua).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
