export const QUANTUM_META = {
	title: 'Quantum Computing Development Services',
	description:
		'Explore quantum computing with Web Art Work. Quantum feasibility studies, optimization prototypes, IBM Quantum integration and custom software for businesses.',
	image: 'https://webart.work/seo/quantum.jpg',
};

export const QUANTUM_KEYWORDS = [
	'quantum computing development',
	'quantum software development',
	'IBM Quantum integration',
	'quantum optimization',
	'quantum feasibility study',
	'quantum proof of concept',
	'hybrid quantum-classical algorithms',
];

export interface QuantumCard {
	icon: string;
	title: string;
	text: string;
}

export const QUANTUM_FIT_POINTS = [
	'Many possible combinations, rules and constraints',
	'A clear way to measure a good result',
	'A classical method to compare against',
];

export const QUANTUM_BUILDS: QuantumCard[] = [
	{
		icon: 'tune',
		title: 'Business optimization',
		text: 'Quantum and hybrid models for scheduling, resource allocation, production planning, task assignment and portfolio selection, compared against conventional optimization.',
	},
	{
		icon: 'code',
		title: 'Quantum software development',
		text: 'Circuit applications, algorithm prototypes, computational services and dashboards for quantum experiments, standalone or inside your platform.',
	},
	{
		icon: 'science',
		title: 'Quantum simulation',
		text: 'We develop and validate circuits on a simulator before any real hardware is used. This is usually where a project starts.',
	},
	{
		icon: 'cloud_sync',
		title: 'IBM Quantum integration',
		text: 'Submit jobs, retrieve results, monitor execution and work with your own IBM Quantum account. Real hardware is used only for a defined experiment.',
	},
];

export interface QuantumService {
	title: string;
	summary: string;
	text: string;
	deliverables: string[];
}

export const QUANTUM_SERVICES: QuantumService[] = [
	{
		title: 'Quantum feasibility assessment',
		summary: 'Find out whether quantum computing deserves a place in your project.',
		text: 'We review your challenge and compare quantum approaches with established classical methods, which are often the more practical choice.',
		deliverables: [
			'Analysis of your computational challenge',
			'Suitable classical and quantum approaches',
			'Technical feasibility and limitations',
			'Estimated scope and infrastructure needs',
			'Recommendations and a next-step plan',
		],
	},
	{
		title: 'Quantum proof of concept',
		summary: 'Test the technology before a larger investment.',
		text: 'We turn a defined problem into a working prototype with circuits, simulation, hybrid optimization and, where justified, runs on IBM Quantum hardware.',
		deliverables: [
			'Working experimental prototype',
			'Quantum and classical implementations',
			'Simulation and hardware test results',
			'Quality, speed and cost comparisons',
			'Technical documentation and recommendations',
		],
	},
	{
		title: 'Quantum-ready application development',
		summary: 'Bring validated capabilities into your software.',
		text: 'If experiments show a useful result, we build the APIs, interfaces and workflows around it. Classical execution stays as the reliable default or fallback.',
		deliverables: [
			'Custom application or integration',
			'Quantum computation API and job management',
			'User interfaces and execution monitoring',
			'Classical fallback handling',
			'Testing, deployment, documentation and support',
		],
	},
];

export const QUANTUM_INDUSTRIES: QuantumCard[] = [
	{
		icon: 'hotel',
		title: 'Hotels and hospitality',
		text: 'Room assignments, housekeeping and staff schedules with many changing constraints.',
	},
	{
		icon: 'precision_manufacturing',
		title: 'Manufacturing',
		text: 'Balancing equipment, workers, materials and production priorities.',
	},
	{
		icon: 'local_shipping',
		title: 'Logistics',
		text: 'Delivery planning, vehicle assignment and warehouse operations.',
	},
	{
		icon: 'monitoring',
		title: 'Finance and portfolios',
		text: 'Weighing risk, diversification and expected return, always against classical benchmarks.',
	},
	{
		icon: 'school',
		title: 'Education and research',
		text: 'Visual circuit builders, algorithm demos and interactive simulations for students and developers.',
	},
];

export const QUANTUM_EXAMPLE_STEPS = [
	'Define rooms, staff, deadlines and constraints.',
	'Build a conventional optimization model.',
	'Build a simplified quantum optimization experiment.',
	'Run simulations, and real hardware when justified.',
	'Compare quality, time, feasibility and cost.',
	'Recommend the best approach for daily operations.',
];

export interface QuantumStep {
	title: string;
	text: string;
}

export const QUANTUM_STEPS: QuantumStep[] = [
	{
		title: 'Discovery',
		text: 'We start from your business problem and existing systems, not from the technology.',
	},
	{
		title: 'Feasibility and planning',
		text: 'Approaches, success criteria, stages and a cost estimate, agreed before any build.',
	},
	{
		title: 'Prototype development',
		text: 'Models, algorithms and simulation workflows, built in short iterations you can follow.',
	},
	{
		title: 'Testing and benchmarking',
		text: 'Quantum and classical results compared. Real hardware runs only with your approval.',
	},
	{
		title: 'Integration and deployment',
		text: 'When the result is useful in practice, we integrate it into your software and launch.',
	},
	{
		title: 'Support and evolution',
		text: 'Maintenance, better algorithms and updates as quantum technology develops.',
	},
];

export const QUANTUM_IBM_POINTS: QuantumCard[] = [
	{
		icon: 'science',
		title: 'Start with simulation',
		text: 'Develop and test algorithms without using quantum processor time.',
	},
	{
		icon: 'key',
		title: 'Use your own IBM account',
		text: 'Connect your own IBM Quantum instance. You keep control of the plan and usage.',
	},
	{
		icon: 'payments',
		title: 'Free and paid access',
		text: 'IBM offers a free Open Plan with limited processor time and paid plans for more. IBM sets the terms and prices.',
	},
	{
		icon: 'monitoring',
		title: 'Monitored experiments',
		text: 'Track jobs, status, results and usage. Limits for paid runs are agreed in advance.',
	},
];

export const QUANTUM_REASONS: QuantumCard[] = [
	{
		icon: 'groups',
		title: 'A full development team',
		text: 'Backend, frontend, APIs, databases, cloud and testing around the algorithm.',
	},
	{
		icon: 'rocket_launch',
		title: 'Already in our products',
		text: 'Our own startups use a shared quantum module with simulation and IBM Quantum.',
	},
	{
		icon: 'fact_check',
		title: 'Research run as software',
		text: 'Requirements, milestones, tested deliverables and documentation.',
	},
	{
		icon: 'balance',
		title: 'Technology chosen for the problem',
		text: 'If a classical algorithm is more reliable or cheaper, we will say so.',
	},
	{
		icon: 'hub',
		title: 'Works with your systems',
		text: 'Add capabilities to your CRM, ERP or custom platform instead of replacing it.',
	},
	{
		icon: 'support_agent',
		title: 'Long-term support',
		text: 'Maintenance, infrastructure and further experiments after the prototype.',
	},
];

export interface QuantumFaq {
	question: string;
	answer: string;
}

export const QUANTUM_FAQS: QuantumFaq[] = [
	{
		question: 'Do I need to understand quantum computing?',
		answer: 'No. Explain your business problem or software idea, and we will assess whether quantum computing is relevant.',
	},
	{
		question: 'Can quantum computing improve my existing software?',
		answer: 'Possibly, depending on the problem. We first find suitable tasks and test whether a quantum approach helps. Many applications are better served by conventional algorithms.',
	},
	{
		question: 'Do I need an IBM Quantum account?',
		answer: 'Not for simulation or classical development. Real IBM Quantum hardware needs IBM credentials, and we help you set them up.',
	},
	{
		question: 'Who pays for IBM Quantum hardware?',
		answer: "IBM bills hardware usage to the IBM account the job runs on. Web Art Work's assessment, development and support are scoped and billed separately.",
	},
	{
		question: 'Can you add quantum features to our CRM or application?',
		answer: 'Yes. We build API integrations and workflows for your existing application, or a new application around the feature.',
	},
	{
		question: 'Is our business data secure?',
		answer: 'Sensitive data is not sent to quantum providers. Experiments use an abstract mathematical model of the problem, and data handling is reviewed before we design the integration.',
	},
	{
		question: 'How long does a quantum project take?',
		answer: 'It depends on the problem and whether you need an assessment, a prototype or an integration. After the first call we send a scope and delivery plan.',
	},
	{
		question: 'What if quantum computing is not the right solution?',
		answer: 'We explain why and recommend an alternative. We can continue with classical optimization or conventional development.',
	},
];
