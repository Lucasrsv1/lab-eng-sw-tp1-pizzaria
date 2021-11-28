import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { BlockUI, NgBlockUI } from "ng-block-ui";

import { IValidations } from "src/app/components/visual-validator/visual-validator.component";

import { IBairro } from "src/app/interfaces/bairro";
import { IEndereco } from "src/app/interfaces/endereco";

import { AddressService } from "src/app/services/address/address.service";
import { AlertsService } from "src/app/services/alerts/alerts.service";
import { NeighborhoodService } from "src/app/services/neighborhood/neighborhood.service";

@Component({
	selector: "app-endereco",
	templateUrl: "./endereco.component.html",
	styleUrls: ["./endereco.component.scss"]
})
export class EnderecoComponent implements OnInit {
	@BlockUI()
	private blockUI?: NgBlockUI;

	@ViewChild("ruaInput")
	private ruaInput?: ElementRef;

	public form: FormGroup;
	public validations: IValidations;

	public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
	public neighborhoods: IBairro[] = [];

	constructor (
		private formBuilder: FormBuilder,
		private router: Router,
		private addressService: AddressService,
		private alertsService: AlertsService,
		private neighborhoodService: NeighborhoodService
	) {
		this.form = this.formBuilder.group({
			rua: ["", Validators.required],
			numero: ["", Validators.required],
			cep: ["", [Validators.required, this.invalidCEP]],
			bairro: ["", Validators.required],
			apartamento: [false]
		});

		this.validations = {
			form: this.form,
			fields: {
				rua: [{ key: "required" }],
				numero: [{ key: "required" }],
				cep: [
					{ key: "required" },
					{ key: "failedCEP" }
				],
				bairro: [{ key: "required" }]
			}
		};
	}

	public ngOnInit (): void {
		this.neighborhoodService.getNeighborhoods().subscribe(
			neighborhoods => this.neighborhoods = neighborhoods,
			(error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Erro ao Obter Bairros",
					"Não foi possível realizar o consulta no servidor, tente novamente.",
					error
				);
			}
		);

		this.alertsService.show(
			"Bem-vindo à Pizzaria BH",
			"Por favor, faça o cadastro do seu endereço de entrega para poder realizar pedidos na nossa pizzaria."
		);
	}

	public get neighborhoodTitle (): string {
		const value = this.form.get("bairro")?.value;
		const selected = this.neighborhoods.find(n => n.idBairro == value);
		return (selected && selected.nome) || "Selecione um bairro";
	}

	public save (): void {
		if (this.form.invalid)
			return this.alertsService.show("Atenção", "O preenchimento do formulário não é válido.", "error");

		const endereco: IEndereco = {
			rua: this.form.get("rua")?.value,
			numero: this.form.get("numero")?.value,
			cep: this.form.get("cep")?.value,
			idBairro: this.form.get("bairro")?.value,
			apartamento: this.form.get("apartamento")?.value
		};

		this.blockUI?.start("Salvando endereço...");
		this.addressService.saveAddress(endereco).subscribe(
			_ => {
				this.blockUI?.stop();
				this.router.navigate([""]);
			},
			(error: HttpErrorResponse) => {
				this.blockUI?.stop();
				this.alertsService.httpErrorAlert(
					"Erro ao Cadastrar Endereço",
					"Não foi possível realizar o cadastro, tente novamente.",
					error
				);
			}
		);
	}

	public clear (): void {
		this.form.reset();
		this.form.get("apartamento")?.setValue(false);
		if (this.ruaInput)
			this.ruaInput.nativeElement.focus();
	}

	private invalidCEP (control: AbstractControl): { "failedCEP": boolean } | null {
		if (control.value && control.value.indexOf("_") !== -1)
			return { failedCEP: true };

		return null;
	}
}
