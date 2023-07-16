import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CandyShopModule } from './candyshop/candy-shop.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundModule } from './notfound/not-found.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CandyShopModule,
		NotFoundModule,
		GraphQLModule,
		HttpClientModule
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
