import { ICliente } from "./cliente";
import { IItem } from "./item";
import { IItemPedido } from "./item-pedido";

export interface IPedido {
	idPedido?: number;
	idCliente: number;
	dataHora: Date | string;
	valorTotal: number;

	cliente?: ICliente;
	itensPedidos?: IItemPedido[];
	itens?: IItem[];
}
