import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { appConfig } from './app/app.config';

function removePreloadOverlay() {
	document.getElementById('app-preload')?.remove();
}

bootstrapApplication(App, appConfig)
	.then(removePreloadOverlay)
	.catch((err) => {
		console.error(err);
		removePreloadOverlay();
	});
