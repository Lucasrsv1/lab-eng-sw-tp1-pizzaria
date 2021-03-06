import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import Swal, { SweetAlertIcon, SweetAlertInput, SweetAlertResult } from "sweetalert2";

@Injectable({ providedIn: "root" })
export class AlertsService {
	constructor () { }

	public show (title: string, html: string, icon: SweetAlertIcon = "info"): void {
		Swal.fire({
			icon,
			buttonsStyling: false,
			customClass: { confirmButton: "btn btn-primary btn-lg" },
			title,
			html
		});
	}

	public confirm (
		text: string,
		title: string = "Confirmação",
		cancelButtonText: string = "Cancelar",
		danger: boolean = false
	): Promise<boolean> {
		return new Promise(resolve => {
			Swal.fire({
				icon: "question",
				title,
				text,
				confirmButtonColor: danger ? "#DC3545" : "#DA680B",
				confirmButtonText: "SIM",
				showCancelButton: true,
				cancelButtonText
			}).then((result: SweetAlertResult) => {
				resolve(Boolean(result.value));
			});
		});
	}

	public prompt (
		title: string,
		text: string = "",
		inputType: SweetAlertInput = "text",
		inputAttributes: Record<string, string> = {},
		inputValue: string | number | boolean | undefined = undefined
	): Promise<string | undefined> {
		return new Promise(resolve => {
			Swal.fire({
				icon: "question",
				title,
				text,
				confirmButtonColor: "#DA680B",
				input: inputType,
				showCancelButton: true,
				inputAttributes,
				inputValue,
				cancelButtonText: "Cancelar"
			}).then((result: SweetAlertResult) => {
				resolve(result.value);
			});
		});
	}

	public httpErrorAlert (title: string, html: string, error: HttpErrorResponse): void {
		let errorMessage = error.message;
		if (error.error && error.error.message)
			errorMessage = error.error.message;
		else if (typeof error.error === "string")
			errorMessage = error.error;

		Swal.fire({
			icon: "error",
			buttonsStyling: false,
			customClass: { confirmButton: "btn btn-primary btn-lg" },
			title,
			html: `${html}<br/>${errorMessage}`
		});
	}
}
