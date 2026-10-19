export const QUANTUM_META = {
	title: 'Quantum Computing with IBM Quantum',
	description:
		'Web Art Work connects products to IBM Quantum. Our startups get quantum features built in, and we add them to client projects on request.',
};

export interface QuantumAudience {
	icon: string;
	title: string;
	text: string;
	points: string[];
}

export const QUANTUM_AUDIENCES: QuantumAudience[] = [
	{
		icon: 'rocket_launch',
		title: 'For our startups',
		text: 'Every startup we build can use quantum features from one shared module.',
		points: [
			'Simulation, optimization and real IBM hardware',
			'Each user works on their own IBM Quantum account',
		],
	},
	{
		icon: 'handshake',
		title: 'For our clients',
		text: 'If your project has a problem quantum may help with, we assess it and build it in.',
		points: [
			'A prototype on our simulator first',
			'Real IBM hardware only when it makes sense',
		],
	},
];

export interface QuantumUseCase {
	title: string;
	text: string;
}

export const QUANTUM_USE_CASES: QuantumUseCase[] = [
	{
		title: 'Assignment',
		text: 'Rooms to guests, staff to shifts, equipment to tasks.',
	},
	{
		title: 'Scheduling',
		text: 'Housekeeping, weekly training or timetables without conflicts.',
	},
	{
		title: 'Selection',
		text: 'The best mix of items, such as exercises with good variety.',
	},
	{
		title: 'Search demonstrations',
		text: 'How quantum search works, for example in chess training.',
	},
];

export interface QuantumStep {
	title: string;
	text: string;
}

export const QUANTUM_STEPS: QuantumStep[] = [
	{
		title: 'Your own IBM Quantum account',
		text: 'Each user connects their own account. Usage counts only on that account.',
	},
	{
		title: 'Built-in quantum simulator',
		text: 'Our simulator runs the same circuits and problems for free, without an IBM account.',
	},
	{
		title: 'Prepared for IBM processors',
		text: 'We convert each circuit into the instructions of the chosen IBM processor.',
	},
	{
		title: 'Tracked to the result',
		text: 'We follow each job at IBM and bring the result back into the product.',
	},
	{
		title: 'Compared with classical methods',
		text: 'You see the quantum and classical results side by side.',
	},
	{
		title: 'Real hardware on your approval',
		text: 'Every paid IBM job needs your confirmation.',
	},
];

export interface QuantumFaq {
	question: string;
	answer: string;
}

export const QUANTUM_FAQS: QuantumFaq[] = [
	{
		question: 'Do I need my own IBM Quantum account?',
		answer: 'Only for real quantum hardware. IBM offers a free Open plan with about 10 minutes of quantum processor time every 28 days. Simulations need no IBM account.',
	},
	{
		question: 'Who pays for quantum processor time?',
		answer: 'IBM bills it directly to the account the job runs on. We never run your jobs on our account, and paid jobs start only after you confirm them.',
	},
	{
		question: 'What data is sent to IBM?',
		answer: 'Only an anonymous mathematical model of the problem. Names, bookings and other business data stay on our servers.',
	},
];
