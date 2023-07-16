import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
} from '@angular/core';
import { CartService } from '../../data/cart.service';
import { Observable } from 'rxjs';
import Cart from '../../classes/Cart';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'cart-layout',
	template: `
		<ng-container *ngIf="cart$ | async as cart; else cartLoading">
			<div class="h-[20%] flex justify-between items-center">
				<h1 class="text-[1.5rem] font-semibold">Cart</h1>
				<p-button
					icon="pi pi-credit-card"
					styleClass="p-button-rounded p-button-text"
					class="float-right"
					aria-label="Proceed to checkout"
					[routerLink]="cart.LineItems.length ? '/payment' : null"
				></p-button>
			</div>
			<div
				*ngIf="cart.LineItems.length > 0; else cartEmpty"
				class="h-[80%] flex flex-col flex-nowrap overflow-auto gap-[1rem] pr-[1rem]"
			>
				<cart-item
					(removeLineItemFromCart)="RemoveLineItemFromCart($event)"
					(removeCandyFromCart)="RemoveCandyFromCart($event)"
					*ngFor="let lineItem of cart.LineItems"
					[id]="lineItem.Id"
					[lineItem]="lineItem"
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
		<ng-template #cartLoading>
			<div class="h-[20%] flex justify-between items-center">
				<h1 class="text-[1.5rem] font-semibold">Cart</h1>
			</div>
			<div
				class="h-[80%] flex flex-col flex-nowrap overflow-auto gap-[1rem] pr-[1rem]"
			>
				<p-skeleton height="125px" styleClass="w-full"></p-skeleton>
				<p-skeleton height="125px" styleClass="w-full"></p-skeleton>
			</div>
		</ng-template>
		<p-toast></p-toast>
	`,
	styles: [
		`
			:host {
				height: 50%;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [MessageService],
})
export class CartLayoutComponent implements OnInit, AfterViewInit {
	public cart$: Observable<Cart> = new Observable<Cart>();

	constructor(
		private _cartService: CartService,
		private messageService: MessageService
	) {}

	ngOnInit(): void {
		this.cart$ = this._cartService.WatchCart();
	}

	ngAfterViewInit(): void {
		this.ShowToast();
		this._cartService.cartSuccess = [];
	}

	public RemoveCandyFromCart(candyId: string) {
		this._cartService.RemoveCandyFromCart({ candyId });
	}

	public RemoveLineItemFromCart(lineItemId: string) {
		this._cartService.RemoveLineItemFromCart({ lineItemId });
	}

	public ShowToast() {
		if (this._cartService.cartSuccess.length === 0) return;
		const messages = this._cartService.cartSuccess.map((payload) => ({
			severity: payload.isSuccess ? 'success' : 'error',
			summary: payload.isSuccess ? 'Success' : 'Error',
			detail: payload.message,
		}));
		this.messageService.addAll(messages);
	}
}
