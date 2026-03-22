import { Translate } from 'wacom';

export const pt = {
	'Go to homepage': 'Ir para a página inicial',
	'Switch to dark mode': 'Mudar para o modo escuro',
	'Switch to light mode': 'Mudar para o modo claro',
	'Open language menu': 'Abrir menu de idiomas',
	'Switch language to': 'Mudar idioma para',
	'Our Services': 'Nossos serviços',
	'Technologies': 'Tecnologias',
	'How We Work': 'Como trabalhamos',
	'Partners': 'Parceiros',
	'Contact': 'Contacto',
	'IT Solutions': 'Soluções de TI',
	'Main navigation': 'Navegação principal',
} as const;

export type PtTranslationKey = keyof typeof pt;

export const ptTranslates: Translate[] = Object.entries(pt).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
