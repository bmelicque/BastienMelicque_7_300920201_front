import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { getPosts, login } from "./utils/axiosServices";

function App() {
	const [data, setData] = useState([]);
	const [isLogged, setIsLogged] = useState(false);

	const handleLogin = async (email, password) => {
		const error = await login(email, password) || null;

		if (!error) {
			setIsLogged(true);
			setData(await getPosts());
		}

		return error;
	}

	useEffect(async () => {
		const posts = await getPosts();
		setData(posts);
		if (posts.length) setIsLogged(true);
	}, []);

	return (
		<div className="App">
			{!isLogged && <Auth handleLogin={handleLogin} />}
			{!!isLogged && <Home postList={data} />}
		</div>
	);
}

export default App;
