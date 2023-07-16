import { Injectable } from '@angular/core';
import { Subscription, gql } from 'apollo-angular';
import { CandyResponse } from '../../candies/candy-types';

export interface OnCheckOutCartSubscription {
	onCheckOutCart: CandyResponse[];
}

@Injectable({
	providedIn: 'root',
})
export class OnCheckOutCartService extends Subscription<OnCheckOutCartSubscription> {
	public override document = gql`
		subscription {
			onCheckOutCart {
				id
				name
				quantity
				image
				price {
					currency
					value
				}
			}
		}
	`;
}
