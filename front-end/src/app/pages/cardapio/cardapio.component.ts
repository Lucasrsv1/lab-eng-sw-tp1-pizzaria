import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { IItem, TipoItem } from "src/app/interfaces/item";

import { AlertsService } from "src/app/services/alerts/alerts.service";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { MenuService } from "src/app/services/menu/menu.service";

@Component({
	selector: "app-cardapio",
	templateUrl: "./cardapio.component.html",
	styleUrls: ["./cardapio.component.scss"]
})
export class CardapioComponent implements OnInit {
	public items: IItem[] = [];

	constructor (
		private router: Router,
		private alertsService: AlertsService,
		private authenticationService: AuthenticationService,
		private menuService: MenuService
	) { }

	public ngOnInit (): void {
		this.menuService.getMenu().subscribe(
			items => this.items = items,
			(error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Erro ao Obter Cardápio",
					"Não foi possível realizar o consulta no servidor, tente novamente.",
					error
				);
			}
		);
	}

	public get pizzas (): IItem[] {
		return this.items.filter(i => i.tipo === TipoItem.PIZZA);
	}

	public get bebidas (): IItem[] {
		return this.items.filter(i => i.tipo === TipoItem.BEBIDA);
	}

	public get combos (): IItem[] {
		return this.items.filter(i => i.tipo === TipoItem.COMBO);
	}

	public buy (item: IItem): void {
		if (!this.authenticationService.isLoggedIn()) {
			this.alertsService.show("Autenticação Necessária", "Por favor, faça login para poder fazer um pedido.", "warning");
			this.router.navigate(["login"]);
			return;
		}

		console.log(item);
	}
}
