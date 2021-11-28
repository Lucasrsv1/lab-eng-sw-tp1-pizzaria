import { Component, Input, OnChanges } from "@angular/core";

import { IItem, TipoItem } from "src/app/interfaces/item";

@Component({
	selector: "app-menu-item",
	templateUrl: "./menu-item.component.html",
	styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent implements OnChanges {
	@Input()
	public item?: IItem;

	public imgClass: string = "";

	constructor () { }

	public ngOnChanges (): void {
		if (this.item?.tipo === TipoItem.BEBIDA)
			this.imgClass = "drink";
		else
			this.imgClass = `p${1 + Math.floor(Math.random() * 6)}`;
	}
}
