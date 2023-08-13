import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { I_CaertSlice, T_CartItems } from './types';

import { getCatr_LS } from '../../utils/getCart_LS';
import { calc_Items, calc_Price } from '../../utils/Calc';

const cartData = getCatr_LS();

const initialState: I_CaertSlice = {
	totalItems: cartData.totalItems,
	totalPrice: cartData.totalPrice,
	items: cartData.items,
};

//! Доделать функции удаления, прибавления и отбавления товара для корректного отображения общего количества товаров в карзине!
//* Вроде все работает теперь...

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, { payload }: PayloadAction<T_CartItems>) {
			const findItem = state.items.find((obj) => obj.id === payload.id);
			state.totalItems++;

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...payload,
					count: 1,
				});
			}

			state.totalPrice = calc_Price(state.items);
		},
		plusItem(state, { payload }: PayloadAction<T_CartItems>) {
			const findItem = state.items.find((obj) => obj.id === payload.id);

			if (findItem) {
				findItem.count++;
			}
			state.totalPrice = calc_Price(state.items);
			state.totalItems = calc_Items(state.items);
		},
		minusItem(state, { payload }: PayloadAction<T_CartItems>) {
			const findItem = state.items.find((obj) => obj.id === payload.id);

			if (findItem) {
				if (findItem.count !== 1) {
					findItem.count--;
				}
			}
			state.totalPrice = calc_Price(state.items);
			state.totalItems = calc_Items(state.items);
		},
		removeItem(state, { payload }: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== payload);

			state.totalPrice = calc_Price(state.items);
			state.totalItems = calc_Items(state.items);
		},
		clearItems(state) {
			state.totalItems = 0;
			state.totalPrice = 0;
			state.items = [];
		},
	},
});

export const { addItem, removeItem, clearItems, plusItem, minusItem } =
	cartSlice.actions;

export default cartSlice.reducer;
