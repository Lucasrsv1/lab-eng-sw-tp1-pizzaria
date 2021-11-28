import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { IEndereco } from "src/app/interfaces/endereco";

import { AlertsService } from "../alerts/alerts.service";
import { AuthenticationService } from "../authentication/authentication.service";
import { LocalStorageKey, LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({ providedIn: "root" })
export class AddressService {
	constructor (
		private readonly http: HttpClient,
		private readonly alertsService: AlertsService,
		private readonly authenticationService: AuthenticationService,
		private readonly localStorageService: LocalStorageService
	) { }

	public isClientAddressValid (): Promise<boolean> {
		if (!this.authenticationService.isLoggedIn())
			return Promise.resolve(true);

		return new Promise(resolve => {
			this.getClientAddress().subscribe(address => resolve(!!address));
		});
	}

	public getClientAddress (): Observable<IEndereco | null> {
		return new Observable<IEndereco | null>(subscriber => {
			const client = this.authenticationService.getLoggedUser();

			// Cliente não autenticado
			if (!client) {
				subscriber.next(null);
				return subscriber.complete();
			}

			// Já tem o endereço do cliente em memória
			if (this.localStorageService.hasKey(LocalStorageKey.ADDRESS, `_${client.idCliente}`)) {
				const addressData = this.localStorageService.get(LocalStorageKey.ADDRESS, null, `_${client.idCliente}`);
				subscriber.next(JSON.parse(addressData));
				return subscriber.complete();
			}

			// Tenta buscar o endereço pela API
			this.http.get<IEndereco>(`${environment.API_URL}/v1/endereco`).subscribe(
				address => {
					this.localStorageService.set(LocalStorageKey.ADDRESS, JSON.stringify(address), `_${client.idCliente}`);
					subscriber.next(address);
				},
				(error: HttpErrorResponse) => {
					subscriber.next(null);
					subscriber.complete();

					if (error.status !== 404) {
						this.alertsService.httpErrorAlert(
							"Erro ao Buscar Endereço",
							"Não foi possível obter o seu endereço, tente novamente.",
							error
						);
					}
				}
			);
		});
	}

	public saveAddress (address: IEndereco): Observable<IEndereco> {
		return this.http.post<IEndereco>(`${environment.API_URL}/v1/endereco`, address);
	}
}
