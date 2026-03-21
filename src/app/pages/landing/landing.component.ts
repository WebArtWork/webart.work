import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	imports: [NgOptimizedImage],
	templateUrl: './landing.component.html',
	styleUrl: './landing.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	protected readonly heroHighlights = [
		{
			icon: 'deployed_code',
			title: 'Custom Development',
			description:
				'Tailored digital products delivered with modern frameworks and clean engineering.',
		},
		{
			icon: 'public',
			title: 'Global Reach',
			description:
				'Remote-first collaboration for founders, teams, and growing companies worldwide.',
		},
		{
			icon: 'rocket_launch',
			title: 'Lightning Fast',
			description:
				'Short feedback loops, pragmatic delivery, and production-ready implementation.',
		},
	];

	protected readonly metrics = [
		{ value: '150+', label: 'IT professionals mentored' },
		{ value: '50+', label: 'Startups accelerated' },
		{ value: '10+', label: 'Years of experience' },
	];

	protected readonly services = [
		{
			title: 'Web Development',
			description:
				'Full-stack websites and web apps built for scale, speed, and maintainability.',
			image: 'landing/service_web_development.jpg',
			tags: ['Angular', 'Node.js', 'SSR'],
		},
		{
			title: 'Mobile Development',
			description:
				'Cross-platform mobile products with polished UX and reliable delivery pipelines.',
			image: 'landing/service_mobile_development.jpg',
			tags: ['Flutter', 'Ionic', 'Capacitor'],
		},
		{
			title: 'System Integration',
			description:
				'Bridging CRMs, APIs, payments, analytics, and back-office tools into one flow.',
			image: 'landing/service_system_integration.jpg',
			tags: ['REST', 'GraphQL', 'Automation'],
		},
		{
			title: 'Cloud Solutions',
			description:
				'Deployments, hosting, observability, and infrastructure tuned for real workloads.',
			image: 'landing/service_cloud_solutions.jpg',
			tags: ['AWS', 'Docker', 'CI/CD'],
		},
		{
			title: 'Data Solutions',
			description:
				'Dashboards, reporting, and storage architecture that turns raw data into decisions.',
			image: 'landing/service_data_solutions.jpg',
			tags: ['BI', 'ETL', 'Analytics'],
		},
		{
			title: 'Cybersecurity',
			description:
				'Practical security hardening for apps, access flows, and delivery processes.',
			image: 'landing/service_cybersecurity.jpg',
			tags: ['Audits', 'Access', 'Hardening'],
		},
		{
			title: 'UI/UX Design',
			description:
				'Interfaces that stay clear, conversion-focused, and technically feasible.',
			image: 'landing/service_ui_ux_design.jpg',
			tags: ['Figma', 'UX Flows', 'Design Systems'],
		},
		{
			title: 'Augmented / Virtual Reality Solutions',
			description:
				'Interactive real-time experiences for training, demos, and product storytelling.',
			image: 'landing/service_augmented_virtual_reality_solutions.jpg',
			tags: ['Unity', 'WebGL', '3D'],
		},
		{
			title: 'Unity Development',
			description:
				'Immersive 2D and 3D product builds for apps, prototypes, and interactive platforms.',
			image: 'landing/service_unity_development.jpg',
			tags: ['Unity', 'C#', 'Real-time'],
		},
		{
			title: 'Business Analysis / Strategy',
			description:
				'Scoping, product thinking, and backlog shaping before costly implementation starts.',
			image: 'landing/service_business_analysis_strategy.jpg',
			tags: ['Discovery', 'Roadmaps', 'Planning'],
		},
		{
			title: 'Technical Support Services',
			description:
				'Operational support, bug fixing, upgrades, and steady release management.',
			image: 'landing/service_technical_support_services.jpg',
			tags: ['Monitoring', 'SLA', 'Updates'],
		},
		{
			title: 'Digital Marketing',
			description:
				'Technical growth support for launch pages, campaigns, and measurable visibility.',
			image: 'landing/service_digital_marketing.jpg',
			tags: ['SEO', 'Content', 'Funnels'],
		},
		{
			title: 'Search Engine Optimization',
			description:
				'Search visibility improvements driven by technical structure, content planning, and intent.',
			image: 'landing/service_search_engine_optimization.jpg',
			tags: ['SEO', 'Performance', 'Content'],
		},
		{
			title: 'Social Media Marketing',
			description:
				'Platform-specific campaigns and content systems that keep brand communication active.',
			image: 'landing/service_social_media_marketing.jpg',
			tags: ['Content', 'Campaigns', 'Community'],
		},
		{
			title: 'Influencer Marketing',
			description:
				'Partnership-driven promotion strategies designed for authentic reach and measurable lift.',
			image: 'landing/service_influencer_marketing.jpg',
			tags: ['Reach', 'Partnerships', 'Brand'],
		},
		{
			title: 'Quality Assurance',
			description:
				'Manual and structured QA that keeps product quality visible throughout delivery.',
			image: 'landing/service_quality_assurance.jpg',
			tags: ['Testing', 'Regression', 'UAT'],
		},
		{
			title: 'IT Consulting',
			description:
				'Clear technical direction for teams that need decisions, not generic advice.',
			image: 'landing/service_it_consulting.jpg',
			tags: ['Audit', 'Advisory', 'Delivery'],
		},
		{
			title: 'Chief Technology Officer Services',
			description:
				'Hands-on leadership for architecture, hiring, delivery structure, and execution.',
			image: 'landing/service_chief_technology_officer_services.jpg',
			tags: ['Strategy', 'Hiring', 'Architecture'],
		},
		{
			title: 'Client Onboarding / Implementation',
			description:
				'Structured onboarding flows that turn signed clients into operational delivery quickly.',
			image: 'landing/service_client_onboarding_implementation.jpg',
			tags: ['Setup', 'Operations', 'Enablement'],
		},
		{
			title: 'Corporate Training / Development',
			description:
				'Team upskilling programs designed to improve delivery maturity and technical depth.',
			image: 'landing/service_corporate_training_development.jpg',
			tags: ['Training', 'Workshops', 'Mentoring'],
		},
	];

	protected readonly technologyGroups = [
		{
			title: 'Frontend',
			accentColor: '#38bdf8',
			tools: [
				'Wjst',
				'Angular',
				'React',
				'Next.js',
				'Vue',
				'Tailwind',
				'TypeScript',
				'SCSS',
				'WebGL',
			],
		},
		{
			title: 'Backend',
			accentColor: '#34d399',
			tools: [
				'Node.js',
				'NestJS',
				'Python',
				'Django',
				'FastAPI',
				'PHP',
				'Java',
				'.NET',
				'GraphQL',
			],
		},
		{
			title: 'Databases',
			accentColor: '#a78bfa',
			tools: [
				'MongoDB',
				'PostgreSQL',
				'MySQL',
				'SQLite',
				'MariaDB',
				'Redis',
				'Elasticsearch',
			],
		},
		{
			title: 'Cloud & DevOps',
			accentColor: '#fb923c',
			tools: [
				'CI/CD',
				'AWS',
				'Google Cloud',
				'Azure',
				'Docker',
				'Kubernetes',
				'Terraform',
				'Nginx',
			],
		},
		{
			title: 'Mobile',
			accentColor: '#fb7185',
			tools: [
				'Capacitor',
				'Cordova',
				'Ionic',
				'React Native',
				'Flutter',
				'Swift',
				'Kotlin',
				'PWA',
			],
		},
		{
			title: 'Tools & Services',
			accentColor: '#fcd34d',
			tools: [
				'Git',
				'GitHub',
				'Jira',
				'Trello',
				'Figma',
				'Canva',
				'Postman',
				'Swagger',
				'Sentry',
			],
		},
	];

	protected readonly technologyPrinciples = [
		{
			title: 'Innovation First',
			description:
				'We choose modern tools when they materially improve delivery, quality, or leverage.',
			image: 'landing/philosophy_innovation_first.jpg',
		},
		{
			title: 'Scalable Architecture',
			description:
				'Every decision is shaped around growth, maintainability, and pragmatic future changes.',
			image: 'landing/philosophy_scalable_architecture.jpg',
		},
		{
			title: 'Security by Design',
			description:
				'Secure defaults are part of the delivery process, not a patch layered on later.',
			image: 'landing/philosophy_security_by_design.jpg',
		},
	];

	protected readonly workflowSteps = [
		{
			number: '01',
			title: 'Project Communication',
			description:
				'We align on the business context, constraints, desired outcome, and success signals.',
			image: 'landing/profile.jpg',
			points: ['Initial discovery', 'Needs review', 'Risk mapping'],
		},
		{
			number: '02',
			title: 'Planning & Estimate',
			description:
				'Scope is turned into a practical roadmap with delivery stages and technical options.',
			image: 'landing/dd.png',
			points: ['Feature breakdown', 'Cost estimate', 'Execution plan'],
		},
		{
			number: '03',
			title: 'Development',
			description:
				'Implementation runs in short iterations with visible progress and constant review.',
			image: 'landing/photo1.jpg',
			points: ['Agile cycles', 'Peer review', 'Regular demos'],
		},
		{
			number: '04',
			title: 'Testing & QA',
			description:
				'We verify product behavior, edge cases, and readiness before shipping to users.',
			image: 'landing/den.jpg',
			points: ['Manual QA', 'Regression pass', 'Acceptance checks'],
		},
		{
			number: '05',
			title: 'Deployment',
			description:
				'Release is handled with environment checks, monitoring, and rollback awareness.',
			image: 'landing/sv.jpg',
			points: ['Release prep', 'Infrastructure check', 'Launch support'],
		},
		{
			number: '06',
			title: 'Support & Growth',
			description:
				'After launch we keep refining performance, adding features, and maintaining stability.',
			image: 'landing/cake.jpg',
			points: ['Post-launch support', 'Optimisation', 'Next iterations'],
		},
	];

	protected readonly partners = [
		{ name: 'uacode', logo: 'landing/uacode.png' },
		{ name: 'Tpotier', logo: 'landing/tpotier.png' },
		{ name: 'Panianka', logo: 'landing/panianka.png' },
		{ name: 'JH Studio', logo: 'landing/jh.png' },
	];
}
