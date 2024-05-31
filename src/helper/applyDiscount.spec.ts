import { applyDiscount } from './applyDiscount';

describe("should calculate discounts", () => {
	test("should calculate discount 10% of 20000", () => {
		const calculatedValue = applyDiscount(10, 20000);
		expect(calculatedValue).toEqual(18000);
	});
});