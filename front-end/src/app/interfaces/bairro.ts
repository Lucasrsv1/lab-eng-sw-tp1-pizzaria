import { IEndereco } from "./endereco";

export interface IBairro {
	idBairro?: number;
	nome: string;

	enderecos?: IEndereco[];
}
