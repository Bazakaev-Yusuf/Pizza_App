export type T_Search_Pizza_Params = {
	sortProperty: string;
	order: string;
	categoryId: string;
	search: string;
	currentPage: string;
};

export type T_Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface I_PizzaState {
	items: T_Pizza[];
	status: Status;
}
