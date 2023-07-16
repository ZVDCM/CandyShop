import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CandyFormService {
	public readonly Name = {
		Label: 'Name',
		ErrorMessage: 'Name must not be empty or greater than 50 characters',
		MaxLength: 50,
	};
	public readonly Price = {
		Label: 'Price',
		Currency: 'PHP',
		ErrorMessage: 'Price must not be less than or equal to 0',
		Min: 1,
	};
	public readonly Quantity = {
		Label: 'Quantity',
		ErrorMessage: "Quantity must be between 1 and candy's available quantity",
		Min: 1,
	};
	public readonly Image = {
		Label: 'Image',
		ErrorMessage: 'Image must not be empty',
		Filter: 'image/jpeg, image/png, image/webp',
	};
}
