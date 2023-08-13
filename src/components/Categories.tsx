import { FC, memo } from 'react';

type TypeCategory = {
	value: number;
	onChangeCategory: (argument: number) => void;
};

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories: FC<TypeCategory> = memo(({ value, onChangeCategory }) => {
	return (
		<div className='categories'>
			<ul>
				{categories.map((item, idx: number) => (
					<li
						key={idx}
						onClick={() => onChangeCategory(idx)}
						className={value === idx ? 'active' : ''}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
});

export default Categories;
