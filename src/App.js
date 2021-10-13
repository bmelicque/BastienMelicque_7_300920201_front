import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Thread from "./pages/Thread";

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const token = document.cookie.split('=')[1];

		axios.get(`${process.env.REACT_APP_API_URL}api/posts`, {
			headers: {Authorization: `Bearer ${token}`}
		})
			.then(res => setData([...res.data.posts]))
			.catch(err => console.log(err))
	}, []);

	return (
		<div className="App">
			{!data.length && <Auth />}
			{data.length && <Home postList={data} />}
		</div>
	);
}

export default App;
