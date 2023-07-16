import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CandyPayload, CandyService } from '../../data/candy.service';
import Candy from '../../classes/Candy';
import { Observable } from 'rxjs';
import { CartService } from '../../data/cart.service';

@Component({
	selector: 'candies-layout',
	template: `
		<ng-container *ngIf="candies$ | async as candies; else candiesLoading">
			<div class="h-[20%] flex justify-between items-center">
				<h1 class="text-[1.5rem] font-semibold">Candies</h1>
				<p-button
					icon="pi pi-plus"
					styleClass="p-button-rounded p-button-text"
					class="float-right"
					aria-label="Add a new candy"
					(click)="ShowModal()"
				></p-button>
			</div>

			<div
				*ngIf="candies.length > 0; else candiesEmpty"
				class="h-[80%] flex flex-col flex-nowrap overflow-auto gap-[1rem] pr-[1rem]"
			>
				<candy-item
					*ngFor="let candy of candies"
					[id]="candy.Id"
					[candy]="candy"
					(addCandyToCart)="ShowAddCandyModal($event)"
				/>
			</div>
			<ng-template #candiesEmpty>
				<div class="h-[80%] flex justify-center items-center">
					<p class="text-[2rem] font-extrabold tracking-widest text-zinc-700">
						EMPTY
					</p>
				</div>
			</ng-template>
		</ng-container>
		<ng-template #candiesLoading>
			<div class="h-[20%] flex justify-between items-center">
				<h1 class="text-[1.5rem] font-semibold">Candies</h1>
			</div>
			<div
				class="h-[80%] flex flex-col flex-nowrap overflow-auto gap-[1rem] pr-[1rem]"
			>
				<p-skeleton height="125px" styleClass="w-full"></p-skeleton>
				<p-skeleton height="125px" styleClass="w-full"></p-skeleton>
			</div>
		</ng-template>
		<candy-modal
			[visible]="isCandyModalVisible"
			(getCandyPayload)="AddCandy($event)"
			(hideCandyModal)="isCandyModalVisible = $event"
		/>
		<add-candy-modal
			[visible]="isAddCandyModalVisible"
			(candyQuantityToCart)="AddCandyToCart($event)"
			(hideAddCandyModal)="isAddCandyModalVisible = $event"
		/>
	`,
	styles: [
		`
			:host {
				height: 50%;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandiesLayoutComponent implements OnInit {
	public targetCandy: Candy = Candy.Empty();
	public isCandyModalVisible: boolean = false;
	public isAddCandyModalVisible: boolean = false;

	public candies$: Observable<Candy[]> = new Observable<Candy[]>();

	constructor(
		private _candyService: CandyService,
		private _cartService: CartService
	) {}

	ngOnInit(): void {
		this.candies$ = this._candyService.WatchCandies();
	}

	public ShowModal(): void {
		this.isCandyModalVisible = true;
	}

	public ShowAddCandyModal(candy: Candy): void {
		this.targetCandy = candy;
		this.isAddCandyModalVisible = true;
	}

	public AddCandy(payload: CandyPayload): void {
		this._candyService.AddCandy(payload);
	}

	public AddCandyToCart(quantity: number): void {
		this._cartService.AddCandyToCart({
			candyId: this.targetCandy.Id as string,
			quantity,
		});
	}
}
