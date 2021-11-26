import { Component } from "@angular/core";

import {
	faBars,
	faPizzaSlice,
	faShoppingCart,
	faSignInAlt,
	faSignOutAlt,
	faUserCircle,
	faUtensils
} from "@fortawesome/free-solid-svg-icons";

import { ICliente } from "src/app/interfaces/cliente";

import { AuthenticationService } from "src/app/services/authentication/authentication.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
	public nomeCliente = "";

	public faBars = faBars;
	public faPizzaSlice = faPizzaSlice;
	public faShoppingCart = faShoppingCart;
	public faSignInAlt = faSignInAlt;
	public faSignOutAlt = faSignOutAlt;
	public faUtensils = faUtensils;
	public faUserCircle = faUserCircle;

	public isMenuCollapsed: boolean = true;

	constructor (private authenticationService: AuthenticationService) {
		// Monitora login e logout
		this.authenticationService.$loggedClient.subscribe(cliente => {
			this.obtemNomeCliente(cliente);
		});

		this.obtemNomeCliente(this.authenticationService.getLoggedUser());
	}

	private obtemNomeCliente (cliente: ICliente | null): void {
		if (cliente) {
			const nomes = cliente.nome.split(" ");
			this.nomeCliente = nomes.filter((_, idx) => idx === 0 || idx === nomes.length - 1).join(" ");
		}
	}

	public get isLoggedIn (): boolean {
		return this.authenticationService.isLoggedIn();
	}

	public logout (): void {
		this.authenticationService.signOut();
	}
}
