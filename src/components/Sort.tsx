import { FC, memo, useRef, useState, useEffect } from 'react';

import { useAppDispatch } from '../redux/store';
import { setSort } from '../redux/filter/slice';
import { T_Sort, SortPropertyEnum } from '../redux/filter/types';

type T_Sort_Comp = {
	value: T_Sort;
};

type TypePopUp = MouseEvent & {
	target: Node;
};

export const list: T_Sort[] = [
	{ name: 'популярности (Макс.)', sortProperty: SortPropertyEnum.RATING_ASC },
	{ name: 'популярности (Мин.)', sortProperty: SortPropertyEnum.RATING_DESC },
	{ name: 'цене (Макс.)', sortProperty: SortPropertyEnum.PRICE_ASC },
	{ name: 'цене (Мин.)', sortProperty: SortPropertyEnum.PRICE_DESC },
	{ name: 'алфавиту (Макс.)', sortProperty: SortPropertyEnum.TITLE_ASC },
	{ name: 'алфавиту (Мин.)', sortProperty: SortPropertyEnum.TITLE_DESC },
];

const Sort: FC<T_Sort_Comp> = memo(({ value }) => {
	const dispatch = useAppDispatch();

	const [open, setOpen] = useState(false);

	const sortRef = useRef<HTMLDivElement>(null);

	//! FIX type
	const sortListVisible = (obj: T_Sort) => {
		dispatch(setSort(obj));
		setOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const _event = event as TypePopUp;

			if (sortRef.current && !sortRef.current.contains(_event.target)) {
				setOpen(false);
			}
		};
		// слушатель события на body для отслеживания был ли клик на компоненте Sort
		document.body.addEventListener('click', handleClickOutside);

		// удаления слушателя событий чтобы он не добавлялся если компонент закрыт
		return () =>
			document.body.removeEventListener('click', handleClickOutside);
	}, [open]);

	return (
		<div
			ref={sortRef}
			className='sort'>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{value.name}</span>
			</div>
			{open && (
				<div className='sort__popup'>
					<ul>
						{list.map((obj, idx) => (
							<li
								key={idx}
								onClick={() => sortListVisible(obj)}
								className={
									value.sortProperty === obj.sortProperty
										? 'active'
										: ''
								}>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
});

export default Sort;
