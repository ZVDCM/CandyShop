import { Injectable } from '@angular/core';
import { CandyResponse } from '../candy-types';
import { Mutation, gql } from 'apollo-angular';
import { MoneyInput } from '../../types';

export interface CreateCandyMutation {
	createCandy: CandyResponse;
}

export interface CreateCandyVariables {
	request: CreateCandyRequestInput;
	file: File;
}

export interface CreateCandyRequestInput {
	name: string;
	quantity: number;
	image: string;
	price: MoneyInput;
}

@Injectable({
	providedIn: 'root',
})
export class CreateCandyService extends Mutation<
	CreateCandyMutation,
	CreateCandyVariables
> {
	public override document = gql`
		mutation ($request: CreateCandyRequestInput!, $file: Upload!) {
			createCandy(request: $request, file: $file) {
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
