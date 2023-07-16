import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AddCandyFormService {
	public readonly Quantity = {
		Label: 'Quantity',
		ErrorMessage: "Quantity must be between 1 and candy's available quantity",
		Min: 1,
	};
}
