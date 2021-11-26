import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, ElementRef, ViewChild } from "@angular/core";

import { BlockUI, NgBlockUI } from "ng-block-ui";

import { ICliente } from "src/app/interfaces/cliente";

import { AlertsService } from "src/app/services/alerts/alerts.service";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { IValidations } from "src/app/components/visual-validator/visual-validator.component";

@Component({
	selector: "app-cadastro",
	templateUrl: "./cadastro.component.html",
	styleUrls: ["./cadastro.component.scss"]
})
export class CadastroComponent {
	@BlockUI()
	private blockUI?: NgBlockUI;

	@ViewChild("nomeInput")
	private nomeInput?: ElementRef;

	public form: FormGroup;
	public validations: IValidations;

	public cpfMask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];

	constructor (
		private formBuilder: FormBuilder,
		private authenticationService: AuthenticationService,
		private alertsService: AlertsService
	) {
		this.form = this.formBuilder.group({
			nome: ["", Validators.required],
			email: ["", [Validators.required, Validators.email]],
			senha: ["", [Validators.required, Validators.minLength(8)]],
			cpf: ["", [Validators.required, this.invalidCPF]],
			telefone: ["", [Validators.required, this.invalidPhone]]
		});

		this.validations = {
			form: this.form,
			fields: {
				nome: [{ key: "required" }],
				email: [
					{ key: "required" },
					{ key: "email" }
				],
				senha: [
					{ key: "required" },
					{ key: "minlength", message: "A senha deve ter ao menos 8 caracteres." }
				],
				cpf: [
					{ key: "required" },
					{ key: "failedCPF" }
				],
				telefone: [
					{ key: "required" },
					{ key: "failedPhone" }
				]
			}
		};
	}

	public signUp (): void {
		if (this.form.invalid)
			return this.alertsService.show("Atenção", "O preenchimento do formulário não é válido.", "error");

		const cliente: ICliente = {
			nome: this.form.get("nome")?.value,
			email: this.form.get("email")?.value,
			senha: this.form.get("senha")?.value,
			cpf: this.form.get("cpf")?.value,
			telefone: this.form.get("telefone")?.value
		};

		if (this.blockUI)
			this.blockUI.start("Realizando cadastro...");

		this.authenticationService.signUp(cliente, this.blockUI);
	}

	public clear (): void {
		this.form.reset();
		if (this.nomeInput)
			this.nomeInput.nativeElement.focus();
	}

	public telephoneMask (rawValue: string): Array<string | RegExp> {
		rawValue = rawValue.replace(/[()_-\s]/g, "");
		if (rawValue.length <= 10)
			return ["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

		return ["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
	}

	private invalidPhone (control: AbstractControl): { "failedPhone": boolean } | null {
		if (control.value && control.value.indexOf("_") !== -1)
			return { failedPhone: true };

		return null;
	}

	private invalidCPF (control: AbstractControl): { "failedCPF": boolean } | null {
		if (control.value && control.value.indexOf("_") !== -1)
			return { failedCPF: true };

		return null;
	}
}
