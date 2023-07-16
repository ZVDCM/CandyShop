import { MoneyResponse } from '../types';

export interface CandyResponse {
	id: string;
	name: string;
	quantity: number;
	image: string;
	price: MoneyResponse;
}
