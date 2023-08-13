import { FC } from 'react';

import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

import { T_Pizza } from '../../redux/pizza/types';

//! FIX type
type TypePagination = {
	pageCount: number;

	currentPage: number;
	onChangePage: (page: number) => void;
};

const Pagination: FC<TypePagination> = ({
	pageCount,
	currentPage,
	onChangePage,
}) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel='...'
			previousLabel='<'
			nextLabel='>'
			onPageChange={(e) => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={pageCount}
			forcePage={currentPage - 1}
		/>
	);
};

export default Pagination;
