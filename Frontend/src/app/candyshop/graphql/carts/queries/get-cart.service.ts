import { Injectable } from '@angular/core';
import { CartResponse } from '../cart-types';
import { Query, gql } from 'apollo-angular';

export interface GetCartQuery {
	cart: CartResponse;
}

@Injectable({
	providedIn: 'root',
})
export class GetCartService extends Query<GetCartQuery> {
	public override document = gql`
		query {
			cart {
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
