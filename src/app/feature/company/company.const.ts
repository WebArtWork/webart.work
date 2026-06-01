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
	description: 'Web freelancer\'s community based in Ukraine with over 10 years in app and web development.',
	image: '',
};
