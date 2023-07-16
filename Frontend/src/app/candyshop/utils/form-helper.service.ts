import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class FormHelperService {
	private _form: FormGroup = new FormGroup({});

	public SetFormGroup(form: FormGroup) {
		this._form = form;
	}

	public IsInputInvalid(formControlName: string): boolean | undefined {
		return (
			this._form.get(formControlName)?.invalid &&
			this._form.get(formControlName)?.dirty
		);
	}

	public ValidateAllFormFields() {
		Object.keys(this._form.controls).forEach((field) => {
			const control = this._form.get(field);
			if (control instanceof FormControl) {
				control.markAsDirty({ onlySelf: true });
			}
		});
	}
}
