import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';
import { UserResponse } from '../user-types';

export interface GetUserQuery {
	user: UserResponse;
}

@Injectable({
	providedIn: 'root',
})
export class GetUserService extends Query<GetUserQuery> {
	public override document = gql`
		query {
			user {
				id
				name
				email
				address
			}
		}
	`;
}
