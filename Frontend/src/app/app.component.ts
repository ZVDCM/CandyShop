import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: [
		`
			:host {
				height: 100%;
				width: 50%;
				padding-top: 2rem;
			}
		`,
	],
})
export class AppComponent {}
