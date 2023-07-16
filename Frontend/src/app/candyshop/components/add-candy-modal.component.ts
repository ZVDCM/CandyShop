import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelperService } from '../utils/form-helper.service';
import { AddCandyFormService } from '../constants/add-candy-form.service';
import Candy from '../classes/Candy';

@Component({
	selector: 'add-candy-modal',
	template: `
		<p-dialog
			header="How many candies would you like to add?"
			[(visible)]="visible"
			[style]="{ width: '400px' }"
			[modal]="true"
			[draggable]="false"
			[resizable]="false"
			(onHide)="HideModal()"
		>
			<form
				[formGroup]="CandyForm"
				(ngSubmit)="SubmitCandyToCart()"
				method="POST"
			>
				<div class="flex flex-col flex-nowrap gap-2">
					<div class="flex flex-col gap-1">
						<label for="quantity">{{ addCandyForm.Quantity.Label }}</label>
						<p-inputNumber
							inputId="quantity"
							aria-describedby="quantity-validation-help"
							[formControlName]="addCandyForm.Quantity.Label"
							styleClass="w-full"
						/>
						<small
							id="quantity-validation-help"
							[ngClass]="{
								hidden: !formHelper.IsInputInvalid(addCandyForm.Quantity.Label)
							}"
							class="p-error"
							>{{ addCandyForm.Quantity.ErrorMessage }}</small
						>
					</div>
				</div>
				<div class="flex flex-col flex-nowrap gap-3 mt-[1.5rem]">
					<button
						pButton
						label="ADD"
						aria-label="Add candy to cart"
						class="tracking-wide"
					></button>
					<button
						pButton
						label="CANCEL"
						class="p-button-outlined p-button-danger tracking-wide"
						aria-label="Cancel adding candy to cart"
						type="button"
						(click)="HideModal()"
					></button>
				</div>
			</form>
		</p-dialog>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [FormHelperService],
})
export class AddCandyModalComponent implements OnInit {
	public CandyForm: FormGroup = new FormGroup({});

	@Input()
	public visible: boolean = true;

	@Output()
	public candyQuantityToCart: EventEmitter<number> = new EventEmitter<number>();
	@Output()
	public hideAddCandyModal: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private _formBuilder: FormBuilder,
		public formHelper: FormHelperService,
		public addCandyForm: AddCandyFormService
	) {}

	ngOnInit(): void {
		this.SetForm();
	}

	public SubmitCandyToCart() {
		if (this.CandyForm.invalid) return this.formHelper.ValidateAllFormFields();
		this.candyQuantityToCart.emit(
			this.CandyForm.get(this.addCandyForm.Quantity.Label)?.value
		);
		this.HideModal();
	}

	public HideModal() {
		this.hideAddCandyModal.emit(false);
		this.SetForm();
	}

	public SetForm(): void {
		this.CandyForm = this._formBuilder.group({
			[this.addCandyForm.Quantity.Label]: [
				1,
				[
					Validators.min(this.addCandyForm.Quantity.Min),
					Validators.max(50),
					Validators.required,
				],
			],
		});
		this.formHelper.SetFormGroup(this.CandyForm);
	}
}
