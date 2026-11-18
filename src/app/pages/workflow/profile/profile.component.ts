import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	computed,
	effect,
	inject,
	signal,
} from '@angular/core';
import { injectFabricCropModalService } from '@wawjs/ngx-fabric';
import { CategoryChipsComponent } from '../../../components/category-chips.component';
import { TagsInputComponent } from '../../../components/tags-input.component';
import { DEV_DIRECTION_OPTIONS, DevDirection } from '../../../../data/workflow.const';
import { AuthService } from '../../../feature/auth/auth.service';
import { ProfilesService } from '../../../feature/workflow/profiles.service';
import { SeoService } from '../../../services/seo.service';

const AVATAR_SIZE = 256;
/** How long after the last change the profile is saved. */
const SAVE_DELAY = 2000;

@Component({
	imports: [CategoryChipsComponent, TagsInputComponent],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
	private readonly _authService = inject(AuthService);
	private readonly _profilesService = inject(ProfilesService);
	private readonly _cropper = injectFabricCropModalService();
	private _filled = false;
	private _timer?: ReturnType<typeof setTimeout>;

	protected readonly email = computed(() => this._authService.user()?.email ?? '');
	protected readonly loading = this._profilesService.loading;
	protected readonly fullName = signal('');
	protected readonly avatar = signal('');
	protected readonly phone = signal('');
	protected readonly linkedin = signal('');
	protected readonly upwork = signal('');
	protected readonly directions = signal<DevDirection[]>([]);
	protected readonly alternativeEmails = signal<string[]>([]);
	/** The account email is not an alternative one. */
	protected readonly mainEmail = computed(() => [this.email()]);
	protected readonly directionOptions = DEV_DIRECTION_OPTIONS;
	protected readonly busy = signal(false);
	protected readonly uploading = signal(false);
	protected readonly status = signal<'' | 'pending' | 'saving' | 'saved'>('');
	protected readonly statusText = computed(
		() =>
			({
				'': 'Changes are saved automatically.',
				pending: 'Saving in a moment...',
				saving: 'Saving...',
				saved: 'All changes saved.',
			})[this.status()],
	);
	protected readonly failed = signal('');

	constructor() {
		inject(SeoService).apply({
			title: 'Profile',
			description: 'Your Web Art Work profile.',
			path: '/workflow/profile',
			robots: 'noindex, nofollow',
		});

		this._profilesService.watch();
		inject(DestroyRef).onDestroy(() => {
			// Leaving the page does not lose a change that is still waiting.
			if (this._timer) {
				clearTimeout(this._timer);
				void this._save();
			}

			this._profilesService.unwatch();
		});

		effect(() => {
			const uid = this._authService.user()?.uid;
			const items = this._profilesService.items();

			if (this._filled || !uid || this._profilesService.loading()) {
				return;
			}

			this._filled = true;
			const profile = items.find((item) => item.id === uid);
			this.fullName.set(profile?.fullName ?? this._authService.user()?.displayName ?? '');
			this.avatar.set(profile?.avatar ?? '');
			this.phone.set(profile?.phone ?? '');
			this.linkedin.set(profile?.linkedin ?? '');
			this.upwork.set(profile?.upwork ?? '');
			this.directions.set(profile?.directions ?? []);
			this.alternativeEmails.set(profile?.alternativeEmails ?? []);
		});
	}

	protected valueOf(event: Event) {
		return (event.target as HTMLInputElement).value;
	}

	/** Opens the crop editor on the chosen photo: move, zoom, rotate; the frame is a square. */
	protected async chooseAvatar(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		input.value = '';

		if (!file || !file.type.startsWith('image/')) {
			return;
		}

		this.failed.set('');

		const cropper = await this._cropper();

		cropper.open({
			image: file,
			title: 'Crop your avatar',
			aspectRatio: 1,
			format: 'jpeg',
			quality: 0.85,
			maxEdge: AVATAR_SIZE,
			tools: { skew: false },
			onCrop: (result) => void this._upload(result.base64),
		});
	}

	/** Called after every change: the profile is saved once nothing has changed for a while. */
	protected queue() {
		this.failed.set('');
		this.status.set('pending');
		clearTimeout(this._timer);
		this._timer = setTimeout(() => void this._save(), SAVE_DELAY);
	}

	private async _save() {
		this._timer = undefined;

		if (this.busy()) {
			this.queue();

			return;
		}

		this.busy.set(true);
		this.status.set('saving');

		const saved = await this._profilesService.save({
			fullName: this.fullName().trim(),
			avatar: this.avatar(),
			phone: this.phone().trim(),
			linkedin: this.linkedin().trim(),
			upwork: this.upwork().trim(),
			directions: this.directions(),
			alternativeEmails: this.alternativeEmails(),
		});

		this.busy.set(false);

		// Changed again while saving: the newer save is already waiting.
		if (this._timer) {
			return;
		}

		if (saved) {
			this.status.set('saved');
		} else {
			this.status.set('');
			this.failed.set('Could not save. Please try again.');
		}
	}

	/** The editor lets the frame change shape; an avatar is always a centred square. */
	private async _square(dataUrl: string) {
		const image = new Image();

		image.src = dataUrl;
		await image.decode();

		if (image.naturalWidth === image.naturalHeight) {
			return dataUrl;
		}

		const side = Math.min(image.naturalWidth, image.naturalHeight);
		const canvas = document.createElement('canvas');

		canvas.width = side;
		canvas.height = side;
		canvas
			.getContext('2d')!
			.drawImage(
				image,
				(image.naturalWidth - side) / 2,
				(image.naturalHeight - side) / 2,
				side,
				side,
				0,
				0,
				side,
				side,
			);

		return canvas.toDataURL('image/jpeg', 0.85);
	}

	private async _upload(dataUrl: string) {
		this.uploading.set(true);

		try {
			this.avatar.set(await this._profilesService.uploadAvatar(await this._square(dataUrl)));
			this.queue();
		} catch {
			this.failed.set('Could not upload the avatar. Please try again.');
		} finally {
			this.uploading.set(false);
		}
	}
}
