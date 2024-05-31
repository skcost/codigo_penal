export const applyDiscount = (percetange: number, value: number): number => {
    const discount = value * (percetange / 100);

    return value - discount;
}