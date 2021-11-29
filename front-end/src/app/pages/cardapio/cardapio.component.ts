import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { BlockUI, NgBlockUI } from "ng-block-ui";

import { IItemPedido } from "src/app/interfaces/item-pedido";
import { IItem, TipoItem } from "src/app/interfaces/item";

import { AlertsService } from "src/app/services/alerts/alerts.service";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { MenuService } from "src/app/services/menu/menu.service";
import { OrdersService } from "src/app/services/orders/orders.service";

@Component({
	selector: "app-cardapio",
	templateUrl: "./cardapio.component.html",
	styleUrls: ["./cardapio.component.scss"]
})
export class CardapioComponent implements OnInit {
	@BlockUI()
	private blockUI?: NgBlockUI;

	public items: IItem[] = [];

	private meiaPizza?: IItem = undefined;

	constructor (
		private router: Router,
		private alertsService: AlertsService,
		private authenticationService: AuthenticationService,
		private menuService: MenuService,
		private ordersService: OrdersService
	) { }

	public ngOnInit (): void {
		this.blockUI?.start("Carregando cardápio...");
		this.menuService.getMenu().subscribe(
			items => {
				this.blockUI?.stop();
				this.items = items;
			},
			(error: HttpErrorResponse) => {
				this.blockUI?.stop();
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

	public async buy (item: IItem): Promise<void> {
		if (!this.authenticationService.isLoggedIn()) {
			this.alertsService.show("Autenticação Necessária", "Por favor, faça login para poder fazer um pedido.", "warning");
			this.router.navigate(["login"]);
			return;
		}

		if (item.tipo === TipoItem.PIZZA && !this.meiaPizza) {
			const meiaPizza = await this.alertsService.confirm(
				"Você pode dividir sua pizza grande de 8 pedaços em metade de um sabor e metade de outro.",
				"Gostaria de escolher um segundo sabor?",
				"NÃO"
			);

			if (meiaPizza) {
				this.meiaPizza = item;
				return;
			}
		}

		if (this.meiaPizza && (item.tipo !== TipoItem.PIZZA || this.meiaPizza.idItem === item.idItem))
			this.meiaPizza = undefined;

		let question: string;
		if (item.tipo === TipoItem.BEBIDA)
			question = "Quantas bebidas";
		else if (item.tipo === TipoItem.COMBO)
			question = "Quantos combos";
		else
			question = "Quantas pizzas";

		let description = item.descricao;
		if (this.meiaPizza)
			description = `meia ${this.meiaPizza.descricao} meia ${item.descricao}`;

		const qty = Number(await this.alertsService.prompt(
			`${question} você gostaria de pedir?`,
			`Pedido de ${item.tipo.toLowerCase()}: ${description}`,
			"number",
			{ min: "1" },
			1
		));

		if (qty > 0) {
			const itemPedido: IItemPedido = {
				idItemPedido: Date.now(),
				idItem: this.meiaPizza ? this.meiaPizza.idItem : item.idItem,
				quantidade: qty,
				meiaPizza: !!this.meiaPizza,
				idPizzaComplementar: this.meiaPizza ? item.idItem : undefined,
				item: this.meiaPizza ? this.meiaPizza : item,
				pizzaComplementar: this.meiaPizza ? item : undefined
			};

			this.ordersService.addToCart(itemPedido);
		}

		this.meiaPizza = undefined;
	}
}
