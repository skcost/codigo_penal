import { Discount } from './Discount';

import { applyDiscount } from '../../helper/applyDiscount';

export class DiscountIsFirstOffenderAndColabored extends Discount {
    calculateDiscount(
        value: number,
        isFisrtOffender?: boolean,
        confessed?: boolean,
        colabored?: boolean
    ): number | undefined {
        if (isFisrtOffender && colabored) {
            return applyDiscount(60, value);
        }

        return this.nextDiscount?.calculateDiscount(value, isFisrtOffender, confessed, colabored);
    }

}