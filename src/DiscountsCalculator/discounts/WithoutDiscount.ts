import { Discount } from './Discount';

export class WithoutDiscount extends Discount{
    constructor() {
        super(undefined);
    }

    calculateDiscount(
        value: number,
        isFisrtOffender?: boolean,
        confessed?: boolean,
        colabored?: boolean
    ): number | undefined {
        return value;
    }
}