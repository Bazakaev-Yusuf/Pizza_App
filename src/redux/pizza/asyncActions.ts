import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { T_Pizza, T_Search_Pizza_Params } from './types';

export const fetchPizzas = createAsyncThunk<T_Pizza[], T_Search_Pizza_Params>(
	'pizza/fetchPizzas',
	async (params) => {
		const { order, sortProperty, categoryId, search, currentPage } = params;

		const { data } = await axios.get<T_Pizza[]>(
			`https://646a742d70b2302c85e5e9d1.mockapi.io/Pizzas_list`,
			{
				params: {
					// page: currentPage,
					// limit: 4,
					category: categoryId,
					sortBy: sortProperty,
					order,
					// search,
				},
			},
		);

		return data;
	},
);
