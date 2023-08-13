import { T_CartItems } from '../redux/cart/types';

export const calc_Items = (items: T_CartItems[]) => {
	return items.reduce((acc, val) => {
		return val.count + acc;
	}, 0);
};

export const calc_Price = (items: T_CartItems[]) => {
	return items.reduce((acc, val) => {
		return val.price * val.count + acc;
	}, 0);
};
