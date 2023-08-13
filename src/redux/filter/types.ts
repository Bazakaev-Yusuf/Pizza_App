export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}

export type T_Sort = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export interface I_Filter_Slice_State {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: T_Sort;
}
