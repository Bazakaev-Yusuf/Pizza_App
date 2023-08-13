import { calc_Items, calc_Price } from './Calc';

export const getCatr_LS = () => {
	const data = localStorage.getItem('cart');
	const items = data ? JSON.parse(data) : [];
	const totalPrice = calc_Price(items);
	const totalItems = calc_Items(items);

	if (items.length) {
		return {
			items,
			totalPrice,
			totalItems,
		};
	} else {
		return {
			items: [],
			totalItems: 0,
			totalPrice: 0,
		};
	}
};
