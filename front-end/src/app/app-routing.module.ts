import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthenticationGuard } from "./guards/authentication/authentication.guard";
import { LoginGuard } from "./guards/login/login.guard";

import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { CardapioComponent } from "./pages/cardapio/cardapio.component";
import { CarrinhoComponent } from "./pages/carrinho/carrinho.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
	{ path: "", component: CardapioComponent },
	{ path: "carrinho", component: CarrinhoComponent, canActivate: [AuthenticationGuard] },
	{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },
	{ path: "cadastro", component: CadastroComponent, canActivate: [LoginGuard] },
	{ path: "**", redirectTo: "" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
