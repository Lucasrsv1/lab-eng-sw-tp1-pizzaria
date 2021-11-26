import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { BlockUIModule } from "ng-block-ui";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { HeaderComponent } from "./header/header.component";
import { VisualValidatorComponent } from "./visual-validator/visual-validator.component";

@NgModule({
	declarations: [
		HeaderComponent,
		VisualValidatorComponent
	],
	imports: [
		BrowserModule,
		RouterModule,
		BlockUIModule.forRoot(),
		CollapseModule.forRoot(),
		BrowserAnimationsModule,
		FontAwesomeModule
	],
	exports: [
		HeaderComponent,
		VisualValidatorComponent
	]
})
export class ComponentsModule { }
