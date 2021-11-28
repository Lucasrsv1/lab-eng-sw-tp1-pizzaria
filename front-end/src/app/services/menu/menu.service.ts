import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

import { IItem } from "src/app/interfaces/item";

@Injectable({ providedIn: "root" })
export class MenuService {
	constructor (private http: HttpClient) { }

	public getMenu (): Observable<IItem[]> {
		return this.http.get<IItem[]>(`${environment.API_URL}/v1/cardapio`);
	}
}
