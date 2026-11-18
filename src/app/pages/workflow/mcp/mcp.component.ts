import { isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	PLATFORM_ID,
	computed,
	inject,
	signal,
} from '@angular/core';
import {
	MCP_GUIDES,
	MCP_PROMPTS,
	MCP_TEST_BASH,
	MCP_TEST_POWERSHELL,
	MCP_TOKEN_PLACEHOLDER,
	MCP_TOOLS,
	MCP_URL,
	MCP_URL_KEY,
} from '../../../../data/mcp.const';
import { AuthService } from '../../../feature/auth/auth.service';
import { ProfilesService } from '../../../feature/workflow/profiles.service';
import { SeoService } from '../../../services/seo.service';

const DAY = 24 * 60 * 60 * 1000;

@Component({
	templateUrl: './mcp.component.html',
	styleUrl: './mcp.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class McpComponent {
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _authService = inject(AuthService);
	private readonly _profilesService = inject(ProfilesService);

	protected readonly tools = MCP_TOOLS;
	protected readonly prompts = MCP_PROMPTS;
	protected readonly groups = ['Claude', 'OpenAI', 'Editors and CLIs'].map((group) => ({
		name: group,
		guides: MCP_GUIDES.filter((guide) => guide.group === group),
	}));

	/** The plain token exists only right after generating it; the API keeps just its hash. */
	protected readonly token = signal('');
	protected readonly generating = signal(false);
	protected readonly failed = signal('');
	protected readonly selectedId = signal(MCP_GUIDES[0].id);
	protected readonly copied = signal('');

	/** Taken from the profile, so the days left survive a reload. */
	protected readonly expiresAt = computed(() => {
		const uid = this._authService.user()?.uid;

		return this._profilesService.items().find((item) => item.id === uid)?.mcpTokenExpiresAt ?? 0;
	});
	protected readonly daysLeft = computed(() => {
		const left = this.expiresAt() - Date.now();

		return left > 0 ? Math.ceil(left / DAY) : 0;
	});
	protected readonly connectUrl = computed(
		() => `${MCP_URL}?token=${this.token() || MCP_TOKEN_PLACEHOLDER}`,
	);

	protected readonly guide = computed(
		() => MCP_GUIDES.find((item) => item.id === this.selectedId()) ?? MCP_GUIDES[0],
	);
	protected readonly steps = computed(() =>
		this.guide().steps.map((step) => ({
			...step,
			code: step.code ? this._fill(step.code) : '',
		})),
	);
	protected readonly testBash = computed(() => this._fill(MCP_TEST_BASH));
	protected readonly testPowershell = computed(() => this._fill(MCP_TEST_POWERSHELL));

	constructor() {
		inject(SeoService).apply({
			title: 'MCP',
			description: 'Connect AI agents to the Web Art Work workflow.',
			path: '/workflow/mcp',
			robots: 'noindex, nofollow',
		});

		this._profilesService.watch();
		inject(DestroyRef).onDestroy(() => this._profilesService.unwatch());
	}

	protected async generate() {
		this.generating.set(true);
		this.failed.set('');

		try {
			this.token.set((await this._profilesService.generateToken()).token);
		} catch {
			this.failed.set('Could not generate the token. Please try again.');
		} finally {
			this.generating.set(false);
		}
	}

	protected async copy(key: string, text: string) {
		if (!isPlatformBrowser(this._platformId)) {
			return;
		}

		try {
			await navigator.clipboard.writeText(text);
			this.copied.set(key);
			setTimeout(() => this.copied.update((current) => (current === key ? '' : current)), 2000);
		} catch {
			this.copied.set('');
		}
	}

	private _fill(code: string) {
		return code.replaceAll(MCP_URL_KEY, this.connectUrl());
	}
}
