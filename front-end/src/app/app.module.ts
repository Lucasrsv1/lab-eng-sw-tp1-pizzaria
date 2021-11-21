import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { BlockUIModule } from "ng-block-ui";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { ComponentsModule } from "./components/components.module";

import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { CardapioComponent } from "./pages/cardapio/cardapio.component";
import { CarrinhoComponent } from "./pages/carrinho/carrinho.component";
import { LoginComponent } from "./pages/login/login.component";

import { RequestInterceptor } from "./services/authentication/request.interceptor";

@NgModule({
	declarations: [
		AppComponent,
		CardapioComponent,
		CarrinhoComponent,
		LoginComponent,
		CadastroComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		HttpClientModule,
		CollapseModule.forRoot(),
		BlockUIModule.forRoot(),
		ComponentsModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
