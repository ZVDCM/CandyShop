import { Injectable } from '@angular/core';
import { CandyResponse } from '../candy-types';
import { Subscription, gql } from 'apollo-angular';

export interface OnCandyDeletedSubscription {
	onCandyDeleted: CandyResponse;
}

@Injectable({
	providedIn: 'root',
})
export class OnCandyDeletedService extends Subscription<OnCandyDeletedSubscription> {
	public override document = gql`
		subscription {
			onCandyDeleted {
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
