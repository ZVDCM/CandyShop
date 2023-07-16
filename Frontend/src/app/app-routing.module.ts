import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandyShopRoutingModule } from './candyshop/candy-shop-routing.module';
import { NotFoundComponent } from './notfound/not-found.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./candyshop/candy-shop.module').then((m) => m.CandyShopModule),
	},
	{ path: '**', title: 'Candy Shop | Not Found', component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes), CandyShopRoutingModule],
	exports: [RouterModule],
})
export class AppRoutingModule {}
