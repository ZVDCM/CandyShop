import { Injectable } from '@angular/core';
import { Subscription, gql } from 'apollo-angular';
import { CandyResponse } from '../candy-types';

export interface OnCandyUpdatedSubscription {
	onCandyUpdated: CandyResponse;
}

@Injectable({
	providedIn: 'root',
})
export class OnCandyUpdatedService extends Subscription<OnCandyUpdatedSubscription> {
	public override document = gql`
		subscription {
			onCandyUpdated {
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
