import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthenticationGuard } from "./guards/authentication/authentication.guard";
import { HasAddressGuard } from "./guards/has-address/has-address.guard";
import { LoginGuard } from "./guards/login/login.guard";
import { NoAddressGuard } from "./guards/no-address/no-address.guard";

import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { CardapioComponent } from "./pages/cardapio/cardapio.component";
import { CarrinhoComponent } from "./pages/carrinho/carrinho.component";
import { EnderecoComponent } from "./pages/endereco/endereco.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
	{ path: "cardapio", component: CardapioComponent, canActivate: [HasAddressGuard] },
	{ path: "carrinho", component: CarrinhoComponent, canActivate: [AuthenticationGuard, HasAddressGuard] },
	{ path: "endereco", component: EnderecoComponent, canActivate: [AuthenticationGuard, NoAddressGuard] },
	{ path: "login", component: LoginComponent, canActivate: [LoginGuard] },
	{ path: "cadastro", component: CadastroComponent, canActivate: [LoginGuard] },
	{ path: "**", redirectTo: "cardapio" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
