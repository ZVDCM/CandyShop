import { Injectable } from '@angular/core';
import { Subscription, gql } from 'apollo-angular';
import { UserResponse } from '../user-types';

export interface OnUserUpdatedSubscription {
	onUserUpdated: UserResponse;
}

@Injectable({
	providedIn: 'root',
})
export class OnUserUpdatedService extends Subscription<OnUserUpdatedSubscription> {
	public override document = gql`
		subscription {
			onUserUpdated {
				id
				name
				email
				address
			}
		}
	`;
}
