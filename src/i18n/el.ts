import { Translate } from 'wacom';

export const el = {
	'Go to homepage': 'Μετάβαση στην αρχική σελίδα',
	'Switch to dark mode': 'Μετάβαση σε σκοτεινή λειτουργία',
	'Switch to light mode': 'Μετάβαση σε φωτεινή λειτουργία',
	'Open language menu': 'Άνοιγμα μενού γλωσσών',
	'Switch language to': 'Αλλαγή γλώσσας σε',
	'Our Services': 'Οι υπηρεσίες μας',
	'Technologies': 'Τεχνολογίες',
	'How We Work': 'Πώς εργαζόμαστε',
	'Partners': 'Συνεργάτες',
	'Contact': 'Επικοινωνία',
	'IT Solutions': 'Λύσεις πληροφορικής',
	'Main navigation': 'Κύρια πλοήγηση',
} as const;

export type ElTranslationKey = keyof typeof el;

export const elTranslates: Translate[] = Object.entries(el).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
