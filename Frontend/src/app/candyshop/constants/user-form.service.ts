import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UserFormService {
	public readonly Name = {
		Label: 'Name',
		ErrorMessage: 'Name must not be empty or greater than 50 characters',
		MaxLength: 50,
	};
	public readonly Email = {
		Label: 'Email',
		ErrorMessage: 'Email must follow a valid email format',
	};
	public readonly Address = {
		Label: 'Address',
		ErrorMessage: 'Address must not be empty or greater than 50 characters',
		MaxLength: 50,
	};
}
