import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-candy-page',
	templateUrl: './candy-page.component.html',
	styles: [
		`
			:host {
				height: 100%;
				display: flex;
				gap: 2rem;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandyPageComponent {}
