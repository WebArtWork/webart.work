export const CRM_META = {
	title: 'Custom CRM Development & Business Software',
	description:
		'Custom CRM development by Web Art Work. 7 years contributing to ArboStar. Sales, scheduling, automation, analytics, mobile apps and integrations.',
	image: 'https://webart.work/seo/crm.jpg',
	imageAlt: 'Custom CRM: customer profiles, scheduling and sales pipelines by Web Art Work',
};

export const CRM_KEYWORDS = [
	'custom CRM development',
	'CRM development company',
	'business management software development',
	'enterprise CRM',
	'custom business software',
	'business operating system',
	'SaaS CRM',
	'field service CRM',
	'Angular CRM development',
];

export const CRM_HIGHLIGHTS = [
	'10+ years in software',
	'7 years contributing to ArboStar',
	'Angular and full-stack engineering',
	'Web and mobile interfaces',
	'Long-term support',
];

export const CRM_FOCUS = [
	'Pipelines, estimates and sales reporting',
	'Calendars, dispatch and job tracking',
	'Field job information for crews',
	'Invoices, balances and financial dashboards',
	'Reliable management reporting',
	'Automation without removing human oversight',
	'Room to grow into a full business operating system',
];

export interface CrmType {
	icon: string;
	title: string;
	text: string;
}

export const CRM_TYPES: CrmType[] = [
	{
		icon: 'trending_up',
		title: 'Sales CRM',
		text: 'Contacts, companies, leads, opportunities, pipelines, proposals, follow-ups and sales analytics, connected to web forms, email and other lead sources.',
	},
	{
		icon: 'home_repair_service',
		title: 'Service & field operations CRM',
		text: 'Customer inquiries connected to quotes, appointments, dispatch, crews, work orders, photos, job completion, invoices and service history.',
	},
	{
		icon: 'corporate_fare',
		title: 'Enterprise CRM & business operating systems',
		text: 'Departments, branches, permissions, approvals, resources, finance-related workflows, documents, dashboards and custom operational modules in one platform.',
	},
	{
		icon: 'category',
		title: 'Industry-specific CRM',
		text: 'Terminology and workflows adapted for hospitality, manufacturing, construction, property services, logistics, wholesale and professional services.',
	},
	{
		icon: 'workspaces',
		title: 'SaaS & white-label CRM',
		text: 'Subscription software for multiple customer organizations with tenant isolation, onboarding, feature management, billing integrations and configurable roles.',
	},
	{
		icon: 'hub',
		title: 'Franchise & multi-location systems',
		text: 'Central management and branch-specific operations with organizational hierarchies, access controls, brand configurations and local versus consolidated reports.',
	},
];

export interface CrmQuality {
	icon: string;
	title: string;
	text: string;
}

export const CRM_CAPABILITIES: CrmQuality[] = [
	{
		icon: 'contacts',
		title: 'Customers & companies',
		text: 'Profiles, contacts, histories, notes, files, segments, custom fields, duplicate handling, import/export and search.',
	},
	{
		icon: 'request_quote',
		title: 'Sales & estimates',
		text: 'Lead sources, ownership, pipeline stages, quotations, pricing and tax rules, PDF documents, approvals, reminders and sales reporting.',
	},
	{
		icon: 'calendar_month',
		title: 'Scheduling & jobs',
		text: 'Calendars, availability, appointments, dispatch, tasks, work orders, crews, checklists, status tracking and completion evidence.',
	},
	{
		icon: 'groups',
		title: 'Employees & resources',
		text: 'Teams, roles, shifts, assignment rules, attendance where required, equipment, warehouses, stock and resource availability.',
	},
	{
		icon: 'payments',
		title: 'Financial operations',
		text: 'Invoices, payment statuses, expenses, customer balances, receivables aging, financial dashboards and accounting integrations.',
	},
	{
		icon: 'summarize',
		title: 'Documents & reporting',
		text: 'Attachments, versioning, generated files, audit histories, dashboards, KPIs, filtered exports and scheduled reports.',
	},
	{
		icon: 'forum',
		title: 'Communication',
		text: 'Email, SMS, notifications, templates, task reminders and communication histories through supported providers.',
	},
];

export const CRM_AUTOMATION_EXAMPLES = [
	'Automatically assign an incoming lead',
	'Send an estimate reminder',
	'Update a job after an approval',
	'Notify a crew about a schedule change',
	'Prepare a payment reminder',
	'Generate a weekly management report',
];

export const CRM_DEPLOYMENT: CrmQuality[] = [
	{
		icon: 'desktop_windows',
		title: 'Web CRM',
		text: 'Detailed tables, forms, calendars and dashboards for office teams.',
	},
	{
		icon: 'smartphone',
		title: 'Mobile apps',
		text: 'Focused workflows for sales representatives, managers and field employees on iOS and Android.',
	},
	{
		icon: 'person',
		title: 'Customer portals',
		text: 'Requests, booking details, estimates, documents and service history.',
	},
	{
		icon: 'handshake',
		title: 'Partner portals',
		text: 'Controlled access for contractors, suppliers, franchisees or B2B customers.',
	},
	{
		icon: 'wifi_off',
		title: 'Offline workflows',
		text: 'Selected data entry and synchronization when supported and explicitly planned.',
	},
];

export const CRM_INTEGRATIONS: CrmQuality[] = [
	{
		icon: 'web',
		title: 'Websites & lead forms',
		text: 'Existing websites and lead sources connected to your pipeline.',
	},
	{
		icon: 'mail',
		title: 'Email & messaging',
		text: 'Email, SMS and messaging providers for communication and reminders.',
	},
	{
		icon: 'account_balance',
		title: 'ERP & accounting',
		text: 'Financial systems synced with invoices, balances and expenses.',
	},
	{
		icon: 'credit_card',
		title: 'Payment providers',
		text: 'Payment status and collections connected to customer accounts.',
	},
	{
		icon: 'inventory_2',
		title: 'Inventory & maps',
		text: 'Stock systems, mapping and e-commerce or analytics platforms.',
	},
	{
		icon: 'api',
		title: 'Third-party APIs & migration',
		text: 'Existing spreadsheets, legacy CRMs or databases assessed and migrated.',
	},
];

export interface CrmTechGroup {
	title: string;
	items: string;
}

export const CRM_TECH: CrmTechGroup[] = [
	{
		title: 'Frontend',
		items: 'Angular, React, Vue, TypeScript',
	},
	{
		title: 'Backend',
		items: 'Node.js, Express, NestJS, Python, PHP',
	},
	{
		title: 'Data',
		items: 'MongoDB, PostgreSQL, MySQL',
	},
	{
		title: 'Architecture',
		items: 'Modular services, queues, background jobs, audit logs, role-based permissions, tenant isolation',
	},
];

export interface CrmPhase {
	title: string;
	text: string;
}

export const CRM_PHASES: CrmPhase[] = [
	{
		title: 'Phase 1',
		text: 'Customers, companies, leads and accounts.',
	},
	{
		title: 'Phase 2',
		text: 'Pipelines, communication, estimates and follow-ups.',
	},
	{
		title: 'Phase 3',
		text: 'Scheduling, jobs, employees and resources.',
	},
	{
		title: 'Phase 4',
		text: 'Invoices, reports, financial workflows and management dashboards.',
	},
	{
		title: 'Phase 5',
		text: 'Automation, integrations, mobile applications and advanced SaaS or multi-company capabilities.',
	},
];

export interface CrmStep {
	title: string;
	text: string;
}

export const CRM_STEPS: CrmStep[] = [
	{
		title: 'Discovery',
		text: 'Understand business processes, users, existing tools and measurable goals.',
	},
	{
		title: 'Planning',
		text: 'Agree on scope, architecture, milestones, budget and responsibilities.',
	},
	{
		title: 'UI/UX design',
		text: 'Design practical dashboards, data tables, workflows, forms and mobile screens.',
	},
	{
		title: 'Development & QA',
		text: 'Build iteratively and test logic, permissions, data, integrations and regression scenarios.',
	},
	{
		title: 'Deployment & onboarding',
		text: 'Prepare production, migrate agreed data, configure users and hand over documentation.',
	},
	{
		title: 'Support & evolution',
		text: 'Maintain reliability, implement updates and extend the platform as needed.',
	},
];

export const CRM_REASONS: CrmQuality[] = [
	{
		icon: 'workspace_premium',
		title: 'Seven years contributing to ArboStar',
		text: 'Relevant experience with a complex, real-world industry platform.',
	},
	{
		icon: 'groups',
		title: '10+ years of broader engineering',
		text: 'Frontend, backend, integrations, mobile, testing and infrastructure under one agency.',
	},
	{
		icon: 'handshake',
		title: 'Transparent milestones',
		text: 'Real operations and maintainability prioritized over feature lists without business value.',
	},
	{
		icon: 'trending_up',
		title: 'A long-term partner',
		text: 'From a focused CRM to a full business operating system, with the same team.',
	},
];

export interface CrmFaq {
	question: string;
	answer: string;
}

export const CRM_FAQS: CrmFaq[] = [
	{
		question: 'What is the difference between CRM and BOS?',
		answer: 'CRM focuses on customer relationships and sales. A Business Operating System connects a wider set of company operations, which may include CRM, scheduling, staff, jobs, invoices and reporting.',
	},
	{
		question: 'Did WAW build ArboStar?',
		answer: 'Members of our team contributed for approximately seven years. ArboStar is an independent platform involving multiple contributors; we do not claim to have built or to own it entirely.',
	},
	{
		question: 'Can you build something similar to ArboStar?',
		answer: 'We can design a new industry-specific system with independently developed and appropriately scoped CRM, estimating, scheduling, field operations, invoicing and reporting functionality.',
	},
	{
		question: 'Can you build a CRM from scratch or improve an existing one?',
		answer: 'Yes. We offer greenfield development, MVPs, feature extensions, modernization, integration and maintenance after an initial technical review.',
	},
	{
		question: 'Can the CRM support multiple branches, companies or customers?',
		answer: 'Yes. We can plan role permissions, organization hierarchies and multi-tenant or multi-company isolation around your business model.',
	},
	{
		question: 'Can employees use it on mobile or offline?',
		answer: 'Yes. Supported mobile platforms and selected offline workflows can be included when the project requires them.',
	},
	{
		question: 'Can you connect websites, accounting, payments and third-party tools?',
		answer: 'Yes, subject to available APIs, permissions and provider requirements. Migration from an existing system is also possible after data assessment.',
	},
	{
		question: 'Can you add AI to the CRM?',
		answer: 'Yes, for suitable tasks such as search, summarization, classification, document processing and assistance, with safeguards and cost review.',
	},
	{
		question: 'How much will it cost and how long will it take?',
		answer: 'It depends on modules, roles, business rules, integrations, data migration, design and security. We define phased estimates and milestones after discovery.',
	},
	{
		question: 'Who owns the resulting software and can WAW maintain it?',
		answer: 'Source-code ownership, IP, infrastructure accounts, licensing and handover are specified in the contract. Ongoing maintenance and development can be provided separately.',
	},
];

export const CRM_RELATED = [
	{ label: 'Websites', path: '/website' },
	{ label: 'Mobile apps', path: '/app' },
	{ label: 'Marketplaces & e-commerce', path: '/market' },
	{ label: 'Back-End Development', path: '/service/back-end-development' },
	{ label: 'UI/UX Design', path: '/service/ui-ux-design' },
	{ label: 'System Integration', path: '/service/system-integration' },
];
