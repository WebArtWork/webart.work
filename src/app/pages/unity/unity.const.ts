export const UNITY_META = {
	title: 'Unity Game Development & VR/3D Solutions',
	description:
		'Unity game and 3D development by Web Art Work. Custom games, multiplayer, VR, AR, interactive visualization and business simulations from an experienced team.',
	image: 'https://webart.work/seo/unity.jpg',
};

export const UNITY_KEYWORDS = [
	'Unity development company',
	'Unity game development services',
	'Unity developers',
	'custom Unity game development',
	'Unity 3D development',
	'multiplayer game development',
	'VR application development',
	'Meta Quest development',
	'interactive 3D applications',
	'Unity architectural visualization',
	'augmented reality development',
	'3D product configurator',
];

export const ENGINE_URL = 'https://3d.itkamianets.com/';
export const ENGINE_DOCS_URL = 'https://3d.itkamianets.com/docs/';
export const ENGINE_EXAMPLES_URL = 'https://3d.itkamianets.com/docs/examples/';
export const ENGINE_PACKAGES_URL = 'https://3d.itkamianets.com/packages/';
export const ENGINE_GITHUB_URL = 'https://github.com/IT-Kamianets';

export const UNITY_HIGHLIGHTS = [
	'10+ years of software development',
	'Unity and C#',
	'Games, VR, AR and interactive 3D',
	'Reusable modular 3D architecture',
	'Full-stack development',
	'Prototype to release and maintenance',
];

export const UNITY_SCOPE = [
	'2D and 3D games',
	'Mobile and desktop games',
	'Multiplayer',
	'Virtual reality',
	'AR and mixed reality',
	'Product presentations',
	'Architectural visualization',
	'Virtual showrooms',
	'Educational games',
	'Training simulations',
	'Configurators',
	'Custom 3D tools',
];

export interface UnityCard {
	icon: string;
	title: string;
	text: string;
	points?: string[];
}

export const UNITY_BUILDS: UnityCard[] = [
	{
		icon: 'sports_esports',
		title: '2D and 3D games',
		text: 'Mechanics, controls, levels and interfaces, from casual games to complex 3D systems, or single systems for your existing game.',
		points: ['Characters, cameras and physics', 'Combat, inventory and progression', 'AI opponents and effects', 'Saves, settings and achievements'],
	},
	{
		icon: 'groups',
		title: 'Multiplayer games',
		text: 'Synchronized play, sessions and fair rules. The networking model follows your player count, latency needs and budget.',
		points: ['Co-op and competitive matches', 'Lobbies and matchmaking', 'Server-authoritative logic', 'Leaderboards and match history'],
	},
	{
		icon: 'view_in_ar',
		title: 'Virtual reality',
		text: 'Immersive apps for play, demos, learning and training, tuned to the headset and audience.',
		points: ['Movement and controller input', 'Hand interaction where supported', 'Object handling and physics', 'Comfort settings and spatial audio'],
	},
	{
		icon: 'deployed_code',
		title: 'AR and mixed reality',
		text: 'Virtual objects in real rooms. Supported interactions depend on the device and are set during planning.',
		points: ['Object placement and anchors', 'Surface and room detection', 'Furniture placement', 'Interactive instructions'],
	},
	{
		icon: 'architecture',
		title: 'Architecture and interiors',
		text: 'Walk through a space before it is built or changed, on screen or in VR.',
		points: ['Virtual walkthroughs', 'Materials, colors and lighting', 'Room and furniture layouts', 'VR property presentations'],
	},
	{
		icon: 'chair',
		title: 'Configurators and showrooms',
		text: 'Customers rotate, configure and send their choice, connected to your catalog, prices or CRM.',
		points: ['Furniture and kitchens', 'Consumer and industrial products', 'Vehicles and modular structures', 'Quote requests'],
	},
	{
		icon: 'school',
		title: 'Education and training',
		text: 'Learn by doing: practice tasks, explore concepts and get feedback. Accuracy and assessment are set with you.',
		points: ['Equipment and safety simulations', 'Virtual laboratories', 'Scenario-based learning', 'Progress tracking'],
	},
	{
		icon: 'view_quilt',
		title: 'Custom 3D applications',
		text: 'Not every 3D project is a game. We also check whether Unity is the right tool at all.',
		points: ['Real-time data visualization', 'Exhibitions and demos', 'Research prototypes', 'Specialized 3D editors'],
	},
];

export const UNITY_ENGINE_LAYERS = [
	{
		title: 'Base packages',
		code: '3d-*',
		text: 'Schemas and Unity packages: scenes, input, character, audio, multiplayer and more.',
	},
	{
		title: 'Constructors',
		code: '3d-constructor-*',
		text: 'A starting architecture for one type of game.',
	},
	{
		title: 'Your game',
		code: '<game>-*',
		text: 'Menus, HUD, rules and content stay outside the framework.',
	},
];

export const UNITY_ENGINE_STATS = [
	{ value: '3', label: 'JSON schemas' },
	{ value: '6', label: 'Core packages' },
	{ value: '5', label: 'Specialized packages' },
	{ value: '4', label: 'Constructor packages' },
];

export const UNITY_ENGINE_PARTS: UnityCard[] = [
	{ icon: 'settings', title: 'Core Unity systems', text: 'Configuration, events, input, character movement, scenes, assets and audio.' },
	{ icon: 'data_object', title: 'Scene and asset schemas', text: 'Scenes, assets and network sessions described as plain JSON.' },
	{ icon: 'pan_tool', title: 'Interaction and spatial', text: 'Scene editing with snapping and undo, and Meta Quest room scans turned into scenes.' },
	{ icon: 'view_in_ar', title: 'XR', text: 'A VR rig on the same character, comfort settings and a VR or flat mode switch.' },
	{ icon: 'lan', title: 'Networking and services', text: 'Real-time multiplayer on Unity Netcode, plus accounts and saves through Firebase.' },
	{ icon: 'videocam', title: 'Game constructors', text: 'Starting points per camera style, each with its own starter repository.' },
];

export interface UnityCamera {
	title: string;
	text: string;
	ready: boolean;
}

export const UNITY_CAMERAS: UnityCamera[] = [
	{ title: 'Character view', text: 'First and third person, plus VR controls.', ready: true },
	{ title: 'Top-down', text: 'Action and some strategy games.', ready: false },
	{ title: 'Isometric', text: 'Role-playing, tactics and simulation.', ready: false },
	{ title: 'Side view', text: 'Side-scrolling games.', ready: false },
	{ title: 'Fixed camera', text: 'Controlled, cinematic camera positions.', ready: false },
	{ title: 'Free camera', text: 'Strategy, building and world management.', ready: false },
];

export const UNITY_SCENE_USES = [
	'Reusable scene definitions',
	'Data-driven levels',
	'Custom editing tools',
	'Scene import and export',
	'Backend storage of scenes',
	'Other engines later',
];

export const UNITY_ENGINE_BENEFITS: UnityCard[] = [
	{ icon: 'recycling', title: 'Reusable engineering', text: 'Shared functionality lives in packages instead of being copied between products.' },
	{ icon: 'account_tree', title: 'Consistent architecture', text: 'Clear separation of core systems, game logic and interface.' },
	{ icon: 'center_focus_strong', title: 'Focused development', text: 'More effort on what makes your product different.' },
	{ icon: 'build', title: 'Easier maintenance', text: 'Fixes and improvements to shared parts reach every project that uses them.' },
];

export interface UnityProject {
	title: string;
	type: string;
	status: string;
	text: string;
	areas: string[];
	cta: string;
	url: string;
}

export const UNITY_PROJECTS: UnityProject[] = [
	{
		title: 'IT Kamianets 3D Engine',
		type: 'Reusable 3D framework',
		status: 'Active development',
		text: 'A modular ecosystem of Unity packages, shared JSON schemas and game constructors for a growing family of games and 3D apps.',
		areas: ['Shared Unity systems', 'Scene serialization', 'Character and input', 'XR and spatial', 'Multiplayer'],
		cta: 'Explore the framework',
		url: ENGINE_URL,
	},
	{
		title: 'Temnorid Arena',
		type: '3D multiplayer game',
		status: 'Development example, version 0.1',
		text: 'Mages fight with spells instead of weapons. Version 0.1 is a free-for-all match against bots on Windows, phones and Meta Quest 3. Rounds, teams and an economy come later.',
		areas: ['First and third person', 'Spell combat', 'AI opponents', 'Server-run matches', 'Touch and VR layouts'],
		cta: 'See the development example',
		url: ENGINE_EXAMPLES_URL,
	},
	{
		title: 'From room scan to scene',
		type: 'Spatial application',
		status: 'Framework example',
		text: 'A Meta Quest scans a real room, the engine turns it into a JSON scene, stores it and lets you rearrange furniture later.',
		areas: ['Room scanning', 'Scene reconstruction', 'Scene JSON', 'Furniture placement'],
		cta: 'See the spatial example',
		url: ENGINE_EXAMPLES_URL,
	},
];

export interface UnityService {
	title: string;
	text: string;
	receive: string;
}

export const UNITY_SERVICES: UnityService[] = [
	{
		title: 'Concept and technical planning',
		text: 'Mechanics, platforms, cameras, art needs, multiplayer, feasibility, roadmap and budget.',
		receive: 'A technical plan, agreed scope and estimate.',
	},
	{
		title: 'Prototype and MVP',
		text: 'Make the idea playable early: movement, combat, a multiplayer session, a VR activity or one 3D scene.',
		receive: 'A working prototype and recommendations.',
	},
	{
		title: 'Full Unity development',
		text: 'Gameplay, levels, characters, UI, animation, physics, backend, multiplayer, accounts and builds.',
		receive: 'A complete application built to the agreed requirements.',
	},
	{
		title: 'VR, AR and spatial apps',
		text: 'Spatial interactions, headset controls, virtual environments and device testing.',
		receive: 'An immersive app or prototype for the chosen hardware.',
	},
	{
		title: 'Existing Unity projects',
		text: 'Architecture review, features, bug fixes, refactoring, Unity upgrades and release preparation.',
		receive: 'A reviewed codebase and agreed next steps.',
	},
	{
		title: 'Optimization and maintenance',
		text: 'Profiling, rendering, memory, device compatibility, content updates and new features.',
		receive: 'Tested builds and documentation.',
	},
];

export const UNITY_INDUSTRIES: UnityCard[] = [
	{ icon: 'sports_esports', title: 'Games and entertainment', text: 'Mobile, desktop, multiplayer and VR games.' },
	{ icon: 'architecture', title: 'Architecture and interiors', text: 'Walkthroughs, layouts and material choices.' },
	{ icon: 'chair', title: 'Furniture and manufacturing', text: 'Configurable products and real dimensions.' },
	{ icon: 'school', title: 'Education', text: 'Lessons, simulations and learning games.' },
	{ icon: 'engineering', title: 'Industrial training', text: 'Equipment, procedures and safe practice.' },
	{ icon: 'apartment', title: 'Real estate and hospitality', text: 'Buildings and rooms in 3D or VR.' },
	{ icon: 'celebration', title: 'Events and exhibitions', text: 'Installations, games and branded spaces.' },
	{ icon: 'biotech', title: 'Research', text: 'Visualization and simulation concepts.' },
];

export const UNITY_PLATFORMS: UnityCard[] = [
	{ icon: 'desktop_windows', title: 'Windows and desktop', text: 'Games, visualization tools and simulators.' },
	{ icon: 'android', title: 'Android', text: 'Mobile games and 3D experiences.' },
	{ icon: 'phone_iphone', title: 'iOS', text: 'Games and apps that meet Apple requirements.' },
	{ icon: 'view_in_ar', title: 'Meta Quest', text: 'VR and mixed reality, optimized for the headset.' },
	{ icon: 'language', title: 'Web browsers', text: 'Selected experiences as browser builds, checked for performance.' },
	{ icon: 'devices', title: 'Several platforms', text: 'Shared systems with device-specific input and graphics.' },
];

export const UNITY_BACKEND: UnityCard[] = [
	{ icon: 'dns', title: 'Backend services', text: 'Accounts, sessions, progress, content and inventory.' },
	{ icon: 'database', title: 'Databases and storage', text: 'User data, preferences and saved scenes.' },
	{ icon: 'lan', title: 'Multiplayer infrastructure', text: 'Sessions, networking and authoritative servers.' },
	{ icon: 'web', title: 'Web and mobile companions', text: 'Sites, portals, dashboards and editors.' },
	{ icon: 'admin_panel_settings', title: 'Admin tools', text: 'Users, content, assets and configuration.' },
	{ icon: 'insights', title: 'Analytics', text: 'Gameplay, training and business metrics.' },
	{ icon: 'hub', title: 'Integrations', text: 'Payments, sign-in, APIs and business systems.' },
	{ icon: 'cloud', title: 'Cloud and deployment', text: 'Environments, builds and monitoring.' },
];

export const UNITY_TECH = [
	{ title: 'Real-time development', items: 'Unity, C#, Input System, XR, render pipelines, physics, animation' },
	{ title: '3D content', items: 'Blender, models, textures, materials, shaders, GLB/GLTF' },
	{ title: 'VR and spatial', items: 'Meta Quest, OpenXR, XR interaction, spatial SDKs, room scale' },
	{ title: 'Backend', items: 'Node.js, REST APIs, Firebase, Netcode, cloud services' },
	{ title: 'Workflow', items: 'Git, Unity packages, automated builds, profiling' },
];

export interface UnityStep {
	title: string;
	text: string;
}

export const UNITY_STEPS: UnityStep[] = [
	{ title: 'Discovery', text: 'Concept, audience, platforms, visuals and key interactions, or a review of your existing project.' },
	{ title: 'Planning and estimate', text: 'Scope, architecture, content, stages and risks, including where reusable packages help.' },
	{ title: 'Prototype and design', text: 'A playable level, movement, interface or VR interaction to validate the experience.' },
	{ title: 'Development and testing', text: 'Iterations with demos, tested for gameplay, frame rate, devices, multiplayer and VR comfort.' },
	{ title: 'Release', text: 'Builds, platform setup, backend deployment and store submission support.' },
	{ title: 'Support and growth', text: 'Updates, new content, compatibility work and infrastructure.' },
];

export const UNITY_REASONS: UnityCard[] = [
	{ icon: 'workspace_premium', title: 'Over 10 years of engineering', text: 'Proven software practices brought into real-time 3D.' },
	{ icon: 'deployed_code', title: 'Our own 3D framework', text: 'A structured, reusable base where it fits the project.' },
	{ icon: 'layers', title: 'Full-stack team', text: 'Backend, accounts, admin tools and cloud alongside Unity.' },
	{ icon: 'palette', title: 'Creative flexibility', text: 'Any visual style, camera or control scheme.' },
	{ icon: 'devices', title: 'Multi-platform thinking', text: 'Desktop, mobile and VR planned from the start.' },
	{ icon: 'support_agent', title: 'Long-term partner', text: 'Support and improvements after the first release.' },
];

export interface UnityFaq {
	question: string;
	answer: string;
}

export const UNITY_FAQS: UnityFaq[] = [
	{ question: 'Can you develop a Unity game from scratch?', answer: 'Yes: planning, prototype, gameplay, interfaces, environments, backend, testing and release support.' },
	{ question: 'Do you develop 2D and 3D games?', answer: 'Yes. The approach depends on the gameplay, visuals and target platforms.' },
	{ question: 'Can you build multiplayer games?', answer: 'Yes: sessions, synchronization, game servers and backend, with the architecture chosen for your game and scale.' },
	{ question: 'Do you build VR apps for Meta Quest?', answer: 'Yes. We check headset compatibility, supported interactions and performance for each project.' },
	{ question: 'Can you build AR or mixed reality apps?', answer: 'Yes. Available features depend on the hardware and SDK.' },
	{ question: 'What is IT Kamianets 3D Engine?', answer: 'Our modular ecosystem of Unity packages, JSON schemas and game constructors. It is in active development and serves as a base for compatible projects.' },
	{ question: 'Does the 3D Engine replace Unity?', answer: 'No. It is built on Unity. Its scene and asset formats are engine-independent, so other engines could be added later.' },
	{ question: 'Will you use the framework in my project?', answer: 'Only where its packages fit your requirements. Many projects also need custom Unity work or other approaches.' },
	{ question: 'Will my game share code with other projects?', answer: 'General functionality may come from shared packages; your mechanics, content and interface stay yours. Ownership, licensing and dependencies are set in the agreement.' },
	{ question: 'Can you work on an existing Unity project?', answer: 'Yes. We review the code, assets, dependencies and architecture first.' },
	{ question: 'Can you help with 3D models and assets?', answer: 'Yes: we prepare, adapt and integrate assets or coordinate their creation. Original modeling and animation are scoped separately.' },
	{ question: 'Can you build a 3D product configurator?', answer: 'Yes, including links to your catalog, pricing and inquiry workflow.' },
	{ question: 'Can you build architectural walkthroughs?', answer: 'Yes, from suitable models and plans, for desktop, mobile or VR.' },
	{ question: 'Can a room scan become an interactive 3D scene?', answer: 'Our framework already explores this with Meta Quest. Feasibility depends on the scan, hardware and accuracy needed, so we start with an assessment or prototype.' },
	{ question: 'Do you build browser-based Unity apps?', answer: 'Yes, when the features suit browser builds. VR in the browser needs extra validation.' },
	{ question: 'Can the app connect to our existing software?', answer: 'Yes: APIs, databases, sign-in, admin platforms and business software.' },
	{ question: 'How much does Unity development cost?', answer: 'It depends on gameplay, art, environments, platforms, multiplayer and integrations. A prototype is a very different investment from a full game. You get an estimate after we review your needs.' },
	{ question: 'How long does a Unity project take?', answer: 'It depends on complexity, assets and platforms. Larger projects are split into milestones, starting with a prototype or MVP.' },
	{ question: 'Can you help launch the app?', answer: 'Yes: builds, release setup and store submission. Platform approval is up to the platform operator.' },
	{ question: 'Can you take over an unfinished Unity project?', answer: 'Yes, after a technical review of what exists and the risks involved.' },
];

export const UNITY_RELATED = [
	{ label: 'Mobile apps', path: '/app' },
	{ label: 'Website development', path: '/website' },
	{ label: '360° virtual tours', path: '/virtual-tour' },
	{ label: 'Unity Development', path: '/service/unity-development' },
	{ label: 'Augmented / Virtual Reality Solutions', path: '/service/augmented-virtual-reality-solutions' },
	{ label: 'UI/UX Design', path: '/service/ui-ux-design' },
	{ label: 'Back-End Development', path: '/service/back-end-development' },
	{ label: 'Quality Assurance', path: '/service/quality-assurance' },
];
