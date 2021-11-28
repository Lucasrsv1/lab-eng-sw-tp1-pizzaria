import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { IItemPedido } from "src/app/interfaces/item-pedido";
import { IPedido } from "src/app/interfaces/pedido";

import { environment } from "src/environments/environment";

import { AuthenticationService } from "../authentication/authentication.service";
import { LocalStorageKey, LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({ providedIn: "root" })
export class OrdersService {
	constructor (
		private http: HttpClient,
		private authenticationService: AuthenticationService,
		private localStorageService: LocalStorageService
	) { }

	public getCart (): IItemPedido[] {
		const client = this.authenticationService.getLoggedUser();
		if (!client) return [];

		const id = client.idCliente;
		return JSON.parse(this.localStorageService.get(LocalStorageKey.CART, "[]", `_${id}`));
	}

	public addToCart (itemPedido: IItemPedido): void {
		const client = this.authenticationService.getLoggedUser();
		if (!client)
			throw new Error("Cliente não autenticado.");

		const id = client.idCliente;
		const cart = this.getCart();
		cart.push(itemPedido);

		this.localStorageService.set(LocalStorageKey.CART, JSON.stringify(cart), `_${id}`);
	}

	public removeFromCart (idItemPedido: number): void {
		const client = this.authenticationService.getLoggedUser();
		if (!client)
			throw new Error("Cliente não autenticado.");

		const id = client.idCliente;
		const cart = this.getCart().filter(i => i.idItemPedido != idItemPedido);

		this.localStorageService.set(LocalStorageKey.CART, JSON.stringify(cart), `_${id}`);
	}

	public placeOrder (): Observable<IPedido> {
		const cart = this.getCart();
		if (!cart.length)
			throw new Error("O carrinho está vazio.");

		const order = {
			valorTotal: cart.reduce((sum, i) => sum + this.getItemPrice(i), 0),
			itensPedidos: cart
		};

		for (const item of order.itensPedidos) {
			delete item.item;
			delete item.idItemPedido;
			delete item.pizzaComplementar;
		}

		return this.http.post<IPedido>(`${environment.API_URL}/v1/pedidos`, order);
	}

	private getItemPrice (itemPedido: IItemPedido): number {
		if (!itemPedido.item) return 0;

		let price = itemPedido.quantidade * itemPedido.item?.preco;
		if (itemPedido.meiaPizza) {
			if (!itemPedido.pizzaComplementar) return 0;

			price = (price / 2) + ((itemPedido.quantidade * itemPedido.pizzaComplementar.preco) / 2);
		}

		return price;
	}
}
