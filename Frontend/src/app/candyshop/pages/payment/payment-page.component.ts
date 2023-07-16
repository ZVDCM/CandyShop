import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'payment-page',
	templateUrl: './payment-page.component.html',
	styles: [
		`
			:host {
				height: 100%;
				display: flex;
                gap: 1rem;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPageComponent {}
