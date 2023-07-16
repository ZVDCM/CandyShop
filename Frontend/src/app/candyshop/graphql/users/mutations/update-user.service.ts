import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';
import { UserResponse } from '../user-types';

export interface UpdateUserMutation {
	updateUser: UserResponse;
}
export interface UpdateUserVariables {
	request: UpdateUserRequestInput;
}

export interface UpdateUserRequestInput {
	name: string;
	email: string;
	address: string;
}

@Injectable({
	providedIn: 'root',
})
export class UpdateUserService extends Mutation<
	UpdateUserMutation,
	UpdateUserVariables
> {
	public override document = gql`
		mutation ($request: UpdateUserRequestInput!) {
			updateUser(request: $request) {
				id
                name
                email
                address
			}
		}
	`;
}
