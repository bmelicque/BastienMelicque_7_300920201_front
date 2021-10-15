import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { getPosts } from "./utils/axiosServices";

function App() {
	const [data, setData] = useState([]);

	useEffect(async () => {
		setData(await getPosts());
	}, []);

	return (
		<div className="App">
			{!data.length && <Auth />}
			{!!data.length && <Home postList={data} />}
		</div>
	);
}

export default App;
