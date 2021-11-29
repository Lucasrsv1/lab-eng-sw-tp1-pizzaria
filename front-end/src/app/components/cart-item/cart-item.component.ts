import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { IItemPedido } from "src/app/interfaces/item-pedido";
import { TipoItem } from "src/app/interfaces/item";

import { OrdersService } from "src/app/services/orders/orders.service";

@Component({
	selector: "app-cart-item",
	templateUrl: "./cart-item.component.html",
	styleUrls: ["./cart-item.component.scss"]
})
export class CartItemComponent implements OnChanges {
	@Input()
	public item?: IItemPedido;

	@Output()
	public remove: EventEmitter<number>;

	public faTimes = faTimes;
	public imgClass: string = "";

	constructor (private ordersService: OrdersService) {
		this.remove = new EventEmitter<number>();
	}

	public get description (): string {
		if (!this.item || !this.item.item) return "";

		let description = this.item.item.descricao;
		if (this.item.meiaPizza) {
			if (!this.item.pizzaComplementar) return "";

			description = `Meia ${this.item.item.descricao} meia ${this.item.pizzaComplementar.descricao}`;
		}

		return description;
	}

	public get quantity (): number {
		return this.item ? this.item.quantidade : 0;
	}

	public get unitPrice (): number {
		return this.item ? (this.ordersService.getItemPrice(this.item) / this.item.quantidade) : 0;
	}

	public ngOnChanges (): void {
		if (this.item?.item?.tipo === TipoItem.BEBIDA)
			this.imgClass = "drink";
		else
			this.imgClass = `p${1 + Math.floor(Math.random() * 6)}`;
	}
}
