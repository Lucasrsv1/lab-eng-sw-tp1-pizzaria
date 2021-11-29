import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { BlockUIModule } from "ng-block-ui";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { CartItemComponent } from "./cart-item/cart-item.component";
import { HeaderComponent } from "./header/header.component";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { VisualValidatorComponent } from "./visual-validator/visual-validator.component";

import { PipesModule } from "../pipes/pipes.module";

@NgModule({
	declarations: [
		CartItemComponent,
		HeaderComponent,
		MenuItemComponent,
		VisualValidatorComponent
	],
	imports: [
		BrowserModule,
		RouterModule,
		BlockUIModule.forRoot(),
		CollapseModule.forRoot(),
		BrowserAnimationsModule,
		FontAwesomeModule,
		PipesModule
	],
	exports: [
		CartItemComponent,
		HeaderComponent,
		MenuItemComponent,
		VisualValidatorComponent
	]
})
export class ComponentsModule { }
