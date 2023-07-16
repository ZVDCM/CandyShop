import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'shop-page',
	templateUrl: './shop-page.component.html',
	styles: [
		`
			:host {
				height: 100%;
				display: flex;
				gap: 3rem;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopPageComponent {
}
