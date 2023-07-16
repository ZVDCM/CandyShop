import { Injectable } from '@angular/core';
import { CartResponse } from '../cart-types';
import { Mutation, gql } from 'apollo-angular';

export interface RemoveCandyFromCartMutation {
	removeCandyFromCart: CartResponse;
}

export interface RemoveCandyToCartRequestInput {
	request: { candyId: string };
}

@Injectable({
	providedIn: 'root',
})
export class RemoveCandyFromCartService extends Mutation<
	RemoveCandyFromCartMutation,
	RemoveCandyToCartRequestInput
> {
	public override document = gql`
		mutation ($request: RemoveCandyToCartRequestInput!) {
			removeCandyFromCart(request: $request) {
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
