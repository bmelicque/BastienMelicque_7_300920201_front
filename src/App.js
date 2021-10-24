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
			const posts = await getPosts();
			setData(posts);
		}

		return error;
	}

	const handleLogout = () => {
		document.cookie = 'token= ; max-age= 0';
        document.cookie = 'userId= ; max-age= 0';
        document.cookie = 'userRole= ; max-age= 0';

		setIsLogged(false);
		setData([]);
	}

	useEffect(async () => {
		try {
			const posts = await getPosts();
			setData(posts);
			if (posts.length) setIsLogged(true);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div className="App">
			{(!isLogged || !data.length)&& <Auth handleLogin={handleLogin} />}
			{!!isLogged && !!data.length && <Home postList={data} handleLogout={handleLogout} />}
		</div>
	);
}

export default App;
