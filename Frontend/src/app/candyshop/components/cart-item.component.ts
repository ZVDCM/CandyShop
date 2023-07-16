import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import LineItem from '../classes/LineItems';
import Money from '../classes/Money';
import { ServerService } from '../constants/server.service';

@Component({
	selector: 'cart-item',
	template: `
		<div class="flex bg-white rounded-md overflow-hidden cursor-pointer">
			<figure
				class="relative flex grow gap-[1rem] items-center"
				[routerLink]="
					lineItem.CandyId !== null ? ['/shop', lineItem.CandyId] : null
				"
			>
				<img
					[src]="serverService.URI + 'images/' + lineItem.CandyImage"
					width="150"
					height="125"
					[alt]="'Image of ' + lineItem.CandyName"
					class="bg-red-400 object-cover"
				/>
				<figcaption class="text-black">
					<h1 class="font-bold text-[1.5rem] truncate max-w-[20ch]">
						{{ lineItem.CandyName }}
					</h1>
					<p class="font-bold">
						<span [ngStyle]="{ color: 'var(--purple-500)' }">{{
							lineItem.Price.Value | currency : lineItem.Price.Currency
						}}</span>
						•
						{{
							lineItem.CandyPrice.Value
								| currency : lineItem.CandyPrice.Currency
						}}
					</p>
					<p>
						<span [ngStyle]="{ color: 'var(--purple-500)' }">{{
							lineItem.Quantity | number
						}}</span>
						• {{ lineItem.CandyQuantity | number }} Available
					</p>
				</figcaption>
				<div
					*ngIf="lineItem.IsDisabled || lineItem.CandyId == null"
					class="flex justify-center items-center absolute inset-0 bg-black bg-opacity-75"
					[ngClass]="{ 'cursor-default': lineItem.CandyId === null }"
					[routerLink]="
						lineItem.CandyId !== null ? ['/shop', lineItem.CandyId] : null
					"
				>
					<h2>
						{{ lineItem.CandyId != null ? 'Out of Stock' : 'Not Available' }}
					</h2>
				</div>
			</figure>
			<button
				*ngIf="!final"
				pButton
				pRipple
				icon="pi pi-minus"
				class="rounded-none"
				aria-label="Remove candy from cart"
				(click)="Confirm($event)"
			></button>
		</div>
		<p-confirmDialog [style]="{ width: '400px' }"></p-confirmDialog>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ConfirmationService],
})
export class CartItemComponent {
	@Input()
	public lineItem: LineItem = LineItem.Empty();
	@Input()
	public final: boolean = false;

	@Output()
	public removeCandyFromCart: EventEmitter<string> = new EventEmitter<string>();
	@Output()
	public removeLineItemFromCart: EventEmitter<string> =
		new EventEmitter<string>();

	constructor(
		public serverService: ServerService,
		private _confirmationService: ConfirmationService
	) {}

	public Confirm(event: Event) {
		this._confirmationService.confirm({
			target: event.target as HTMLButtonElement,
			message: 'Are you sure that you want to remove this item?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				if (this.lineItem.CandyId !== null) {
					this.removeCandyFromCart.emit(this.lineItem.CandyId);
				} else {
					this.removeLineItemFromCart.emit(this.lineItem.Id);
				}
			},
		});
	}
}
