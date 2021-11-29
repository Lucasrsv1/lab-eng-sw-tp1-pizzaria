import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

import { BlockUI, NgBlockUI } from "ng-block-ui";
import { faCheckCircle, faMapMarkedAlt, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

import { IEndereco } from "src/app/interfaces/endereco";
import { IItemPedido } from "src/app/interfaces/item-pedido";

import { AddressService } from "src/app/services/address/address.service";
import { AlertsService } from "src/app/services/alerts/alerts.service";
import { OrdersService } from "src/app/services/orders/orders.service";

@Component({
	selector: "app-carrinho",
	templateUrl: "./carrinho.component.html",
	styleUrls: ["./carrinho.component.scss"]
})
export class CarrinhoComponent implements OnInit {
	@BlockUI()
	private blockUI?: NgBlockUI;

	public faCheckCircle = faCheckCircle;
	public faMapMarkedAlt = faMapMarkedAlt;
	public faShoppingBasket = faShoppingBasket;

	public address: IEndereco | null = null;
	public cart: IItemPedido[] = [];

	constructor (
		private addressService: AddressService,
		private alertsService: AlertsService,
		private ordersService: OrdersService
	) { }

	public ngOnInit (): void {
		this.cart = this.ordersService.getCart();
		this.addressService.getClientAddress().subscribe(
			address => this.address = address
		);
	}

	public get orderPrice (): number {
		return this.cart.reduce(
			(sum, i) => sum + this.ordersService.getItemPrice(i), 0
		);
	}

	public remove (idItemPedido: number): void {
		this.ordersService.removeFromCart(idItemPedido);
		this.cart = this.ordersService.getCart();
	}

	public placeOrder (): void {
		this.blockUI?.start("Fazendo pedido...");
		this.ordersService.placeOrder().subscribe(
			_ => {
				this.blockUI?.stop();
				this.cart = this.ordersService.getCart();
				this.alertsService.show(
					"Pedido Realizado com Sucesso!",
					"Seu pedido foi registrado e chegará ao seu endereço em breve.",
					"success"
				);
			},
			(error: HttpErrorResponse) => {
				this.blockUI?.stop();
				this.alertsService.httpErrorAlert(
					"Erro ao Finalizar Pedido",
					"Não foi possível realizar o pedido, tente novamente.",
					error
				);
			}
		);
	}
}
