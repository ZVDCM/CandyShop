import { Injectable } from '@angular/core';
import Cart from '../classes/Cart';
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
import { GetCartService } from '../graphql/carts/queries/get-cart.service';
import { AddCandyToCartService } from '../graphql/carts/mutations/add-candy-to-cart.service';
import { RemoveCandyFromCartService } from '../graphql/carts/mutations/remove-candy-from-cart.service';
import { Action, SuccessPayload } from '../types';
import { ActionService } from '../constants/action.service';
import { ApolloError } from '@apollo/client/errors';
import { HttpErrorResponse } from '@angular/common/http';
import { OnUserUpdatedService } from '../graphql/users/subscriptions/on-user-updated.service';
import { MapToCandy, MapToCart, MapToUser } from './mappings';
import { OnCandyUpdatedService } from '../graphql/candies/subscriptions/on-candy-updated.service';
import { OnCandyDeletedService } from '../graphql/candies/subscriptions/on-candy-deleted.service';
import { RemoveLineItemFromCartService } from '../graphql/carts/mutations/remove-line-item-from-cart.service';
import { CheckOutCartService } from '../graphql/carts/mutations/check-out-cart.service';
import { Router } from '@angular/router';

export interface CartPayload {
	candyId?: string;
	lineItemId?: string;
	quantity?: number;
	cart?: Cart;
}

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private _redirect: boolean = false;
	private _cart = Cart.Empty();
	private _cart$$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
		Cart.Empty()
	);
	private _cartAction$$: Subject<Action<CartPayload>> = new Subject<
		Action<CartPayload>
	>();
	private _cartCheckout$$: Subject<Cart> = new Subject<Cart>();
	public cartSuccess: SuccessPayload[] = [];
	private _cartSuccess$$: Subject<SuccessPayload> =
		new Subject<SuccessPayload>();

	constructor(
		private _router: Router,
		private _actionService: ActionService,
		private _getCartService: GetCartService,
		private _addCandyToCartService: AddCandyToCartService,
		private _removeCandyFromCartService: RemoveCandyFromCartService,
		private _removeLineItemFromCartService: RemoveLineItemFromCartService,
		private _onUserUpdatedService: OnUserUpdatedService,
		private _onCandyUpdatedService: OnCandyUpdatedService,
		private _onCandyDeletedService: OnCandyDeletedService,
		private _checkOutCartService: CheckOutCartService
	) {}

	public WatchCart(): Observable<Cart> {
		return this._cart$$.asObservable().pipe(
			switchMap((cart) => {
				return !cart.IsEqual(Cart.Empty())
					? of(cart)
					: !this._cart.IsEqual(Cart.Empty())
					? of(this._cart)
					: this._GetCartQuery().pipe(tap((cart) => (this._cart = cart)));
			}),
			switchMap((cart) =>
				this._cartAction$$.pipe(
					concatMap((action) => this._HandleMutations(action)),
					map((action) => {
						this._cart = action.payload.cart as Cart;
						return this._cart;
					}),
					startWith(cart)
				)
			),
			switchMap((cart) =>
				this._cartCheckout$$.pipe(
					concatMap(() => this._CheckOutCart()),
                    map(cart => {
                        this._cart = cart;
                        return this._cart;
                    }),
					startWith(cart)
				)
			),
			switchMap((cart) =>
				this._onUserUpdatedService.subscribe().pipe(
					map((result) => MapToUser(result.data?.onUserUpdated!)),
					map((user) => {
						this._cart.UserName = user.Name;
						this._cart.UserEmail = user.Email;
						this._cart.UserAddress = user.Address;

						return this._cart;
					}),
					startWith(cart)
				)
			),
			switchMap((cart) =>
				this._onCandyUpdatedService.subscribe().pipe(
					map((result) => MapToCandy(result.data?.onCandyUpdated!)),
					map((candy) => {
						this._cart.UpdateLineItem(candy);
						return this._cart;
					}),
					startWith(cart)
				)
			),
			switchMap((cart) =>
				this._onCandyDeletedService.subscribe().pipe(
					map((result) => MapToCandy(result.data?.onCandyDeleted!)),
					map((candy) => {
						this._cart.DisableLineItem(candy);
						return this._cart;
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

	public WatchSuccess(): Observable<SuccessPayload> {
		return this._cartSuccess$$
			.asObservable()
			.pipe(tap((payload) => this.cartSuccess.push(payload)));
	}

	private _GetCartQuery(): Observable<Cart> {
		return this._getCartService
			.watch()
			.valueChanges.pipe(map((result) => MapToCart(result.data.cart)));
	}

	public AddCandyToCart(payload: CartPayload): void {
		this._cartAction$$.next({
			type: this._actionService.Add,
			payload,
		});
	}

	public RemoveCandyFromCart(payload: CartPayload): void {
		this._cartAction$$.next({
			type: this._actionService.Delete,
			payload,
		});
	}

	public RemoveLineItemFromCart(payload: CartPayload): void {
		this._cartAction$$.next({
			type: this._actionService.Delete,
			payload,
		});
	}

	public CheckOutCart(): void {
		this._cartCheckout$$.next(this._cart);
	}

	private _AddCandyToCartMutation({
		candyId,
		quantity,
	}: CartPayload): Observable<Cart> {
		return this._addCandyToCartService
			.mutate({
				request: { candyId: candyId as string, quantity: quantity as number },
			})
			.pipe(
				map((result) => MapToCart(result.data?.addCandyToCart!)),
				catchError((err) => {
					if (err instanceof ApolloError) {
						console.log((err.networkError as HttpErrorResponse).error);
					}
					return of(this._cart);
				})
			);
	}

	private _RemoveCandyFromCartMutation({
		candyId,
	}: CartPayload): Observable<Cart> {
		return this._removeCandyFromCartService
			.mutate({ request: { candyId: candyId as string } })
			.pipe(
				map((result) => MapToCart(result.data?.removeCandyFromCart!)),
				catchError((err) => {
					if (err instanceof ApolloError) {
						console.log((err.networkError as HttpErrorResponse).error);
					}
					return of(this._cart);
				})
			);
	}

	private _RemoveLineItemFromCartMutation({
		lineItemId,
	}: CartPayload): Observable<Cart> {
		return this._removeLineItemFromCartService
			.mutate({ request: { lineItemId: lineItemId as string } })
			.pipe(
				map((result) => MapToCart(result.data?.removeLineItemFromCart!)),
				catchError((err) => {
					if (err instanceof ApolloError) {
						console.log((err.networkError as HttpErrorResponse).error);
					}
					return of(this._cart);
				})
			);
	}

	private _CheckOutCart(): Observable<Cart> {
		return this._checkOutCartService.mutate().pipe(
			map((result) => {
				this._cartSuccess$$.next({
					isSuccess: true,
					message: 'An email has been sent to your inbox.',
				});
				return MapToCart(result.data?.checkOutCart!);
			}),
			catchError((err) => {
				if (err instanceof ApolloError) {
					console.log((err.networkError as HttpErrorResponse).error);
					this._cartSuccess$$.next({
						isSuccess: false,
						message: 'Email not sent. Invalid or non-existent email address.',
					});
				}
				return of(this._cart);
			}),
			tap(() => {
				this._redirect = true;
			})
		);
	}

	private _HandleMutations({
		type,
		payload,
	}: Action<CartPayload>): Observable<Action<CartPayload>> {
		switch (type) {
			case this._actionService.Add:
				return this._AddCandyToCartMutation(payload).pipe(
					map((cart) => ({ type, payload: { ...payload, cart } }))
				);
			case this._actionService.Delete:
				return payload.candyId
					? this._RemoveCandyFromCartMutation(payload).pipe(
							map((cart) => ({ type, payload: { ...payload, cart } }))
					  )
					: this._RemoveLineItemFromCartMutation(payload).pipe(
							map((cart) => ({ type, payload: { ...payload, cart } }))
					  );
			default:
				return of({ type, payload });
		}
	}
}
