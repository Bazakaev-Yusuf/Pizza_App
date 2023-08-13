import { useEffect, useState } from 'react';

import './test.scss';

function Test() {
	const [stl, setStl] = useState({
		x: 50,
		y: 50,
	});

	const mouseMove = (e) => {
		setStl({
			x: (e.clientX * 100) / window.innerWidth + '%',
			y: (e.clientY * 100) / window.innerHeight + '%',
		});
		console.log(e.clientX);
	};

	useEffect(() => {
		const mouseMove = (e) => {
			setStl({
				x: (e.clientX * 100) / window.innerWidth + '%',
				y: (e.clientY * 100) / window.innerHeight + '%',
			});
		};

		document.addEventListener('mousemove', mouseMove);

		return () => {
			document.removeEventListener('mousemove', mouseMove);
		};
	}, []);

	return (
		<div
			className='container'
			id='eye'>
			<div className='eyes-block'>
				<div className='eyes'>
					<div
						className='eyes__inner'
						style={{
							left: stl.x,
							top: stl.y,
							transform: `translate('-${stl.x}, "-"${stl.y}})`,
						}}></div>
				</div>
			</div>
		</div>
	);
}

export default Test;
