import { Provider } from "Providers/provider";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default ({ Component, pageProps }) => {
	return (
		<Provider>
			<Component { ...pageProps } />
		</Provider>
	);
}