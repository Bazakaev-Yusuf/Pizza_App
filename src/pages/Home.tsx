import { useRef, useEffect, useCallback, FC } from 'react';

import qs from 'qs';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/Cart/Skeleton';
import PizzaBlock from '../components/Cart/PizzaBlock';
import Pagination from '../components/Pagination';

import { list } from '../components/Sort';
import NotFoundInner from '../components/NotFoundInner/NotFoundInner';
import { selectFilter } from '../redux/filter/selectors';

import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/filter/slice';

import { fetchPizzas } from '../redux/pizza/asyncActions';
import { T_Search_Pizza_Params } from '../redux/pizza/types';
import { selectPizza } from '../redux/pizza/selectors';

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);

	const { items, status } = useSelector(selectPizza);

	const onChangeCategory = useCallback(
		(idx: number) => {
			dispatch(setCategoryId(idx));
		},
		[dispatch],
	);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = useCallback(() => {
		const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

		const sortBy = sort.sortProperty.replace('-', '');

		const category = categoryId > 0 ? String(categoryId) : '';

		const search = searchValue;

		dispatch(
			fetchPizzas({
				sortProperty: sortBy,
				order,
				categoryId: category,
				search,
				currentPage: String(currentPage),
			}),
		);
		// eslint-disable-next-line
	}, [sort.sortProperty, categoryId, dispatch]);

	useEffect(() => {
		if (isMounted.current) {
			const querySrting = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${querySrting}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage, navigate, dispatch]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1),
			) as T_Search_Pizza_Params;
			const sort = list.find(
				(obj) => obj.sortProperty === params.sortProperty,
			);

			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.categoryId),
					currentPage: Number(params.currentPage),
					sort: sort ? sort : list[0],
				}),
			);
			isSearch.current = true;
		}
	}, [categoryId, sort, searchValue, dispatch]);

	useEffect(() => {
		getPizzas();

		isSearch.current = false;
	}, [getPizzas]);

	//! FIX type

	const pizzas = items.map((obj: any) => (
		<PizzaBlock
			key={obj.id}
			{...obj}
		/>
	));

	// eslint-disable-next-line
	const pizzasForPage = pizzas.filter(
		(i, idx) => idx >= currentPage * 4 - 4 && idx < currentPage * 4,
	);

	const filteredPizza = items
		.filter((obj) => {
			if (
				searchValue &&
				obj.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
			) {
				return true;
			}

			return false;
		})
		.map((obj: any) => (
			<PizzaBlock
				key={obj.id}
				{...obj}
			/>
		));

	const skeleton = [...new Array(4)].map((_, idx) => <Skeleton key={idx} />);

	const pageCount = categoryId > 0 ? 0 : 4;

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={onChangeCategory}
				/>
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div
				className={
					searchValue.length && !filteredPizza.length
						? 'content__items--not_found'
						: 'content__items'
				}>
				{status === 'loading' ? (
					skeleton
				) : searchValue.length && !filteredPizza.length ? (
					<NotFoundInner />
				) : !searchValue ? (
					pizzasForPage
				) : (
					filteredPizza
				)}
			</div>
			{pageCount > 1 && !searchValue && (
				<Pagination
					pageCount={pageCount}
					currentPage={currentPage}
					onChangePage={onChangePage}
				/>
			)}
		</div>
	);
};

export default Home;
