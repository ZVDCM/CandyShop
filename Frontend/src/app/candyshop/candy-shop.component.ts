import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-candy-shop',
	templateUrl: './candy-shop.component.html',
	styles: [
		`
			:host {
				height: 100%;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandyShopComponent {}
