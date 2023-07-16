import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import Candy from '../classes/Candy';
import { ServerService } from '../constants/server.service';

@Component({
	selector: 'candy-item',
	template: `
		<div class="flex rounded-md overflow-hidden cursor-pointer">
			<figure
				class="flex grow gap-[1rem] items-center bg-white hover:bg-slate-200"
				[routerLink]="['/shop', candy.Id]"
			>
				<img
					[src]="serverService.URI + 'images/' + candy.Image"
					width="150"
					height="125"
					[alt]="'Image of ' + candy.Name"
					class="bg-red-400 object-cover"
				/>
				<figcaption class="text-black">
					<h1 class="font-bold text-[1.5rem] truncate max-w-[20ch]">
						{{ candy.Name }}
					</h1>
					<p class="font-bold">
						{{ candy.Price.Value | currency : candy.Price.Currency }}
					</p>
					<p>{{ candy.Quantity | number }} Available</p>
				</figcaption>
			</figure>
			<button
				pButton
				pRipple
				icon="pi pi-cart-plus"
				class="rounded-none"
				aria-label="Add candy to cart"
				(click)="AddCandyToCart()"
			></button>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandyItemComponent {
	@Input()
	public candy: Candy = Candy.Empty();

	@Output()
	public addCandyToCart: EventEmitter<Candy> = new EventEmitter<Candy>();

	public isAddCandyModalVisible: boolean = false;

	constructor(public serverService: ServerService) {}

	public AddCandyToCart() {
		this.addCandyToCart.emit(this.candy);
	}
}
