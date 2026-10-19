export interface SeoBreadcrumb {
	name: string;
	path: string;
}

export interface SeoPage {
	/** English source text; translated when a dictionary is loaded. */
	title: string;
	description: string;
	/** Site-relative path without query, for example `/startup/meetka`. */
	path: string;
	/** Site-relative or absolute image. Defaults to the generated card for `path`. */
	image?: string;
	imageAlt?: string;
	titleSuffix?: string;
	type?: 'website' | 'profile';
	robots?: string;
	breadcrumbs?: SeoBreadcrumb[];
	/** `@id` of the JSON-LD node this page is about. */
	mainEntity?: string;
	jsonLd?: Record<string, unknown>[];
}
