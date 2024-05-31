import { Discount } from './Discount';

import { applyDiscount } from '../../helper/applyDiscount';

export class DiscountConfessed extends Discount {
    calculateDiscount(
        value: number,
        isFisrtOffender?: boolean,
        confessed?: boolean,
        colabored?: boolean
    ): number | undefined {
        if (confessed) {
            return applyDiscount(30, value);
        }

        return this.nextDiscount?.calculateDiscount(
            value,
            isFisrtOffender,
            confessed,
            colabored
        );
    }

}