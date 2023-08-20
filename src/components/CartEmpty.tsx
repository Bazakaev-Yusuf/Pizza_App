import { FC, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const CartEmpty: FC = () => {
	const navigate = useNavigate();

	const [position, setPosition] = useState({
		x: 50 + '%',
		y: 50 + '%',
	});

	useEffect(() => {
		//! FIX type

		const mouseMove = (e: MouseEvent) => {
			setPosition({
				x: (e.clientX * 100) / window.innerWidth + '%',
				y: (e.clientY * 100) / window.innerHeight + '%',
			});
		};
		document.addEventListener('mousemove', mouseMove);

		return () => {
			document.removeEventListener('mousemove', mouseMove);
		};
	}, []);

	const eyes = [0, 1];

	return (
		<>
			<div className='cart cart--empty'>
				{/* <p>
					Вы не добавили ни одной пиццы в корзину.
					<br />
					Для того, чтобы добавить пиццу, перейди на главную страницу.
				</p> */}

				<h2>
					Press{' '}
					<span
						onClick={() => navigate('/')}
						className='cart--empty__F'>
						F
					</span>{' '}
					to pay respect
				</h2>
				<div className='cart--empty__eye'>
					{eyes.map((i, idx) => {
						return (
							<div
								key={idx}
								className='eye-outside'>
								<div
									className='eye-inner'
									style={{
										left: position.x,
										top: position.y,
										transform: `translate(-${position.x}, -${position.y})`,
									}}></div>
							</div>
						);
					})}
				</div>
				<Link
					to='/'
					className='button button--black'>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</>
	);
};

export default CartEmpty;
