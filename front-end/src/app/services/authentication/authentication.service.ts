import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { tap } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

import jwtDecode from "jwt-decode";

import { environment } from "src/environments/environment";
import { ICliente } from "src/app/interfaces/cliente";

import { AlertsService } from "../alerts/alerts.service";
import { LocalStorageKey, LocalStorageService } from "../local-storage/local-storage.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
	public $loggedClient = new BehaviorSubject<ICliente | null>(null);

	constructor (
		private readonly http: HttpClient,
		private readonly router: Router,
		private readonly alertsService: AlertsService,
		private readonly localStorage: LocalStorageService
	) { }

	public signUp (user: ICliente): Observable<ICliente> {
		return this.http.post<ICliente>(`${environment.API_URL}/v1/signUp`, user).pipe(
			tap(_ => {
				this.alertsService.show("Cadastro Realizado", "O novo usuário foi cadastrado com sucesso.<br/>Você já pode fazer login com ele.", "success");
				this.router.navigate(["login"]);
			}, (error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Erro ao Cadastrar",
					"Não foi possível realizar o cadastro, tente novamente.",
					error
				);
			})
		);
	}

	public login (email: string, password: string): Observable<{ token: string }> {
		return this.http.post<{ token: string }>(
			`${environment.API_URL}/v1/login`,
			{ email, password }
		).pipe(
			tap(response => {
				this.localStorage.set(LocalStorageKey.USER, response.token);
				this.router.navigate(["home"]);
				this.$loggedClient.next(this.getLoggedUser());
			}, (error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Falha ao Entrar",
					"Não foi possível fazer login, tente novamente.",
					error
				);
			})
		);
	}

	public signOut (): void {
		this.localStorage.delete(LocalStorageKey.USER);
		this.$loggedClient.next(null);
		this.router.navigate([""]);
	}

	public isLoggedIn (): boolean {
		const user = this.getLoggedUser();
		return Boolean(user && user.idCliente && user.idCliente > 0);
	}

	public getLoggedUser (): ICliente | null {
		const token = this.localStorage.get(LocalStorageKey.USER);
		try {
			return (token ? jwtDecode(token) : null) as ICliente;
		} catch (error) {
			return null;
		}
	}
}
