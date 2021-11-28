import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "reais" })
export class ReaisPipe implements PipeTransform {
	public transform (value: unknown): string {
		const numericValue: number = Number(value);
		if (isNaN(numericValue))
			return "R$0,00";

		return `${numericValue < 0 ? "-" : ""}R$${Math.abs(numericValue).toFixed(2).replace(".", ",")}`;
	}
}
