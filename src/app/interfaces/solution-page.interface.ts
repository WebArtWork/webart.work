export interface SolutionLink {
	label: string;
	href: string;
}

export interface SolutionCopy {
	title: string;
	subtitle: string;
	cta: string;
	secondary?: SolutionLink;
	examplesTitle: string;
	examplesText: string;
	cardsTitle: string;
	stepsTitle: string;
	stepsText: string;
	honestTitle: string;
	honestText: string;
	closingTitle: string;
	closingText: string;
}

export interface SolutionExample {
	name: string;
	image: string;
	description: string;
	/** Internal route, for example `/partner/demchuk-denys`. */
	path: string;
	link?: SolutionLink;
}

export interface SolutionCard {
	icon: string;
	title: string;
	text: string;
}

export interface SolutionStep {
	title: string;
	text: string;
}

export interface SolutionFaq {
	question: string;
	answer: string;
}
