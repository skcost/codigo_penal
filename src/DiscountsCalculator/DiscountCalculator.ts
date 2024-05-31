import { DiscountIsFirstOffenderAndConfessed } from './discounts/DiscountIsFirstOffenderAndConfessed';
import { WithoutDiscount } from './discounts/WithoutDiscount';
import { DiscountIsFirstOffender } from './discounts/DiscountIsFirstOffender';
import { DiscountConfessed } from './discounts/DiscountConfessed';
import { DiscountColabored } from './discounts/DiscountColabored';
import { DiscountIsFirstOffenderAndColabored } from './discounts/DiscountIsFirstOffenderAndColabored';
import {
    DiscountIsFirstOffenderAndConfessedAndColabored
} from './discounts/DiscountIsFirstOffenderAndConfessedAndColabored';

export class DiscountCalculator {
    calculateDiscount(
        value: number,
        isFisrtOffender?: boolean,
        confessed?: boolean,
        colabored?: boolean
    ): number | undefined {
        const discountChain = new DiscountIsFirstOffenderAndConfessedAndColabored(
            new DiscountIsFirstOffenderAndConfessed(
                new DiscountIsFirstOffenderAndColabored(
                    new DiscountConfessed(
                        new DiscountColabored(
                            new DiscountIsFirstOffender(
                                new WithoutDiscount()
                            )
                        )
                    )
                )
            )
        );

        return discountChain.calculateDiscount(
            value,
            isFisrtOffender,
            confessed,
            colabored
        );
    }
}