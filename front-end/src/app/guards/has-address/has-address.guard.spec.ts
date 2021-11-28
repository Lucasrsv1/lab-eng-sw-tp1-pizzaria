import { TestBed } from "@angular/core/testing";

import { HasAddressGuard } from "./has-address.guard";

describe("HasAddressGuard", () => {
	let guard: HasAddressGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(HasAddressGuard);
	});

	it("should be created", () => {
		expect(guard).toBeTruthy();
	});
});
