export type T_CartItems = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	count: number;
	type: string;
	size: number;
};

export interface I_CaertSlice {
	totalItems: number;
	totalPrice: number;
	items: T_CartItems[];
}
