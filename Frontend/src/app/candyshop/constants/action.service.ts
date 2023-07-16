import { Injectable } from '@angular/core';
import { ActionType } from '../types';

@Injectable({
	providedIn: 'root',
})
export class ActionService {
	public readonly Add: ActionType = 'add';
	public readonly Update: ActionType = 'update';
	public readonly Delete: ActionType = 'delete';
}
