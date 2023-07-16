import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentPageComponent } from './pages/payment/payment-page.component';
import { ShopPageComponent } from './pages/shop/shop-page.component';
import { CandyShopComponent } from './candy-shop.component';
import { CandyPageComponent } from './pages/candy/candy-page.component';

const routes: Routes = [
	{
		path: '',
		component: CandyShopComponent,
		children: [
			{ path: '', redirectTo: '/shop', pathMatch: 'full' },
			{ path: 'shop', title: 'Candy Shop', component: ShopPageComponent },
			{
				path: 'shop/:id',
				title: 'Candy Shop | Candy',
				component: CandyPageComponent,
			},
			{
				path: 'payment',
				title: 'Candy Shop | Payment',
				component: PaymentPageComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CandyShopRoutingModule {}
