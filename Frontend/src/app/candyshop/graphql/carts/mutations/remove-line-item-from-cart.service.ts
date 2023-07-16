import { Injectable } from '@angular/core';
import { CartResponse } from '../cart-types';
import { Mutation, gql } from 'apollo-angular';

export interface RemoveLineItemFromCartMutation {
	removeLineItemFromCart: CartResponse;
}

export interface RemoveLineItemFromCartRequestInput {
	request: { lineItemId: string };
}

@Injectable({
	providedIn: 'root',
})
export class RemoveLineItemFromCartService extends Mutation<
	RemoveLineItemFromCartMutation,
	RemoveLineItemFromCartRequestInput
> {
	public override document = gql`
		mutation ($request: RemoveLineItemFromCartRequestInput!) {
			removeLineItemFromCart(request: $request) {
				id
				userId
				userName
				userEmail
				userAddress
				totalPrice {
					currency
					value
				}
				lineItems {
					id
					candyId
					candyName
					candyQuantity
					candyImage
					candyPrice {
						currency
						value
					}
					quantity
					price {
						currency
						value
					}
					isDisabled
				}
			}
		}
	`;
}
