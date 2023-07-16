import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormHelperService } from '../utils/form-helper.service';
import { CandyFormService } from '../constants/candy-form.service';
import Candy from '../classes/Candy';
import Money from '../classes/Money';
import { ActivatedRoute } from '@angular/router';
import { CandyPayload } from '../data/candy.service';

@Component({
	selector: 'candy-modal',
	template: `
		<p-dialog
			[header]="isAdd ? 'Create a Candy' : 'Edit Candy'"
			[(visible)]="visible"
			[style]="{ width: '400px' }"
			[modal]="true"
			[draggable]="false"
			[resizable]="false"
			(onHide)="HideModal()"
		>
			<form
				[formGroup]="CandyForm"
				(ngSubmit)="SubmitCandyCreate()"
				method="POST"
			>
				<div class="flex flex-col flex-nowrap gap-2">
					<div class="flex flex-col gap-1">
						<label for="name">{{ candyForm.Name.Label }}</label>
						<input
							pInputText
							id="name"
							aria-describedby="name-validation-help"
							[formControlName]="candyForm.Name.Label"
						/>
						<small
							id="name-validation-help"
							[ngClass]="{
								hidden: !formHelper.IsInputInvalid(candyForm.Name.Label)
							}"
							class="p-error"
							>{{ candyForm.Name.ErrorMessage }}</small
						>
					</div>
					<div class="flex flex-col gap-1">
						<label for="price">{{ candyForm.Price.Label }}</label>
						<p-inputNumber
							inputId="price"
							mode="currency"
							[currency]="candyForm.Price.Currency"
							aria-describedby="price-validation-help"
							[formControlName]="candyForm.Price.Label"
							styleClass="w-full"
						/>
						<small
							id="price-validation-help"
							[ngClass]="{
								hidden: !formHelper.IsInputInvalid(candyForm.Price.Label)
							}"
							class="p-error"
							>{{ candyForm.Price.ErrorMessage }}</small
						>
					</div>
					<div class="flex flex-col gap-1">
						<label for="quantity">{{ candyForm.Quantity.Label }}</label>
						<p-inputNumber
							inputId="quantity"
							aria-describedby="quantity-validation-help"
							[formControlName]="candyForm.Quantity.Label"
							styleClass="w-full"
						/>
						<small
							id="quantity-validation-help"
							[ngClass]="{
								hidden: !formHelper.IsInputInvalid(candyForm.Quantity.Label)
							}"
							class="p-error"
							>{{ candyForm.Quantity.ErrorMessage }}</small
						>
					</div>
					<div class="flex flex-col gap-1">
						<label for="image">{{ candyForm.Image.Label }}</label>
						<div class="p-inputgroup">
							<input
								pInputText
								readonly
								id="image"
								aria-describedby="image-validation-help"
								[formControlName]="candyForm.Image.Label"
							/>
							<input
								#fileInput
								[accept]="candyForm.Image.Filter"
								class="hidden"
								(change)="setImage($event)"
								type="file"
							/>
							<button
								pButton
								icon="pi pi-plus"
								(click)="OpenFile()"
								type="button"
							></button>
						</div>
						<small
							id="image-validation-help"
							[ngClass]="{
								hidden: !formHelper.IsInputInvalid(candyForm.Image.Label)
							}"
							class="p-error"
							>{{ candyForm.Image.ErrorMessage }}</small
						>
					</div>
				</div>
				<div class="flex flex-col flex-nowrap gap-3 mt-[1.5rem]">
					<button
						pButton
						[label]="isAdd ? 'CREATE' : 'EDIT'"
						[attr.aria-label]="isAdd ? 'Create a candy' : 'Edit candy'"
						class="tracking-wide"
					></button>
					<button
						pButton
						label="CANCEL"
						class="p-button-outlined p-button-danger tracking-wide"
						[attr.aria-label]="
							isAdd ? 'Cancel creating a candy' : 'Cancel editing candy'
						"
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
export class CandyModalComponent implements OnInit {
	public CandyForm: FormGroup = new FormGroup({});
	private _file: File | undefined = undefined;
	private _candyId: string = '';

	@ViewChild('fileInput', { static: false })
	private _InputValue: ElementRef<HTMLInputElement> =
		new ElementRef<HTMLInputElement>(document.createElement('input'));

	@Input()
	public visible: boolean = true;

	@Input()
	public isAdd: boolean = true;

	@Input()
	public candy: Candy = Candy.Empty();

	@Output()
	public getCandyPayload: EventEmitter<CandyPayload> =
		new EventEmitter<CandyPayload>();

	@Output()
	public hideCandyModal: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private _route: ActivatedRoute,
		private _formBuilder: FormBuilder,
		public formHelper: FormHelperService,
		public candyForm: CandyFormService
	) {}

	ngOnInit(): void {
		this._SetForm();
		this._route.params.subscribe((params) => {
			this._candyId = params['id'];
		});
	}

	public SubmitCandyCreate(): void {
		if (this.CandyForm.invalid) return this.formHelper.ValidateAllFormFields();
		const candy = new Candy(
			this._candyId,
			this.CandyForm.value.Name,
			this.CandyForm.value.Quantity,
			new Money(this.candyForm.Price.Currency, this.CandyForm.value.Price),
			this.CandyForm.value.Image
		);
		this.getCandyPayload.emit({ candy, file: this._file });
		this.HideModal();
	}

	public HideModal(): void {
		this.hideCandyModal.emit(false);
		this._SetForm();
	}

	private _SetForm(): void {
		this.CandyForm = this._formBuilder.group({
			[this.candyForm.Name.Label]: [
				this.candy.Name,
				[
					Validators.maxLength(this.candyForm.Name.MaxLength),
					Validators.required,
				],
			],
			[this.candyForm.Price.Label]: [
				this.candy.Price.Value,
				[Validators.min(this.candyForm.Price.Min), Validators.required],
			],
			[this.candyForm.Quantity.Label]: [
				this.candy.Quantity,
				[Validators.min(this.candyForm.Quantity.Min), Validators.required],
			],
			[this.candyForm.Image.Label]: [this.candy.Image, [Validators.required]],
		});
		this.formHelper.SetFormGroup(this.CandyForm);
	}

	public setImage(event: Event): void {
		let target = event.target as HTMLInputElement;
		let file = (target.files as FileList)[0];
		this.CandyForm.get(this.candyForm.Image.Label)?.setValue(file.name);
		this._file = file;
	}

	public OpenFile(): void {
		this._InputValue.nativeElement.click();
	}
}
