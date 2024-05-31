import { Discount } from './Discount';

import { applyDiscount } from '../../helper/applyDiscount';

export class DiscountIsFirstOffenderAndConfessedAndColabored extends Discount {
    calculateDiscount(
        value: number,
        isFisrtOffender?: boolean,
        confessed?: boolean,
        colabored?: boolean
    ): number | undefined {
        if (isFisrtOffender && confessed && colabored) {
            return applyDiscount(90, value);
        }

        return this.nextDiscount?.calculateDiscount(value, isFisrtOffender, confessed, colabored);
    }

}