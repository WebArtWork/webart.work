export const AI_META = {
	title: 'AI Development & Business Automation Services',
	description:
		'Custom AI agents, chatbots, knowledge assistants and workflow automation from Web Art Work. AI integration for CRM, marketplaces, websites and business software.',
	image: 'https://webart.work/seo/ai.jpg',
	imageAlt: 'AI and automation: connected documents, conversations and business workflows by Web Art Work',
};

export const AI_KEYWORDS = [
	'AI development services',
	'AI automation agency',
	'custom AI agents',
	'business AI integration',
	'AI chatbot development',
	'AI workflow automation',
	'RAG knowledge assistant',
	'enterprise AI integration',
	'AI document processing',
];

export const AI_HIGHLIGHTS = [
	'10+ years of software development experience',
	'Full-stack engineering',
	'AI integrated into existing systems',
	'Measurable results',
	'Ongoing support',
];

export interface AiType {
	icon: string;
	title: string;
	text: string;
}

export const AI_TYPES: AiType[] = [
	{
		icon: 'smart_toy',
		title: 'AI agents & task assistants',
		text: 'Assistants that retrieve authorized information, use approved tools and perform defined steps, such as a quotation draft, an order status check or a follow-up task.',
	},
	{
		icon: 'support_agent',
		title: 'Customer support & sales chatbots',
		text: 'Help visitors find products, understand your services, request quotes or get answers from an approved knowledge base, with handoff to a human or your CRM.',
	},
	{
		icon: 'autorenew',
		title: 'Business process automation',
		text: 'Connect repetitive steps across emails, forms, documents, CRMs and internal workflows. Deterministic rules where they work best, AI where language understanding adds value.',
	},
	{
		icon: 'manage_search',
		title: 'Knowledge assistants & intelligent search',
		text: 'Permission-aware search and retrieval-augmented generation (RAG) over documentation, manuals, catalogs or internal policies, with source references where practical.',
	},
	{
		icon: 'description',
		title: 'Document & data processing',
		text: 'Extract and organize information from invoices, purchase orders, forms and support requests, classify incoming work and route it to the right team.',
	},
	{
		icon: 'extension',
		title: 'AI features for existing applications',
		text: 'Add intelligent search, recommendations, content assistance or classification to your CRM, marketplace, booking platform, website or mobile app.',
	},
];

export interface AiUseCase {
	icon: string;
	title: string;
	text: string;
}

export const AI_USE_CASES: AiUseCase[] = [
	{
		icon: 'contacts',
		title: 'CRM & sales',
		text: 'Summarize customer interactions, suggest next actions, classify leads and draft responses, while staff keep control of pricing and commitments.',
	},
	{
		icon: 'storefront',
		title: 'Marketplaces & e-commerce',
		text: 'Improve product search, assist with catalog descriptions, answer product questions and help support teams investigate orders.',
	},
	{
		icon: 'hotel',
		title: 'Hospitality & service businesses',
		text: 'Assist with guest questions, service requests and booking-related inquiries, with reservations and payments passing through verified business systems.',
	},
	{
		icon: 'admin_panel_settings',
		title: 'Operations & administration',
		text: 'Sort requests, process documents, flag missing information, prepare reports and support internal help desks.',
	},
	{
		icon: 'school',
		title: 'Education & training',
		text: 'Study assistants, guided practice and personalized learning interfaces with clear feedback and human oversight where appropriate.',
	},
];

export interface AiStep {
	title: string;
	text: string;
}

export const AI_STEPS: AiStep[] = [
	{
		title: 'AI opportunity assessment',
		text: 'We map your workflow, identify bottlenecks, review available data and assess risks, with prioritized use cases and an implementation estimate.',
	},
	{
		title: 'Proof of concept & evaluation',
		text: 'A limited experiment with representative, protected data, measuring output quality, latency, correction effort and running costs.',
	},
	{
		title: 'Custom AI application development',
		text: 'Interfaces, backend services, databases, model integrations, authentication, access rules and administration tools, integrated with your existing systems.',
	},
	{
		title: 'Integration & workflow automation',
		text: 'AI features connected to approved APIs and business processes, with validation, permissions, approval steps and fallbacks.',
	},
	{
		title: 'Testing, launch & staff enablement',
		text: 'Testing expected tasks, misleading inputs, access boundaries and failures, with rollout, monitoring and team onboarding.',
	},
	{
		title: 'Monitoring & continuous improvement',
		text: 'Monitor quality, cost, errors and usage; update prompts or workflows; retest against agreed examples; maintain the software over time.',
	},
];

export interface AiPrinciple {
	title: string;
	text: string;
}

export const AI_PRINCIPLES: AiPrinciple[] = [
	{
		title: 'Start with the workflow, not the model',
		text: 'We first establish who needs help, what they need to accomplish, which systems hold the relevant information and what success looks like.',
	},
	{
		title: 'Use the right combination',
		text: 'A practical solution can combine standard business logic, search, API integrations, AI models and human approvals. Not every task needs an autonomous agent.',
	},
	{
		title: 'Choose technology for your requirements',
		text: 'We can integrate services from providers such as OpenAI, Anthropic and Google, or evaluate locally hosted models, selected per project rather than one exclusive partnership.',
	},
	{
		title: 'Keep costs visible',
		text: 'We can track model usage, estimate processing costs, establish application-side budgets, and design caching, batching or simpler alternatives where suitable.',
	},
	{
		title: 'Build for real operations',
		text: 'We consider permissions, versioning, logging, errors, fallback behavior and maintainability, not only a successful demonstration.',
	},
];

export interface AiSecurityPoint {
	icon: string;
	title: string;
	text: string;
}

export const AI_SECURITY: AiSecurityPoint[] = [
	{
		icon: 'lock',
		title: 'Access control',
		text: 'A user or agent should retrieve only information that user is permitted to access.',
	},
	{
		icon: 'data_thresholding',
		title: 'Data minimization',
		text: 'Send only the information required for a task; evaluate retention, model-provider policies and data location.',
	},
	{
		icon: 'verified_user',
		title: 'Approval for important actions',
		text: 'Apply human confirmation to payments, publishing, deletion, sensitive updates and other consequential operations.',
	},
	{
		icon: 'fact_check',
		title: 'Quality checks',
		text: 'Validate structured outputs, test accuracy, and provide source references or uncertainty indicators when helpful.',
	},
	{
		icon: 'history',
		title: 'Auditability',
		text: 'Record relevant actions and failures without logging unnecessary secrets or personal data.',
	},
	{
		icon: 'support',
		title: 'Fallbacks',
		text: 'Provide a clear route to human support or conventional workflows when AI is unsuitable or unavailable.',
	},
];

export interface AiReason {
	icon: string;
	title: string;
	text: string;
}

export const AI_REASONS: AiReason[] = [
	{
		icon: 'hub',
		title: 'A complete development partner',
		text: 'We develop websites, mobile apps, CRM/BOS platforms, marketplaces, backend systems and business integrations. AI is added to software your company already relies on.',
	},
	{
		icon: 'workspace_premium',
		title: 'Engineering experience',
		text: 'Over a decade of software development experience in architecture, data modeling, integration, testing and ongoing maintenance.',
	},
	{
		icon: 'trending_up',
		title: 'Business-first delivery',
		text: 'We agree on measurable outcomes rather than promising that AI will automatically reduce costs or replace employees.',
	},
	{
		icon: 'alt_route',
		title: 'Flexible approach',
		text: 'A small assistant, a modernized workflow or a broader AI-enabled application. You can begin with a narrowly scoped pilot.',
	},
	{
		icon: 'handshake',
		title: 'Long-term support',
		text: 'We can maintain integrations and adjust the solution as providers, models, regulations and business needs evolve.',
	},
];

export interface AiFaq {
	question: string;
	answer: string;
}

export const AI_FAQS: AiFaq[] = [
	{
		question: 'Do I need to know which AI model to use?',
		answer: 'No. Explain the problem, users, available information and intended result. We can recommend a suitable combination of models, standard software and automation.',
	},
	{
		question: 'Can you integrate AI into our existing CRM or website?',
		answer: "Yes, where the system's architecture and permissions allow it. We assess APIs, data access, security and the workflow before development.",
	},
	{
		question: 'What is the difference between an AI chatbot and an AI agent?',
		answer: 'A chatbot primarily supports conversation and answers. An agent may also use approved tools to complete defined tasks. Tool access, boundaries and human approvals are part of the design.',
	},
	{
		question: 'Can the solution use our private documents?',
		answer: 'Possibly. We first assess ownership, permissions, data sensitivity, provider terms and an appropriate retrieval or hosting architecture. Private information is not automatically safe simply because it is used with AI.',
	},
	{
		question: 'Can we use our own API keys or AI provider accounts?',
		answer: 'Yes, when supported by the selected provider and project architecture. Credential ownership, security, billing responsibilities and access boundaries are agreed during planning.',
	},
	{
		question: 'How much does an AI project cost?',
		answer: 'Development cost depends on the workflow, complexity, data preparation, integrations, evaluation and support requirements. Model usage and third-party infrastructure can create separate recurring charges. We provide an estimate after discovery.',
	},
	{
		question: 'Will AI always be accurate or save us money?',
		answer: 'No. Quality, latency, running costs and human review vary by use case. We recommend pilots and benchmarks before making business-critical commitments.',
	},
	{
		question: 'Can you maintain and improve the system after launch?',
		answer: 'Yes. We can support monitoring, updates, quality evaluations, integrations and new features under an agreed maintenance scope.',
	},
];

export const AI_RELATED = [
	{ label: 'CRM & business software', path: '/crm' },
	{ label: 'Marketplaces & e-commerce', path: '/market' },
	{ label: 'Websites', path: '/website' },
	{ label: 'Mobile apps', path: '/app' },
	{ label: 'Back-End Development', path: '/service/back-end-development' },
	{ label: 'System Integration', path: '/service/system-integration' },
];
