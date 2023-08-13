import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { I_PizzaState, Status, T_Pizza } from './types';
import { fetchPizzas } from './asyncActions';
import { getCatr_LS } from '../../utils/getCart_LS';

//Record если все ключи и эл-ты идентичны (Ключ-Значение)
// type T_Fetch_Arguments = Record<string, string>;

const initialState: I_PizzaState = {
	items: getCatr_LS().items,
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, { payload }: PayloadAction<T_Pizza[]>) {
			state.items = payload;
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});

		builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
			state.items = payload;
			state.status = Status.SUCCESS;
		});

		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},

	//* Reux RTK предупреждал что данный способ будет удален в версии 2.0 и он считается утаревшим/устаривающим
	// {
	// 	[fetchPizzas.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},

	// 	[fetchPizzas.fulfilled]: (state, { payload }) => {
	// 		state.items = payload;
	// 		state.status = 'success';
	// 	},

	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	},
	// },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
