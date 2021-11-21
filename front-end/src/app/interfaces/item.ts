import { IItemPedido } from "./item-pedido";
import { IPedido } from "./pedido";

export enum TipoItem {
	BEBIDA = "BEBIDA",
	COMBO = "COMBO",
	PIZZA = "PIZZA"
}

export interface IItem {
	idItem?: number;
	descricao: string;
	preco: number;
	tipo: TipoItem;

	itensPedidos?: IItemPedido[];
	pizzasComplementares?: IItem[];
	pedidos?: IPedido[];
}
