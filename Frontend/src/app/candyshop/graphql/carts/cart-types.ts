import { MoneyResponse } from '../types';

export interface CartResponse {
	id: string;
	userId: string;
	userName: string;
	userEmail: string;
	userAddress: string;
	totalPrice: MoneyResponse;
	lineItems: LineItemResponse[];
}

export interface LineItemResponse {
	id: string;
	candyId: string;
	candyName: string;
	candyQuantity: number;
	candyImage: string;
	candyPrice: MoneyResponse;
	quantity: number;
	price: MoneyResponse;
	isDisabled: boolean;
}