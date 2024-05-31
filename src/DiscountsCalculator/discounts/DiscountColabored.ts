import { Discount } from './Discount';

import { applyDiscount } from '../../helper/applyDiscount';

export class DiscountColabored extends Discount {
    calculateDiscount(
        value: number,
        isFisrtOffender?: boolean,
        confessed?: boolean,
        colabored?: boolean
    ): number | undefined {
        if (colabored) {
            return applyDiscount(10, value);
        }

        return this.nextDiscount?.calculateDiscount(
            value,
            isFisrtOffender,
            confessed,
            colabored
        );
    }

}