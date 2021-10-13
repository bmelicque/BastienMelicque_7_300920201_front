import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Auth from "./pages/Auth";

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const token = document.cookie.split('=')[1];

		axios.get(`${process.env.REACT_APP_API_URL}api/posts`, {
			headers: {Authorization: `Bearer ${token}`}
		})
			.then(res => {
				console.log([...res.data.posts]);
				console.log(data);
				setData([...res.data.posts]);
				console.log([...res.data.posts]);
				console.log(data);
			})
			.catch(err => console.log(err))
	}, []);

	return (
		<div className="App">
			{!data.length && <Auth />}
		</div>
	);
}

export default App;
