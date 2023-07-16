import { Injectable } from '@angular/core';
import { CartResponse } from '../cart-types';
import { Mutation, gql } from 'apollo-angular';

export interface CheckOutCartMutation {
	checkOutCart: CartResponse;
}

@Injectable({
	providedIn: 'root',
})
export class CheckOutCartService extends Mutation<CheckOutCartMutation> {
	public override document = gql`
		mutation {
			checkOutCart {
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
