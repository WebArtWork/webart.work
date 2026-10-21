import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { appConfig } from './app/app.config';

// The App component removes the overlay itself once the theme, the initial
// navigation, the page's translations and the icon font are all ready. This is only a
// fallback for when bootstrapping fails outright and nothing ever renders.
bootstrapApplication(App, appConfig).catch((err) => {
	console.error(err);
	document.getElementById('app-preload')?.remove();
});
