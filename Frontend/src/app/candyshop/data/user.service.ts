import { Injectable } from '@angular/core';
import User from '../classes/User';
import { Observable, catchError, map, of } from 'rxjs';
import { GetUserService } from '../graphql/users/queries/get-user.service';
import { UpdateUserService } from '../graphql/users/mutations/update-user.service';
import { MapToUser } from './mappings';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	public user$: Observable<User> = this._GetUser();

	constructor(
		private _getUserService: GetUserService,
		private _updateUserService: UpdateUserService
	) {}

	private _GetUser(): Observable<User> {
		return this._getUserService.watch().valueChanges.pipe(
			map((result) => {
				return MapToUser(result.data.user);
			})
		);
	}

	public EditUser(user: User): Observable<User> {
		return this._updateUserService
			.mutate({
				request: {
					name: user.Name,
					email: user.Email,
					address: user.Address,
				},
			})
			.pipe(
				map((result) => MapToUser(result.data?.updateUser!)),
				catchError((err) => {
					console.log(err);
					return of(User.Empty());
				})
			);
	}
}
