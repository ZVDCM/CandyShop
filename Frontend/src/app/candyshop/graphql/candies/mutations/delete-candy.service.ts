import { Injectable } from '@angular/core';
import { CandyResponse } from '../candy-types';
import { Mutation, gql } from 'apollo-angular';

export interface DeleteCandyMutations {
	deleteCandy: CandyResponse;
}

export interface DeleteCandyVariables {
	id: string;
}

@Injectable({
	providedIn: 'root',
})
export class DeleteCandyService extends Mutation<
	DeleteCandyMutations,
	DeleteCandyVariables
> {
	public override document = gql`
		mutation ($id: UUID!) {
			deleteCandy(id: $id) {
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
