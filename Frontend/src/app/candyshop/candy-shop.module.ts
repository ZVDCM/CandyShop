import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './pages/shop/shop-page.component';
import { UserLayoutComponent } from './layouts/shop/user-layout.component';
import { CandiesLayoutComponent } from './layouts/shop/candies-layout.component';
import { CartLayoutComponent } from './layouts/shop/cart-layout.component';
import { ButtonModule } from 'primeng/button';
import { CandyItemComponent } from './components/candy-item.component';
import { CartItemComponent } from './components/cart-item.component';
import { UserModalComponent } from './components/user-modal.component';
import { PaymentPageComponent } from './pages/payment/payment-page.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CandyShopComponent } from './candy-shop.component';
import { CandyShopRoutingModule } from './candy-shop-routing.module';
import { CandyModalComponent } from './components/candy-modal.component';
import { AddCandyModalComponent } from './components/add-candy-modal.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaymentCartLayoutComponent } from './layouts/payment/payment-cart-layout.component';
import { PaymentCartDetailsLayoutComponent } from './layouts/payment/payment-cart-details-layout.component';
import { CandyPageComponent } from './pages/candy/candy-page.component';
import { CandyDetailsLayoutComponent } from './layouts/candy/candy-details-layout.component';
import { CandyLayoutComponent } from './layouts/candy/candy-layout.component';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
	declarations: [
		CandyShopComponent,
		ShopPageComponent,
		UserLayoutComponent,
		CandiesLayoutComponent,
		CartLayoutComponent,
		CandyItemComponent,
		CartItemComponent,
		UserModalComponent,
		PaymentPageComponent,
		CandyModalComponent,
		AddCandyModalComponent,
		PaymentCartLayoutComponent,
		PaymentCartDetailsLayoutComponent,
		CandyPageComponent,
		CandyDetailsLayoutComponent,
		CandyLayoutComponent,
	],
	imports: [
		CommonModule,
		ButtonModule,
		DialogModule,
		ReactiveFormsModule,
		InputTextModule,
		CandyShopRoutingModule,
		InputNumberModule,
		FileUploadModule,
		ConfirmDialogModule,
		ToastModule,
		SkeletonModule,
	],
	exports: [CandyShopComponent, CandyShopRoutingModule],
})
export class CandyShopModule {}
