export const BLOCKCHAIN_META = {
	title: 'Blockchain Development Services & Smart Contracts',
	description:
		'Custom blockchain development by Web Art Work. Smart contracts, dApps, wallet integration, tokenization, Cosmos SDK blockchains, Web3 applications and infrastructure.',
	image: 'https://webart.work/seo/blockchain.jpg',
};

export const BLOCKCHAIN_KEYWORDS = [
	'blockchain development services',
	'blockchain development company',
	'custom blockchain development',
	'Web3 development',
	'Cosmos SDK development',
	'smart contract development',
	'dApp development',
	'tokenization development',
	'wallet integration',
	'blockchain infrastructure',
	'cryptocurrency development',
];

export interface BlockchainBuild {
	icon: string;
	title: string;
	text: string;
	points: string[];
}

export const BLOCKCHAIN_BUILDS: BlockchainBuild[] = [
	{
		icon: 'description',
		title: 'Smart contracts',
		text: 'Business rules that run directly on the blockchain, designed, tested and connected to your application.',
		points: [
			'Fungible and non-fungible tokens',
			'Staking, rewards and vesting',
			'Marketplace transactions',
			'Membership and access control',
			'Governance and voting',
			'Custom settlement logic',
		],
	},
	{
		icon: 'apps',
		title: 'Decentralized applications',
		text: 'A complete product people can use, not just contracts: interface, accounts, feedback and speed.',
		points: [
			'Web and mobile interfaces',
			'Wallet connection and sign-in',
			'Backend services and APIs',
			'Transaction history and monitoring',
			'Notifications and dashboards',
			'Off-chain data and sync',
		],
	},
	{
		icon: 'toll',
		title: 'Tokenization and digital economies',
		text: 'Credits, rewards, access rights or ownership records, with supply rules, costs, fraud prevention and legal limits considered.',
		points: [
			'Currencies for apps and games',
			'Loyalty and reward systems',
			'Token-based access and subscriptions',
			'Digital marketplaces',
			'Ownership and transfer records',
			'Token management dashboards',
		],
	},
	{
		icon: 'deployed_code',
		title: 'Custom blockchains',
		text: 'Your own Cosmos SDK network when existing chains cannot meet your rules, fees or governance. We check first that it is justified.',
		points: [
			'Application-specific modules',
			'Native tokens and fees',
			'Validators and consensus',
			'Governance and staking',
			'Permission and access models',
			'Testnet and mainnet preparation',
		],
	},
	{
		icon: 'account_balance_wallet',
		title: 'Wallets and integrations',
		text: 'Blockchain features added to your website, CRM, ERP, app or marketplace without rebuilding it.',
		points: [
			'Wallet connection and sign-in',
			'Transaction creation and signing',
			'Balances and transfers',
			'On-chain monitoring and notifications',
			'Smart contract API integration',
			'Blockchain data indexing',
		],
	},
	{
		icon: 'dns',
		title: 'Blockchain infrastructure',
		text: 'The technology behind your network, sized for its workload and kept reliable as usage grows.',
		points: [
			'Nodes and validators',
			'RPC and API endpoints',
			'Monitoring and explorers',
			'Deployment automation',
			'Backups, recovery and upgrades',
			'Security hardening',
		],
	},
];

export interface BlockchainService {
	title: string;
	summary: string;
	deliverables: string[];
}

export const BLOCKCHAIN_SERVICES: BlockchainService[] = [
	{
		title: 'Consulting and architecture',
		summary: 'Decide what to build before investing. We check whether blockchain helps and compare networks and conventional options.',
		deliverables: [
			'Requirements analysis',
			'Blockchain suitability assessment',
			'Recommended architecture and networks',
			'Security and operational considerations',
			'Roadmap and cost estimate',
		],
	},
	{
		title: 'Proof of concept and MVP',
		summary: 'Validate the core business flow with a focused prototype before a larger rollout.',
		deliverables: [
			'Working prototype or MVP',
			'Core blockchain functionality',
			'Essential interface and integrations',
			'Tests and demonstrations',
			'Recommendations for next steps',
		],
	},
	{
		title: 'Full product development',
		summary: 'Blockchain logic, frontend, backend, integrations and infrastructure, delivered in milestones with regular demos.',
		deliverables: [
			'Custom software solution',
			'Smart contracts or chain components',
			'Interfaces and supporting APIs',
			'Testing and deployment preparation',
			'Documentation and handover',
		],
	},
	{
		title: 'Custom network launch',
		summary: 'An application-specific blockchain, from custom modules to a coordinated mainnet start.',
		deliverables: [
			'Protocol configuration and modules',
			'Testnet environment',
			'Node and validator setup',
			'Wallet, explorer and API integrations',
			'Mainnet preparation and documentation',
		],
	},
	{
		title: 'Maintenance and support',
		summary: 'Monitoring, security, upgrades and new features after launch.',
		deliverables: [
			'Application maintenance',
			'Node and validator monitoring',
			'Protocol and dependency upgrades',
			'Incident investigation',
			'Coordination with independent auditors',
		],
	},
];

export interface BlockchainUseCase {
	icon: string;
	title: string;
	text: string;
	example: string;
	note?: string;
}

export const BLOCKCHAIN_USE_CASES: BlockchainUseCase[] = [
	{
		icon: 'verified',
		title: 'Document verification',
		text: 'Store a document hash on the chain while the document stays in secure storage, so you can later prove it has not changed.',
		example: 'A business app records proof of an approved document for later checks.',
		note: 'This proves integrity, not that the content is true or legally valid.',
	},
	{
		icon: 'sports_esports',
		title: 'Games and marketplaces',
		text: 'Transferable assets, user-owned wallets and shared economies, built together with the games and accounts around them.',
		example: 'Several games share one currency for rewards, purchases and trades.',
	},
	{
		icon: 'loyalty',
		title: 'Loyalty and membership',
		text: 'Token-based rewards and memberships shared across connected products and your existing software.',
		example: 'Customers earn rewards they can spend in several connected products.',
	},
	{
		icon: 'handshake',
		title: 'Multi-company networks',
		text: 'A common record when independent organizations must share and verify transactions.',
		example: 'Partners exchange transaction updates under agreed validation rules.',
		note: 'We check whether this beats a conventional integration first.',
	},
	{
		icon: 'account_balance',
		title: 'Financial applications',
		text: 'Programmable workflows, digital asset management and settlement records.',
		example: 'Smart contracts execute agreed conditions and record settlement.',
		note: 'Security, custody and regulatory reviews depend on the project and jurisdiction.',
	},
];

export interface BlockchainProject {
	id: string;
	status: string;
	text: string;
	cta: string;
}

export const BLOCKCHAIN_PROJECTS: BlockchainProject[] = [
	{
		id: 'uag',
		status: 'Pilot, in development',
		text: 'A blockchain ecosystem connecting businesses, specialists, network operators and digital services in Ukraine. One pilot records document hashes from a CRM to verify document integrity.',
		cta: 'Explore UAG',
	},
	{
		id: 'coin',
		status: 'In development',
		text: 'A shared currency and wallet for WAW games and products: rewards, purchases, item trading and one balance across products.',
		cta: 'Explore wCoin',
	},
];

export interface BlockchainPoint {
	title: string;
	text: string;
}

export const BLOCKCHAIN_COSMOS_POINTS: BlockchainPoint[] = [
	{
		title: 'Custom modules',
		text: 'Your rules and transaction types inside the chain itself.',
	},
	{
		title: 'Network economics',
		text: 'Token, fees, staking and rewards set by your economic design.',
	},
	{
		title: 'Validator architecture',
		text: 'Who secures and operates the network, and how.',
	},
	{
		title: 'Governance',
		text: 'On-chain proposals, voting and network administration.',
	},
	{
		title: 'Interoperability',
		text: 'Connections to compatible networks through IBC and other bridges.',
	},
	{
		title: 'Infrastructure and apps',
		text: 'Nodes, APIs, explorers, wallets and software integrations.',
	},
];

export interface BlockchainOption {
	icon: string;
	title: string;
	text: string;
}

export const BLOCKCHAIN_OPTIONS: BlockchainOption[] = [
	{
		icon: 'public',
		title: 'Use an existing blockchain',
		text: 'Right for most tokens, marketplaces, smart contracts and Web3 apps. You get its ecosystem and work within its limits.',
	},
	{
		icon: 'deployed_code',
		title: 'Build a custom blockchain',
		text: 'When you need protocol logic, governance or permissions no network offers. More control, much more work to run.',
	},
	{
		icon: 'storage',
		title: 'Use conventional software',
		text: 'Without shared verification, on-chain assets or decentralized coordination, a backend and database is simpler and cheaper.',
	},
];

export const BLOCKCHAIN_STEPS: BlockchainPoint[] = [
	{
		title: 'Discovery',
		text: 'Your business model, users and goals, and whether blockchain is needed at all.',
	},
	{
		title: 'Planning and architecture',
		text: 'Scope, network, integrations, security, costs and milestones, with a plan and estimate.',
	},
	{
		title: 'Development',
		text: 'Contracts, modules, apps and infrastructure, built in iterations with regular demos.',
	},
	{
		title: 'Testing and security review',
		text: 'Transaction flows, permissions, edge cases and testnet validation. Independent audits when needed.',
	},
	{
		title: 'Deployment and launch',
		text: 'Contract deployment, app release, validator setup or a coordinated network start.',
	},
	{
		title: 'Maintenance and growth',
		text: 'Support, upgrades, monitoring and new features after launch.',
	},
];

export const BLOCKCHAIN_REASONS: BlockchainOption[] = [
	{
		icon: 'groups',
		title: 'More than blockchain developers',
		text: 'Frontend, backend, design, infrastructure and testing from one team.',
	},
	{
		icon: 'rocket_launch',
		title: 'We build our own products',
		text: 'UAG and wCoin give us hands-on work with tokens, integrations and custom networks.',
	},
	{
		icon: 'all_inclusive',
		title: 'The full lifecycle',
		text: 'From business analysis and prototype to deployment and support.',
	},
	{
		icon: 'alt_route',
		title: 'Flexible technology',
		text: 'Existing networks, EVM smart contracts or custom Cosmos SDK chains, chosen for the project.',
	},
	{
		icon: 'shield',
		title: 'Security and maintainability',
		text: 'Controlled access, clear logic and testing. Independent audits planned in when required.',
	},
	{
		icon: 'support_agent',
		title: 'Long-term collaboration',
		text: 'We keep developing features, integrations and infrastructure after launch.',
	},
];

export interface BlockchainFaq {
	question: string;
	answer: string;
}

export const BLOCKCHAIN_FAQS: BlockchainFaq[] = [
	{
		question: 'Does my company need blockchain technology?',
		answer: 'Not necessarily. It matters when you need shared verifiable records, digital assets, programmable transactions or decentralized coordination. We assess this before recommending it.',
	},
	{
		question: 'Can you build a complete blockchain application?',
		answer: 'Yes: smart contracts, interfaces, backend, APIs, wallet integrations and infrastructure. The exact scope depends on the project.',
	},
	{
		question: 'Can you create a custom cryptocurrency or token?',
		answer: 'We build the technical side: issuance, transfers, distribution and app integration. Token economics, legal classification and regulation need separate consideration.',
	},
	{
		question: 'Can you build our own blockchain?',
		answer: 'Yes, with Cosmos SDK. First we check whether your own network is justified or an existing blockchain fits better.',
	},
	{
		question: 'Which blockchain technologies do you support?',
		answer: 'Cosmos SDK and EVM smart contracts, plus the wallets, APIs and infrastructure around them. Specific networks and versions are chosen during planning.',
	},
	{
		question: 'Can you add blockchain to our existing application?',
		answer: 'Yes. We integrate wallets, tokens, transaction verification or smart contracts into websites, mobile apps, CRMs and marketplaces.',
	},
	{
		question: 'How secure are smart contracts?',
		answer: 'Contracts can contain vulnerabilities and transactions may be irreversible. We use testing, review and security controls, and projects holding significant value may need an independent audit.',
	},
	{
		question: 'Who owns the software you develop?',
		answer: 'Ownership, source code, infrastructure accounts and handover are set in the project agreement during planning.',
	},
	{
		question: 'How much does blockchain development cost?',
		answer: 'It depends on scope. A contract integration, a dApp and your own network are very different efforts. After discovery we send a scope, milestones and estimate.',
	},
	{
		question: 'How long does development take?',
		answer: 'It depends on features, integrations, security needs and deployment. A prototype is much smaller than a full platform or network launch. You get a timeline during planning.',
	},
	{
		question: 'Can you maintain our existing blockchain project?',
		answer: 'Yes. We start with a technical review of your contracts, apps and infrastructure, then agree the support scope.',
	},
	{
		question: 'Can blockchain replace our database?',
		answer: 'Usually not. Most blockchain apps still use a database for private data, search and reporting. We use each technology for what it does well.',
	},
];

export const BLOCKCHAIN_RELATED = [
	{ label: 'Blockchain Solutions', path: '/service/blockchain-solutions' },
	{ label: 'Smart Contract Development', path: '/service/smart-contract-development' },
	{ label: 'Mobile apps', path: '/app' },
	{ label: 'Unity games and 3D', path: '/unity' },
];
