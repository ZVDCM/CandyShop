import { Injectable } from '@angular/core';
import Candy from '../classes/Candy';
import {
	BehaviorSubject,
	Observable,
	Subject,
	catchError,
	concatMap,
	map,
	of,
	startWith,
	switchMap,
	tap,
} from 'rxjs';
import { GetAllCandiesService } from '../graphql/candies/queries/get-all-candies.service';
import { GetCandyService } from '../graphql/candies/queries/get-candy.service';
import { CreateCandyService } from '../graphql/candies/mutations/create-candy.service';
import { ActionService } from '../constants/action.service';
import { UpdateCandyService } from '../graphql/candies/mutations/update-candy.service';
import { DeleteCandyService } from '../graphql/candies/mutations/delete-candy.service';
import { Action } from '../types';
import { Router } from '@angular/router';
import { ApolloError } from '@apollo/client/errors';
import { HttpErrorResponse } from '@angular/common/http';
import { MapToCandy } from './mappings';
import { OnCheckOutCartService } from '../graphql/carts/subscriptions/on-check-out-cart.service';

export interface CandyPayload {
	candy: Candy;
	file?: File;
}

@Injectable({
	providedIn: 'root',
})
export class CandyService {
	private _redirect: boolean = false;
	private _candies: Candy[] = [];
	private _candies$$: BehaviorSubject<Candy[]> = new BehaviorSubject<Candy[]>(
		[]
	);
	private _candy$$: Subject<Action<CandyPayload>> = new Subject<
		Action<CandyPayload>
	>();

	constructor(
		private _router: Router,
		private _actionService: ActionService,
		private _getAllCandiesService: GetAllCandiesService,
		private _getCandyService: GetCandyService,
		private _createCandyService: CreateCandyService,
		private _updateCandyService: UpdateCandyService,
		private _deleteCandyService: DeleteCandyService,
		private _onCartCheckoutService: OnCheckOutCartService
	) {}

	public WatchCandies(): Observable<Candy[]> {
		return this._candies$$.asObservable().pipe(
			switchMap((candies) =>
				candies.length
					? of(candies)
					: this._candies.length
					? of(this._candies)
					: this._GetAllCandiesQuery().pipe(
							tap((fetchedCandies) => (this._candies = fetchedCandies))
					  )
			),
			switchMap((candies) =>
				this._candy$$.pipe(
					concatMap((action) => this._HandleMutations(action)),
					map((action) => this._HandleList(action)),
					startWith(candies)
				)
			),
			switchMap((cart) =>
				this._onCartCheckoutService.subscribe().pipe(
					map((result) =>
						result.data?.onCheckOutCart.map((candy) => MapToCandy(candy))
					),
					map((candies) => {
						this._candies = candies!;
						return this._candies;
					}),
					startWith(cart)
				)
			),
			tap(() => {
				if (this._redirect) {
					this._redirect = false;
					this._router.navigate(['/shop']);
				}
			})
		);
	}

	public AddCandy({ candy, file }: CandyPayload): void {
		this._candy$$.next({
			type: this._actionService.Add,
			payload: { candy, file },
		});
	}
	public UpdateCandy({ candy, file }: CandyPayload): void {
		this._candy$$.next({
			type: this._actionService.Update,
			payload: { candy, file },
		});
	}
	public DeleteCandy({ candy }: CandyPayload): void {
		this._candy$$.next({
			type: this._actionService.Delete,
			payload: { candy },
		});
	}

	public GetCandyQuery(id: string): Observable<Candy> {
		return this._getCandyService.watch({ id }).valueChanges.pipe(
			map((result) => MapToCandy(result.data?.candy)),
			catchError((err) => {
				if (err instanceof ApolloError) {
					console.log((err.networkError as HttpErrorResponse).error);
				}
				return of(Candy.Empty());
			})
		);
	}

	private _GetAllCandiesQuery(): Observable<Candy[]> {
		return this._getAllCandiesService
			.watch()
			.valueChanges.pipe(
				map((result) =>
					result.data.allCandies.map((candy) => MapToCandy(candy))
				)
			);
	}

	private _AddCandyMutation({ candy, file }: CandyPayload): Observable<Candy> {
		return this._createCandyService
			.mutate(
				{
					request: {
						name: candy.Name,
						quantity: candy.Quantity,
						image: candy.Image,
						price: {
							currency: candy.Price.Currency,
							value: candy.Price.Value,
						},
					},
					file: file as File,
				},
				{
					context: {
						useMultipart: true,
						headers: {
							'graphql-preflight': 'OK',
						},
					},
				}
			)
			.pipe(
				map((result) => MapToCandy(result.data?.createCandy!)),
				catchError((err) => {
					if (err instanceof ApolloError) {
						console.log((err.networkError as HttpErrorResponse).error);
					}
					return of(Candy.Empty());
				})
			);
	}

	private _UpdateCandyMutation({
		candy,
		file,
	}: CandyPayload): Observable<Candy> {
		return this._updateCandyService
			.mutate(
				{
					id: candy.Id!,
					request: {
						name: candy.Name,
						quantity: candy.Quantity,
						image: candy.Image,
						price: {
							currency: candy.Price.Currency,
							value: candy.Price.Value,
						},
					},
					file,
				},
				{
					context: {
						useMultipart: true,
						headers: {
							'graphql-preflight': 'OK',
						},
					},
				}
			)
			.pipe(
				map((result) => MapToCandy(result.data?.updateCandy!)),
				catchError((err) => {
					if (err instanceof ApolloError) {
						console.log((err.networkError as HttpErrorResponse).error);
					}
					return of(Candy.Empty());
				})
			);
	}

	private _DeleteCandyMutation({ candy }: CandyPayload): Observable<Candy> {
		return this._deleteCandyService
			.mutate({
				id: candy.Id!,
			})
			.pipe(
				map((result) => MapToCandy(result.data?.deleteCandy!)),
				tap(() => (this._redirect = true)),
				catchError((err) => {
					if (err instanceof ApolloError) {
						console.log((err.networkError as HttpErrorResponse).error);
					}
					return of(Candy.Empty());
				})
			);
	}

	private _HandleMutations({
		type,
		payload,
	}: Action<CandyPayload>): Observable<Action<CandyPayload>> {
		switch (type) {
			case this._actionService.Add:
				return this._AddCandyMutation(payload).pipe(
					map((candy) => ({ type, payload: { ...payload, candy } }))
				);
			case this._actionService.Update:
				return this._UpdateCandyMutation(payload).pipe(
					map((candy) => ({
						type,
						payload: { ...payload, candy },
					}))
				);
			case this._actionService.Delete:
				return this._DeleteCandyMutation(payload).pipe(
					map((candy) => ({
						type,
						payload: { candy },
					}))
				);
			default:
				return of({ type, payload });
		}
	}

	private _HandleList({ type, payload }: Action<CandyPayload>): Candy[] {
		switch (type) {
			case this._actionService.Add:
				this._candies = [...this._candies, payload.candy];
				break;
			case this._actionService.Update:
				this._candies = this._candies.map((candy) =>
					candy.Id === payload.candy.Id ? payload.candy : candy
				);
				break;
			case this._actionService.Delete:
				this._candies = this._candies.filter(
					(candy) => candy.Id !== payload.candy.Id
				);
				break;
		}
		return this._candies;
	}
}
