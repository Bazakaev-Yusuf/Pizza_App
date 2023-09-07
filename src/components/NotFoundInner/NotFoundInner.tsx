import { FC } from 'react';

import error_404 from '../../assets/img/not_found_pizza.png';

import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFoundInner: FC = () => {
	return (
		<div className={styles.root}>
			<Link to={'/'}>
				<img
					className={styles.error_btn}
					src={error_404}
					alt='error 404'
				/>
			</Link>
			<h1>Ничего не найдено!</h1>
		</div>
	);
};

export default NotFoundInner;
