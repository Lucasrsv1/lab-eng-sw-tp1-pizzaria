import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";

import { AddressService } from "src/app/services/address/address.service";

@Injectable({ providedIn: "root" })
export class HasAddressGuard implements CanActivate {
	constructor (
		private readonly router: Router,
		private addressService: AddressService
	) { }

	public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return new Observable(subscriber => {
			this.addressService.isClientAddressValid().then(isValid => {
				if (!isValid) {
					this.router.navigate(["endereco"]);
					subscriber.next(false);
					return subscriber.complete();
				}

				subscriber.next(true);
				subscriber.complete();
			});
		});
	}
}
