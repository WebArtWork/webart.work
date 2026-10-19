export const BLOCKCHAIN_META = {
	title: 'Cosmos SDK Blockchain Development',
	description:
		'Web Art Work builds Cosmos SDK chains for companies that need their own network, token and rules. We also run our own chains for UAG and wCoin.',
};

export const BLOCKCHAIN_PROJECT_IDS = ['uag', 'coin'];

export interface BlockchainReason {
	icon: string;
	title: string;
	text: string;
}

export const BLOCKCHAIN_REASONS: BlockchainReason[] = [
	{
		icon: 'tune',
		title: 'Rules written into the chain',
		text: "Your business logic runs as custom modules, not as contracts on someone else's network.",
	},
	{
		icon: 'toll',
		title: 'Your own token and fees',
		text: 'Fees are paid in your token, and you set the economics yourself.',
	},
	{
		icon: 'verified_user',
		title: 'You choose the validators',
		text: 'Decide who secures the network: you, your partners or the public.',
	},
	{
		icon: 'hub',
		title: 'Connected to other chains',
		text: 'IBC lets your chain move tokens and data to other Cosmos networks.',
	},
];

export interface BlockchainStep {
	title: string;
	text: string;
}

export const BLOCKCHAIN_STEPS: BlockchainStep[] = [
	{
		title: 'Chain design',
		text: 'Token, modules, governance and validators, agreed before any code.',
	},
	{
		title: 'Custom modules in Go',
		text: 'We write your business logic with Cosmos SDK and cover it with tests.',
	},
	{
		title: 'Public testnet',
		text: 'Validators and users try the chain before real value is at stake.',
	},
	{
		title: 'Wallets and explorer',
		text: 'Keplr support, a block explorer and an API for your apps.',
	},
	{
		title: 'Mainnet launch',
		text: 'Genesis file, first validators and a coordinated start.',
	},
	{
		title: 'Upgrades and support',
		text: 'We plan chain upgrades with your validators and keep the network healthy.',
	},
];

export interface BlockchainFaq {
	question: string;
	answer: string;
}

export const BLOCKCHAIN_FAQS: BlockchainFaq[] = [
	{
		question: 'Why Cosmos SDK?',
		answer: 'It is a proven framework for application-specific chains, with fast finality, on-chain governance and IBC for connecting to other networks.',
	},
	{
		question: 'How long does it take to launch a chain?',
		answer: 'It depends on the custom modules your chain needs. After the first call we give you a timeline for each stage.',
	},
	{
		question: 'Do we need to run our own validators?',
		answer: 'Not necessarily. You can start with validators run by you and your partners, and open the set to others later.',
	},
	{
		question: 'Can our chain work with other networks?',
		answer: 'Yes. Through IBC it exchanges tokens and data with other Cosmos chains, and bridges can connect it further.',
	},
];
