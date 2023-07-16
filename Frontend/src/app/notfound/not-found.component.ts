import { ChangeDetectionStrategy, Component, Host } from '@angular/core';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styles: [
		`
			:host {
				height: 100%;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				h3:hover {
					color: white;

					span {
						color: var(--primary-color);
					}
				}
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
