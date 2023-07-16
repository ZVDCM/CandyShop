import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Candy from '../../classes/Candy';
import { CandyPayload, CandyService } from '../../data/candy.service';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../data/cart.service';
import Cart from '../../classes/Cart';

@Component({
	selector: 'candy-details-layout',
	template: `
		<ng-container *ngIf="candy$ | async as candy">
			<div class="flex justify-between items-center">
				<h1 class="font-bold text-xl">{{ candy.Name }}</h1>
				<div class="flex justify-between gap-[1rem]">
					<p-button
						icon="pi pi-pencil"
						styleClass="p-button-rounded p-button-text"
						aria-label="Edit candy"
						(click)="isCandyModalVisible = true"
					></p-button>
					<p-button
						icon="pi pi-trash"
						styleClass="p-button-rounded p-button-danger p-button-text"
						aria-label="Delete candy"
						(click)="Confirm(candy, $event)"
					></p-button>
				</div>
			</div>
			<table>
				<tbody>
					<tr>
						<td class="font-light align-top">Quantity</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ candy.Quantity }} Available
						</td>
					</tr>
					<tr>
						<td class="font-light align-top">Price</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ candy.Price.Value | currency : candy.Price.Currency }}
						</td>
					</tr>
				</tbody>
			</table>
			<div class="flex flex-col flex-nowrap gap-3">
				<button
					pButton
					label="ADD TO CART"
					aria-label="Add candy to cart"
					class="tracking-wide"
					(click)="isAddCandyModalVisible = true"
				></button>
				<button
					pButton
					label="GO BACK"
					class="p-button-outlined tracking-wide"
					aria-label="Go back to shop"
					type="button"
					routerLink="/shop"
				></button>
			</div>
			<candy-modal
				[visible]="isCandyModalVisible"
				(hideCandyModal)="isCandyModalVisible = false"
				[isAdd]="false"
				[candy]="candy"
				(getCandyPayload)="UpdateCandy($event)"
			/>
		</ng-container>
		<p-confirmDialog [style]="{ width: '400px' }"></p-confirmDialog>
		<ng-container *ngIf="candies$ | async"></ng-container>
		<ng-container *ngIf="cart$ | async"></ng-container>
		<add-candy-modal
			[visible]="isAddCandyModalVisible"
			(candyQuantityToCart)="AddCandyToCart($event)"
			(hideAddCandyModal)="isAddCandyModalVisible = $event"
		/>
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
	providers: [ConfirmationService],
})
export class CandyDetailsLayoutComponent implements OnInit {
	private _candyId: string = '';
	public isAddCandyModalVisible: boolean = false;
	public candy$ = new Observable<Candy>();
	public cart$ = new Observable<Cart>();

	public isCandyModalVisible: boolean = false;
	public candies$: Observable<Candy[]> = new Observable<Candy[]>();

	constructor(
		private _route: ActivatedRoute,
		private _candyService: CandyService,
		private _cartService: CartService,
		private _confirmationService: ConfirmationService
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params) => {
			this._candyId = params['id'];
			this.candy$ = this._candyService.GetCandyQuery(this._candyId);
		});
		this.candies$ = this._candyService.WatchCandies();
		this.cart$ = this._cartService.WatchCart();
	}

	public AddCandyToCart(quantity: number): void {
		this._cartService.AddCandyToCart({
			candyId: this._candyId,
			quantity,
		});
	}

	public UpdateCandy(payload: CandyPayload): void {
		this._candyService.UpdateCandy(payload);
	}

	public DeleteCandy(payload: CandyPayload): void {
		this._candyService.DeleteCandy(payload);
	}

	public Confirm(candy: Candy, event: Event): void {
		this._confirmationService.confirm({
			target: event.target as HTMLButtonElement,
			message: 'Are you sure that you want to delete this candy?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.DeleteCandy({ candy });
			},
		});
	}
}
