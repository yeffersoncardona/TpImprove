import Document, { Html, Head, Main, NextScript } from "next/document";
import { Title } from 'config';

export default class MyDocument extends Document {
	render() {
		return(
			<Html>
				<Head>
					<base href="./" />
					<link rel="shortcut icon" href="/static/favicon.ico" />
					
					<link rel="stylesheet" href="/static/assets/style.css" />
				</Head>
				<body style={{ padding: 0, margin: 0 }} >
					<Main />
					<NextScript />

					<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
					<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
				</body>
			</Html>
		);
	}
}