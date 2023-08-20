import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { I_Filter_Slice_State, SortPropertyEnum, T_Sort } from './types';

const initialState: I_Filter_Slice_State = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	itemsStartDiaposon: 0,
	sort: {
		name: 'популярности',
		sortProperty: SortPropertyEnum.RATING_ASC,
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, { payload }: PayloadAction<number>) {
			state.categoryId = payload;
		},
		setSearchValue(state, { payload }: PayloadAction<string>) {
			state.searchValue = payload;
		},
		setSort(state, { payload }: PayloadAction<T_Sort>) {
			state.sort = payload;
		},
		setCurrentPage(state, { payload }: PayloadAction<number>) {
			state.currentPage = payload;
			if (state.currentPage * 4 - 4) {
				state.itemsStartDiaposon = state.currentPage * 4 - 4;
			} else {
				state.itemsStartDiaposon = 1;
			}
		},

		//! FIX type
		setFilters(state, { payload }: PayloadAction<I_Filter_Slice_State>) {
			state.sort = payload.sort;
			state.currentPage = payload.currentPage;
			state.categoryId = payload.categoryId;
		},
	},
});

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
