import { Injectable } from '@angular/core';
import { CandyResponse } from '../candy-types';
import { MoneyInput } from '../../types';
import { Mutation, gql } from 'apollo-angular';

export interface UpdateCandyMutations {
	updateCandy: CandyResponse;
}

export interface UpdateCandyVariables {
	id: string;
	request: UpdateCandyRequestInput;
	file: File | undefined;
}

export interface UpdateCandyRequestInput {
	name: string;
	quantity: number;
	image: string;
	price: MoneyInput;
}

@Injectable({
	providedIn: 'root',
})
export class UpdateCandyService extends Mutation<
	UpdateCandyMutations,
	UpdateCandyVariables
> {
	public override document = gql`
		mutation ($id: UUID!, $request: UpdateCandyRequestInput!, $file: Upload = null) {
			updateCandy(id: $id, request: $request, file: $file) {
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
