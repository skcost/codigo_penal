import { Discount } from './Discount';

import { applyDiscount } from '../../helper/applyDiscount';

export class DiscountIsFirstOffender extends Discount {
    calculateDiscount(
        value: number,
        isFisrtOffender?: boolean,
        confessed?: boolean,
        colabored?: boolean
    ): number | undefined {
        if (isFisrtOffender) {
            return applyDiscount(50, value);
        }

        return this.nextDiscount?.calculateDiscount(
            value,
            isFisrtOffender,
            confessed,
            colabored
        );
    }

}