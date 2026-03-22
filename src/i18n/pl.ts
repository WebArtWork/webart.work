import { Translate } from 'wacom';

export const pl = {
	'Go to homepage': 'Przejdź do strony głównej',
	'Switch to dark mode': 'Przełącz na tryb ciemny',
	'Switch to light mode': 'Przełącz na tryb jasny',
	'Open language menu': 'Otwórz menu języków',
	'Switch language to': 'Przełącz język na',
	'Our Services': 'Nasze usługi',
	'Technologies': 'Technologie',
	'How We Work': 'Jak pracujemy',
	'Partners': 'Partnerzy',
	'Contact': 'Kontakt',
	'IT Solutions': 'Rozwiązania IT',
	'Main navigation': 'Główna nawigacja',
} as const;

export type PlTranslationKey = keyof typeof pl;

export const plTranslates: Translate[] = Object.entries(pl).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
