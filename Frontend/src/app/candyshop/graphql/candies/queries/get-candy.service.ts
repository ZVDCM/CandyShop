import { Injectable } from '@angular/core';
import { CandyResponse } from '../candy-types';
import { Query, gql } from 'apollo-angular';

export interface GetCandyQuery {
	candy: CandyResponse;
}

export interface GetCandyVariables {
	id: string;
}

@Injectable({
	providedIn: 'root',
})
export class GetCandyService extends Query<GetCandyQuery, GetCandyVariables> {
	public override document = gql`
		query ($id: UUID!) {
			candy(id: $id) {
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
