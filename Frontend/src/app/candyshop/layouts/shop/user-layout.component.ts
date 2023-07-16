import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../data/user.service';
import User from '../../classes/User';
import { Observable } from 'rxjs';

@Component({
	selector: 'user-layout',
	template: `
		<ng-container *ngIf="user$ | async as user; else userLoading">
			<div class="h-[10%] flex justify-between items-center">
				<h1 class="text-[1.5rem] font-semibold">User</h1>
				<p-button
					icon="pi pi-pencil"
					styleClass="p-button-rounded p-button-text"
					class="float-right"
					aria-label="Edit user"
					(click)="ShowModal()"
				></p-button>
			</div>
			<table>
				<tbody>
					<tr>
						<td class="font-light align-top">Name</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ user.Name }}
						</td>
					</tr>
					<tr>
						<td class="font-light align-top">Email</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ user.Email }}
						</td>
					</tr>
					<tr>
						<td class="font-light align-top">Address</td>
						<td class="font-semibold pl-[2rem] align-top">
							{{ user.Address }}
						</td>
					</tr>
				</tbody>
			</table>
			<user-modal
				[user]="user"
				(editUser)="EditUser($event)"
				[visible]="isUserModalVisible"
				(hideUserModal)="isUserModalVisible = $event"
			/>
		</ng-container>
		<ng-template #userLoading>
			<div class="h-[10%] flex justify-between items-center">
				<h1 class="text-[1.5rem] font-semibold">User</h1>
			</div>
			<table>
				<tbody>
					<tr>
						<td class="font-light align-top">Name</td>
						<td class="w-full pl-[2rem]">
							<p-skeleton></p-skeleton>
						</td>
					</tr>
					<tr>
						<td class="font-light align-top">Email</td>
						<td class="w-full pl-[2rem]">
							<p-skeleton></p-skeleton>
						</td>
					</tr>
					<tr>
						<td class="font-light align-top">Address</td>
						<td class="w-full pl-[2rem]">
							<p-skeleton></p-skeleton>
						</td>
					</tr>
				</tbody>
			</table>
		</ng-template>
		<footer class="mt-auto">
			<span class="font-bold text-zinc-700 tracking-widest">ZVDCM - 2023</span>
		</footer>
	`,
	styles: [
		`
			:host {
				height: 100%;
				display: flex;
				flex-flow: column wrap;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLayoutComponent implements OnInit {
	public isUserModalVisible: boolean = false;

	public user$: Observable<User> = new Observable<User>();

	constructor(private _userService: UserService) {}

	ngOnInit(): void {
		this.user$ = this._userService.user$;
	}

	public ShowModal(): void {
		this.isUserModalVisible = true;
	}

	public EditUser(user: User): void {
		this.user$ = this._userService.EditUser(user);
	}
}
