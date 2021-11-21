import { IBairro } from "./bairro";
import { ICliente } from "./cliente";

export interface IEndereco {
	idEndereco?: number;
	idCliente: number;
	idBairro: number;
	cep: string;
	rua: string;
	numero: number;
	apartamento: boolean;

	bairro?: IBairro;
	cliente?: ICliente;
}
