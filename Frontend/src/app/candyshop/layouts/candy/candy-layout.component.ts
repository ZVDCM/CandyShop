import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { ServerService } from '../../constants/server.service';
import Candy from '../../classes/Candy';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CandyService } from '../../data/candy.service';

@Component({
	selector: 'candy-layout',
	template: `
		<figure *ngIf="candy$ | async as candy">
			<img
				[src]="serverService.URI + 'images/' + candy.Image"
				width="500"
				height="250"
				[alt]="'Image of ' + candy.Name"
				class="bg-red-400 object-cover"
			/>
		</figure>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandyLayoutComponent implements OnInit {
	public candy$ = new Observable<Candy>();

	constructor(
		private _route: ActivatedRoute,
		private _candyService: CandyService,
		public serverService: ServerService
	) {}

	ngOnInit(): void {
		this._route.params.subscribe((params) => {
			this.candy$ = this._candyService.GetCandyQuery(params['id']);
		});
	}
}
