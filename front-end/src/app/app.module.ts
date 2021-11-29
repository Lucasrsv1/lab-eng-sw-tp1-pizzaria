import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { BlockUIModule } from "ng-block-ui";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgSelectModule } from "@ng-select/ng-select";
import { TextMaskModule } from "angular2-text-mask";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { ComponentsModule } from "./components/components.module";

import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { CardapioComponent } from "./pages/cardapio/cardapio.component";
import { CarrinhoComponent } from "./pages/carrinho/carrinho.component";
import { EnderecoComponent } from "./pages/endereco/endereco.component";
import { LoginComponent } from "./pages/login/login.component";

import { PipesModule } from "./pipes/pipes.module";
import { RequestInterceptor } from "./services/authentication/request.interceptor";

@NgModule({
	declarations: [
		AppComponent,
		CardapioComponent,
		CarrinhoComponent,
		LoginComponent,
		CadastroComponent,
		EnderecoComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		TextMaskModule,
		CollapseModule.forRoot(),
		BlockUIModule.forRoot(),
		ComponentsModule,
		PipesModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
