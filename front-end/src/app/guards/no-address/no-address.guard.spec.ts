import { TestBed } from "@angular/core/testing";

import { NoAddressGuard } from "./no-address.guard";

describe("NoAddressGuard", () => {
	let guard: NoAddressGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(NoAddressGuard);
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});
});
