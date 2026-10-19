import { Company } from './company.interface';

export const EMPTY_COMPANY: Company = {
	_id: '',
	name: '',
	title: '',
	description: '',
	image: '',
};

export const COMPANY_FALLBACK: Company = {
	_id: '',
	name: 'Web Art Work',
	title: 'Digital Solutions',
	description:
		"Web freelancer's community based in Ukraine with over 10 years in app and web development.",
	image: 'https://webart.work/seo/home.jpg',
};

export const HOME_META = {
	title: 'Web Art Work: Web & Mobile App Development in Ukraine',
	titleSuffix: '',
	description:
		'Ukrainian freelance community building websites, web and mobile apps for clients and our own startups. Over 10 years of delivery and a free consultation.',
};
