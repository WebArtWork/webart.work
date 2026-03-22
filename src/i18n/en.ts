import { Translate } from 'wacom';

const en: Record<string, string> = {};

export const enTranslates: Translate[] = Object.entries(en).map(([sourceText, text]) => ({
	sourceText,
	text,
}));
