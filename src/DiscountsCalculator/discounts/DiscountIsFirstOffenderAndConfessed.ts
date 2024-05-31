import { Discount } from './Discount';

import { applyDiscount } from '../../helper/applyDiscount';

export class DiscountIsFirstOffenderAndConfessed extends Discount {
    calculateDiscount(
        value: number,
        isFisrtOffender?: boolean,
        confessed?: boolean,
        colabored?: boolean
    ): number | undefined {
        if (isFisrtOffender && confessed) {
            return applyDiscount(80, value);
        }

        return this.nextDiscount?.calculateDiscount(value, isFisrtOffender, confessed, colabored);
    }

}