export interface Proposal {
	_id: string;
	clientName: string;
	clientSlug?: string;
	title: string;
	subtitle?: string;
	status?: string;
	currency?: string;
	websites?: Website[];
	explanation?: Explanation;
	costs?: Cost[];
	totalPrice?: number;
	ctaText?: string;
	ctaUrl?: string;
	contactName?: string;
	contactPhone?: string;
	contactEmail?: string;
	brandName?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Website {
	title: string;
	url: string;
	type?: string;
	description?: string;
	previewImage?: string;
	tags?: string[];
	status?: string;
	order?: number;
}

export interface Explanation {
	title?: string;
	text?: string;
	points?: string[];
}

export interface Cost {
	title: string;
	description?: string;
	price: number;
	period?: string;
	items?: string[];
	isRecommended?: boolean;
	isOptional?: boolean;
	order?: number;
}
