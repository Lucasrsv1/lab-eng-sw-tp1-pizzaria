import { IItem } from "./item";
import { IPedido } from "./pedido";

export interface IItemPedido {
	idItemPedido?: number;
	idItem: number;
	idPedido?: number;
	quantidade: number;
	meiaPizza: boolean;
	idPizzaComplementar?: number;

	item?: IItem;
	pedido?: IPedido;
	pizzaComplementar?: IItem;
}
