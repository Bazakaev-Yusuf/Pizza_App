import { FC, Suspense, lazy } from 'react';

import Home from './pages/Home';
// import NotFound from './pages/NotFound';
// import Cart from './pages/Cart';
// import FullSizePizza from './pages/FullSizePizza';
// import MainLayout from './layout/MainLayout';

import { Route, Routes } from 'react-router-dom';

import fallbackImg from './assets/img/not_found_pizza.png';

import './scss/app.scss';

const Cart = lazy(() => import(/* webpackChunkName: 'Cart' */ './pages/Cart'));
const FullSizePizza = lazy(
	() =>
		import(/* webpackChunkName: 'FullSizePizza' */ './pages/FullSizePizza'),
);
const MainLayout = lazy(
	() => import(/* webpackChunkName: 'MainLayout' */ './layout/MainLayout'),
);
const NotFound = lazy(
	() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'),
);

const App: FC = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Suspense>
						<MainLayout />
					</Suspense>
				}>
				<Route
					path=''
					element={<Home />}
				/>
				<Route
					path='cart'
					element={
						<Suspense
							fallback={
								<img
									src={fallbackImg}
									className='fallback-img'
								/>
							}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path='pizza/:id'
					element={
						<Suspense>
							<FullSizePizza />
						</Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<Suspense>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
};

export default App;
