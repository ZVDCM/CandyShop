import { Injectable } from '@angular/core';
import { CandyResponse } from '../candy-types';
import { Query, gql } from 'apollo-angular';

export interface GetAllCandiesQuery {
	allCandies: CandyResponse[];
}

@Injectable({
	providedIn: 'root',
})
export class GetAllCandiesService extends Query<GetAllCandiesQuery> {
	public override document = gql`
		query {
			allCandies {
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
