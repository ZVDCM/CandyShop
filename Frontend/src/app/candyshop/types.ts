export type ActionType = 'add' | 'update' | 'delete';

export interface Action<T> {
	type: ActionType;
	payload: T;
}

export interface SuccessPayload {
	isSuccess: boolean;
	message: string;
}