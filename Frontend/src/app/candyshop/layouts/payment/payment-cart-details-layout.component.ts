import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Cart from '../../classes/Cart';
import { CartService } from '../../data/cart.service';
import { SuccessPayload } from '../../types';
import { CandyService } from '../../data/candy.service';
import Candy from '../../classes/Candy';

@Component({
	selector: 'payment-cart-details-layout',
	template: `
		<ng-container *ngIf="cart$ | async as cart">
			<h1 class="font-bold text-xl">Checkout Cart</h1>
			<table>
				<tbody>
					<tr>
						<td class="font-light align-top">Name</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ cart.UserName }}
						</td>
					</tr>
					<tr>
						<td class="font-light align-top">Email</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ cart.UserEmail }}
						</td>
					</tr>
					<tr>
						<td class="font-light align-top">Address</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ cart.UserAddress }}
						</td>
					</tr>
					<tr>
						<td class="font-light align-top whitespace-nowrap">Total Price</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ cart.TotalPrice.Value | currency : cart.TotalPrice.Currency }}
						</td>
					</tr>
				</tbody>
			</table>
			<div class="flex flex-col flex-nowrap gap-3">
				<button
					pButton
					label="CHECKOUT"
					aria-label="Checkout your cart"
					class="tracking-wide"
					(click)="CheckOutCart()"
					[disabled]="cart.LineItems.length === 0"
				></button>
				<button
					pButton
					label="CANCEL"
					class="p-button-outlined p-button-danger tracking-wide"
					aria-label="Cancel editing the User"
					type="button"
					routerLink="/shop"
				></button>
			</div>
		</ng-container>
		<ng-container *ngIf="cartSuccess$ | async"></ng-container>
		<ng-container *ngIf="candies$ | async"></ng-container>
	`,
	styles: [
		`
			:host {
				display: flex;
				flex-flow: column nowrap;
				gap: 1rem;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCartDetailsLayoutComponent implements OnInit {
	public cart$: Observable<Cart> = new Observable<Cart>();
	public cartSuccess$: Observable<SuccessPayload> =
		new Observable<SuccessPayload>();
	public candies$: Observable<Candy[]> = new Observable<Candy[]>();

	constructor(
		private _cartService: CartService,
		private _candyService: CandyService
	) {}

	ngOnInit(): void {
		this.candies$ = this._candyService.WatchCandies();
		this.cart$ = this._cartService.WatchCart();
		this.cartSuccess$ = this._cartService.WatchSuccess();
	}

	public CheckOutCart(): void {
		this._cartService.CheckOutCart();
	}
}
