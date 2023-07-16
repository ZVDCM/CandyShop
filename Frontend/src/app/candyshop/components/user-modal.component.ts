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
import { UserFormService } from '../constants/user-form.service';
import User from '../classes/User';

@Component({
	selector: 'user-modal',
	template: `
		<p-dialog
			header="Edit User"
			[(visible)]="visible"
			[style]="{ width: '400px' }"
			[modal]="true"
			[draggable]="false"
			[resizable]="false"
			(onHide)="HideModal()"
		>
			<form [formGroup]="UserForm" (ngSubmit)="SubmitUserEdit()" method="POST">
				<div class="flex flex-col flex-nowrap gap-2">
					<div class="flex flex-col gap-1">
						<label for="name">{{ userForm.Name.Label }}</label>
						<input
							pInputText
							id="name"
							aria-describedby="name-validation-help"
							[formControlName]="userForm.Name.Label"
						/>
						<small
							id="name-validation-help"
							[ngClass]="{
								hidden: !formHelper.IsInputInvalid(userForm.Name.Label)
							}"
							class="p-error"
							>Name must not be empty</small
						>
					</div>
					<div class="flex flex-col gap-1">
						<label for="email">{{ userForm.Email.Label }}</label>
						<input
							pInputText
							id="email"
							aria-describedby="email-validation-help"
							[formControlName]="userForm.Email.Label"
							type="email"
						/>
						<small
							id="email-validation-help"
							[ngClass]="{
								hidden: !formHelper.IsInputInvalid(userForm.Email.Label)
							}"
							class="p-error"
							>Email must follow a valid email format</small
						>
					</div>
					<div class="flex flex-col gap-1">
						<label for="address">{{ userForm.Address.Label }}</label>
						<input
							pInputText
							id="address"
							aria-describedby="address-validation-help"
							[formControlName]="userForm.Address.Label"
						/>
						<small
							id="address-validation-help"
							[ngClass]="{
								hidden: !formHelper.IsInputInvalid(userForm.Address.Label)
							}"
							class="p-error"
							>Address must not be empty</small
						>
					</div>
				</div>
				<div class="flex flex-col flex-nowrap gap-3 mt-[1.5rem]">
					<button
						pButton
						label="EDIT"
						aria-label="edit the user"
						class="tracking-wide"
					></button>
					<button
						pButton
						label="CANCEL"
						class="p-button-outlined p-button-danger tracking-wide"
						aria-label="Cancel editing the User"
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
export class UserModalComponent implements OnInit {
	public UserForm: FormGroup = new FormGroup({});

	@Input()
	public user: User = User.Empty();

	@Output()
	public editUser: EventEmitter<User> = new EventEmitter<User>();

	@Input()
	public visible: boolean = false;

	@Output()
	public hideUserModal: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private _formBuilder: FormBuilder,
		public formHelper: FormHelperService,
		public userForm: UserFormService
	) {}

	ngOnInit(): void {
		this._SetForm();
	}

	public SubmitUserEdit(): void {
		if (this.UserForm.invalid) return this.formHelper.ValidateAllFormFields();

		const user = new User(
			this.UserForm.value.Id,
			this.UserForm.value.Name,
			this.UserForm.value.Email,
			this.UserForm.value.Address
		);
		this.editUser.emit(user);
		this.HideModal();
	}

	public HideModal(): void {
		this.hideUserModal.emit(false);
		this._SetForm();
	}

	private _SetForm(): void {
		this.UserForm = this._formBuilder.group({
			[this.userForm.Name.Label]: [
				this.user.Name,
				[Validators.maxLength(50), Validators.required],
			],
			[this.userForm.Email.Label]: [
				this.user.Email,
				[Validators.email, Validators.required],
			],
			[this.userForm.Address.Label]: [
				this.user.Address,
				[Validators.maxLength(50), Validators.required],
			],
		});
		this.formHelper.SetFormGroup(this.UserForm);
	}
}
