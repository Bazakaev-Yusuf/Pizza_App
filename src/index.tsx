import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { store } from './redux/store';

import App from './App';
import Test from './Test';

const rootElement = document.getElementById('root');

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		// <Test />,
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>,
	);
}
