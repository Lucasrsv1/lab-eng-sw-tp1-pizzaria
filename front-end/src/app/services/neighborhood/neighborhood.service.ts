import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { IBairro } from "src/app/interfaces/bairro";

import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class NeighborhoodService {
	constructor (private http: HttpClient) { }

	public getNeighborhoods (): Observable<IBairro[]> {
		return this.http.get<IBairro[]>(`${environment.API_URL}/v1/bairros`);
	}
}
