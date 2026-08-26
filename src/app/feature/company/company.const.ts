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
	image: 'https://webart.work/img/avatar.png',
};

export const HOME_META = {
	title: 'Web Art Work Community',
	titleSuffix: '',
	description:
		"Find the right freelancer for your project, and grow your skills through Web Art Work's freelance community, courses, and training programs.",
	image: 'https://webart.work/img/avatar.png',
};
