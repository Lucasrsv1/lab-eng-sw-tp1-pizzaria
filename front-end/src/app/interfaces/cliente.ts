import { IEndereco } from "./endereco";
import { IPedido } from "./pedido";

export interface ICliente {
	idCliente?: number;
	nome: string;
	cpf: string;
	email: string;
	senha?: string;
	telefone: string;

	endereco?: IEndereco;
	pedidos?: IPedido[];
}
