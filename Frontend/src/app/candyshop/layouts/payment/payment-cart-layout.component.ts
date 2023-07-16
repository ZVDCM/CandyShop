import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartService } from '../../data/cart.service';
import { Observable } from 'rxjs';
import Cart from '../../classes/Cart';

@Component({
	selector: 'payment-cart-layout',
	template: `
		<ng-container *ngIf="cart$ | async as cart">
			<div
				*ngIf="cart.LineItems.length > 0; else cartEmpty"
				class="h-[80%] flex flex-col flex-nowrap overflow-auto gap-[1rem] pr-[1rem]"
			>
				<cart-item
					*ngFor="let lineItem of cart.LineItems"
					[id]="lineItem.Id"
					[lineItem]="lineItem"
                    [final]="true"
				/>
			</div>
			<ng-template #cartEmpty>
				<div class="h-[80%] flex justify-center items-center">
					<p class="text-[2rem] font-extrabold tracking-widest text-zinc-700">
						EMPTY
					</p>
				</div>
			</ng-template>
		</ng-container>
	`,
	styles: [
		`
			:host {
				padding-right: 1rem;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCartLayoutComponent implements OnInit {
	public cart$: Observable<Cart> = new Observable<Cart>();

	constructor(private _cartService: CartService) {}

	ngOnInit(): void {
		this.cart$ = this._cartService.WatchCart();
	}
}
