import { Translate } from 'wacom';

export const es = {
	'Go to homepage': 'Ir a la página de inicio',
	'Switch to dark mode': 'Cambiar a modo oscuro',
	'Switch to light mode': 'Cambiar a modo claro',
	'Open language menu': 'Abrir menú de idiomas',
	'Switch language to': 'Cambiar idioma a',
	'Our Services': 'Nuestros servicios',
	'Technologies': 'Tecnologías',
	'How We Work': 'Cómo trabajamos',
	'Partners': 'Socios',
	'Contact': 'Contacto',
	'IT Solutions': 'Soluciones TI',
	'Main navigation': 'Navegación principal',
} as const;

export type EsTranslationKey = keyof typeof es;

export const esTranslates: Translate[] = Object.entries(es).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
