/** The MCP endpoint without a token. */
export const MCP_URL = 'https://it.webart.work/api/webartwork/mcp';

/** Replaced by the endpoint with the user's token in it, the one thing every agent needs. */
export const MCP_URL_KEY = '{{url}}';
export const MCP_TOKEN_PLACEHOLDER = 'YOUR_TOKEN';

export interface McpStep {
	text: string;
	/** Optional snippet; may contain the url key. */
	code?: string;
	/** Where the snippet is saved, shown above it. */
	file?: string;
}

export interface McpGuide {
	id: string;
	name: string;
	icon: string;
	group: 'Claude' | 'OpenAI' | 'Editors and CLIs';
	summary: string;
	steps: McpStep[];
	/** Checked against the vendor's documentation; the rest follow the client's usual config format. */
	verified: boolean;
	docs?: string;
}

export const MCP_GUIDES: McpGuide[] = [
	{
		id: 'claude-code',
		name: 'Claude Code',
		icon: 'terminal',
		group: 'Claude',
		summary: 'Terminal and desktop-app sessions. One command, and it works in every project.',
		verified: true,
		docs: 'https://code.claude.com/docs/en/mcp',
		steps: [
			{
				text: 'Add the server for your user, so every project can use it. Drop --scope user to keep it to the current project.',
				code: 'claude mcp add --transport http --scope user webart-work "{{url}}"',
			},
			{
				text: 'Check that it is connected. Inside a session, /mcp shows the same list.',
				code: 'claude mcp list',
			},
		],
	},
	{
		id: 'claude-app',
		name: 'Claude app, web and phone',
		icon: 'desktop_windows',
		group: 'Claude',
		summary: 'Claude Desktop, claude.ai and the mobile apps share the same connectors.',
		verified: true,
		steps: [
			{
				text: 'Open Settings, Connectors, Add custom connector. Name it Web Art Work and paste the URL. Leave any OAuth fields empty.',
				code: '{{url}}',
			},
			{
				text: 'Enable the connector in a chat from the search and tools menu. Once added on one device it shows up on the others signed in to the same account.',
			},
			{
				text: 'If your plan has no custom connectors, Claude Desktop can use a local bridge instead (needs Node.js). Open Settings, Developer, Edit Config and add:',
				file: 'claude_desktop_config.json',
				code: '{\n  "mcpServers": {\n    "webart-work": {\n      "command": "npx",\n      "args": ["-y", "mcp-remote", "{{url}}"]\n    }\n  }\n}',
			},
		],
	},
	{
		id: 'codex',
		name: 'ChatGPT desktop (Codex)',
		icon: 'chat',
		group: 'OpenAI',
		summary: 'The Codex app for Windows and the Codex CLI share one config file, so you set it up once.',
		verified: true,
		steps: [
			{
				text: 'Add the server with one command:',
				code: 'codex mcp add webart-work --url "{{url}}"',
			},
			{
				text: 'or edit the config file by hand (C:\\Users\\<you>\\.codex\\config.toml):',
				file: 'config.toml',
				code: '[mcp_servers.webart-work]\nurl = "{{url}}"',
			},
			{
				text: 'Restart the app. Check it with codex mcp list, or /mcp inside a Codex session.',
			},
		],
	},
	{
		id: 'chatgpt-web',
		name: 'ChatGPT web',
		icon: 'public',
		group: 'OpenAI',
		summary: 'chatgpt.com, through developer mode. Plan and region limits apply.',
		verified: false,
		steps: [
			{
				text: 'Open Settings, Connectors, Advanced, and turn on Developer mode. Then create a connector, name it Web Art Work, paste the URL and set authentication to none.',
				code: '{{url}}',
			},
			{
				text: 'Start a chat, add the connector from the plus menu, and ask for something from the Try it list.',
			},
		],
	},
	{
		id: 'cursor',
		name: 'Cursor',
		icon: 'ads_click',
		group: 'Editors and CLIs',
		summary: 'Global config for all projects, or a project file.',
		verified: false,
		steps: [
			{
				text: 'Save this as %USERPROFILE%\\.cursor\\mcp.json (all projects). A project file would put the token in the repo, so avoid it.',
				file: 'mcp.json',
				code: '{\n  "mcpServers": {\n    "webart-work": {\n      "url": "{{url}}"\n    }\n  }\n}',
			},
			{
				text: 'Open Settings, Tools and MCP, and switch webart-work on. A green dot means it is connected.',
			},
		],
	},
	{
		id: 'vscode',
		name: 'VS Code (Copilot)',
		icon: 'code',
		group: 'Editors and CLIs',
		summary: 'Copilot Chat in agent mode, VS Code 1.99 or newer.',
		verified: true,
		docs: 'https://code.visualstudio.com/docs/copilot/reference/mcp-configuration',
		steps: [
			{
				text: 'Run MCP: Open User Configuration, so the token stays out of your projects, and add the server.',
				file: 'mcp.json',
				code: '{\n  "servers": {\n    "webart-work": {\n      "type": "http",\n      "url": "{{url}}"\n    }\n  }\n}',
			},
			{
				text: 'Click Start above the server in the file. Then open Copilot Chat, switch to Agent mode and check the tools button.',
			},
		],
	},
	{
		id: 'windsurf',
		name: 'Windsurf',
		icon: 'air',
		group: 'Editors and CLIs',
		summary: 'Cascade reads one global config file.',
		verified: false,
		steps: [
			{
				text: 'Add the server to %USERPROFILE%\\.codeium\\windsurf\\mcp_config.json (Cascade, MCP servers, Configure opens it).',
				file: 'mcp_config.json',
				code: '{\n  "mcpServers": {\n    "webart-work": {\n      "serverUrl": "{{url}}"\n    }\n  }\n}',
			},
			{ text: 'Press Refresh in the MCP panel.' },
		],
	},
	{
		id: 'gemini',
		name: 'Gemini CLI',
		icon: 'auto_awesome',
		group: 'Editors and CLIs',
		summary: 'Google\u2019s terminal agent.',
		verified: true,
		steps: [
			{
				text: 'Either one command:',
				code: 'gemini mcp add --transport http --scope user webart-work "{{url}}"',
			},
			{
				text: 'or edit ~/.gemini/settings.json. httpUrl selects the streamable HTTP transport; the plain url key means the older SSE transport.',
				file: 'settings.json',
				code: '{\n  "mcpServers": {\n    "webart-work": {\n      "httpUrl": "{{url}}"\n    }\n  }\n}',
			},
			{ text: 'Run /mcp inside Gemini CLI to see the server and its tools.' },
		],
	},
	{
		id: 'cline',
		name: 'Cline',
		icon: 'smart_toy',
		group: 'Editors and CLIs',
		summary: 'VS Code extension. Servers live in its own settings file.',
		verified: false,
		steps: [
			{
				text: 'Open Cline, MCP Servers, Configure MCP Servers, and add the server to cline_mcp_settings.json.',
				file: 'cline_mcp_settings.json',
				code: '{\n  "mcpServers": {\n    "webart-work": {\n      "url": "{{url}}",\n      "type": "streamableHttp"\n    }\n  }\n}',
			},
		],
	},
	{
		id: 'roo',
		name: 'Roo Code',
		icon: 'pets',
		group: 'Editors and CLIs',
		summary: 'VS Code extension.',
		verified: false,
		steps: [
			{
				text: 'Use Edit Global MCP in the MCP panel, so the token stays out of your projects.',
				file: 'mcp_settings.json',
				code: '{\n  "mcpServers": {\n    "webart-work": {\n      "type": "streamable-http",\n      "url": "{{url}}"\n    }\n  }\n}',
			},
		],
	},
	{
		id: 'zed',
		name: 'Zed',
		icon: 'bolt',
		group: 'Editors and CLIs',
		summary: 'Remote servers are context servers in the settings file.',
		verified: false,
		steps: [
			{
				text: 'Open the settings file (Ctrl+comma, Open Settings File) and add the server.',
				file: 'settings.json',
				code: '{\n  "context_servers": {\n    "webart-work": {\n      "url": "{{url}}"\n    }\n  }\n}',
			},
			{ text: 'Enable it in the Agent panel settings; a green dot shows it is running.' },
		],
	},
	{
		id: 'continue',
		name: 'Continue',
		icon: 'play_circle',
		group: 'Editors and CLIs',
		summary: 'VS Code and JetBrains extension. MCP tools work in agent mode.',
		verified: false,
		steps: [
			{
				text: 'Create this file in your user config folder (~/.continue/mcpServers).',
				file: 'webart-work.yaml',
				code: 'name: Web Art Work\nversion: 0.0.1\nschema: v1\nmcpServers:\n  - name: webart-work\n    type: streamable-http\n    url: {{url}}',
			},
		],
	},
	{
		id: 'jetbrains',
		name: 'JetBrains AI Assistant',
		icon: 'integration_instructions',
		group: 'Editors and CLIs',
		summary: 'IntelliJ IDEA, WebStorm, PyCharm and the other JetBrains IDEs.',
		verified: false,
		steps: [
			{
				text: 'Open Settings, Tools, AI Assistant, Model Context Protocol (MCP), click Add and choose the JSON option.',
			},
			{
				text: 'Paste:',
				code: '{\n  "mcpServers": {\n    "webart-work": {\n      "url": "{{url}}"\n    }\n  }\n}',
			},
		],
	},
	{
		id: 'opencode',
		name: 'opencode',
		icon: 'dns',
		group: 'Editors and CLIs',
		summary: 'Open-source terminal agent.',
		verified: false,
		steps: [
			{
				text: 'Add the server to the global opencode config.',
				file: 'opencode.json',
				code: '{\n  "$schema": "https://opencode.ai/config.json",\n  "mcp": {\n    "webart-work": {\n      "type": "remote",\n      "url": "{{url}}",\n      "enabled": true\n    }\n  }\n}',
			},
		],
	},
];

export const MCP_TOOLS: { name: string; area: string; description: string }[] = [
	{ name: 'list_packages', area: 'Packages', description: 'List packages, optionally one category.' },
	{ name: 'create_package', area: 'Packages', description: 'Name, Github repo, optional npm link, description and category (ai, blockchain, angular, unity, waw).' },
	{ name: 'update_package', area: 'Packages', description: 'Change any field of a package.' },
	{ name: 'delete_package', area: 'Packages', description: 'Delete a package.' },
	{ name: 'list_projects', area: 'Projects', description: 'List the team\u2019s projects.' },
	{ name: 'create_project', area: 'Projects', description: 'Name, description, directions and links.' },
	{ name: 'update_project', area: 'Projects', description: 'Change any field of a project.' },
	{ name: 'delete_project', area: 'Projects', description: 'Delete a project.' },
	{ name: 'list_developers', area: 'Roadmaps', description: 'The developers and their ids, without email or phone number.' },
	{ name: 'list_roadmaps', area: 'Roadmaps', description: 'Roadmaps with visitor vote scores and comment counts.' },
	{ name: 'list_comments', area: 'Roadmaps', description: 'What visitors commented under a roadmap or plan.' },
	{ name: 'create_roadmap', area: 'Roadmaps', description: 'A bigger piece of work linking projects, tasks, packages and developers.' },
	{ name: 'update_roadmap', area: 'Roadmaps', description: 'Change a roadmap, its links or its status.' },
	{ name: 'delete_roadmap', area: 'Roadmaps', description: 'Delete a roadmap.' },
	{ name: 'list_plans', area: 'Plans', description: 'The weekly development plans.' },
	{ name: 'create_plan', area: 'Plans', description: 'Publish the plan for a week, split into packages and roadmaps.' },
	{ name: 'update_plan', area: 'Plans', description: 'Change a plan.' },
	{ name: 'delete_plan', area: 'Plans', description: 'Delete a plan.' },
	{ name: 'list_requests', area: 'Requests', description: 'What visitors asked for: packages, roadmaps, improvements and bugs.' },
	{ name: 'set_request_status', area: 'Requests', description: 'Mark a request handled, or new again.' },
	{ name: 'delete_request', area: 'Requests', description: 'Delete a request.' },
	{ name: 'list_tasks', area: 'Tasks', description: 'Your tasks, filtered by status or project.' },
	{ name: 'create_task', area: 'Tasks', description: 'A new task for you, optionally in a project.' },
	{ name: 'update_task', area: 'Tasks', description: 'Change a task\u2019s title, project or directions.' },
	{ name: 'set_task_status', area: 'Tasks', description: 'New, in progress or completed. Records the week for the timeline.' },
	{ name: 'delete_task', area: 'Tasks', description: 'Delete one of your tasks.' },
];

export const MCP_PROMPTS = [
	'List my tasks that are in progress.',
	'Create a task "Review the pricing page" in the Web Art Work project and start it.',
	'Add a waw package called waw-mcp, repo https://github.com/WebArtWork/waw-mcp, described as an MCP module for the waw framework.',
	'Create a roadmap called Ten client websites in the Angular category, link the projects and developers, and add it to next week’s plan.',
	'Prepare next week’s plan from the most voted roadmaps and the open requests, split into packages and roadmaps, and publish it.',
	'Mark the task "Review the pricing page" as completed.',
];

export const MCP_TEST_BASH =
	'curl -s -X POST "{{url}}" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"jsonrpc":"2.0","id":1,"method":"tools/list"}\'';

export const MCP_TEST_POWERSHELL =
	'Invoke-RestMethod -Method Post -Uri "{{url}}" `\n  -ContentType "application/json" `\n  -Body \'{"jsonrpc":"2.0","id":1,"method":"tools/list"}\'';
