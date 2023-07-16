import { Injectable } from '@angular/core';
import { CartResponse } from '../cart-types';
import { Mutation, gql } from 'apollo-angular';

export interface AddCandyToCartMutation {
	addCandyToCart: CartResponse;
}

export interface AddCandyToCartRequestInput {
	request: { candyId: string; quantity: number };
}

@Injectable({
	providedIn: 'root',
})
export class AddCandyToCartService extends Mutation<
	AddCandyToCartMutation,
	AddCandyToCartRequestInput
> {
	public override document = gql`
		mutation ($request: AddCandyToCartRequestInput!) {
			addCandyToCart(request: $request) {
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
