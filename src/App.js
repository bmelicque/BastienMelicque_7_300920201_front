import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { getPosts, login } from "./utils/axiosServices";

function App() {
	const [data, setData] = useState([]);
	const [isLogged, setIsLogged] = useState(undefined);

	const handleLogin = async (email, password) => {
		try {
			await login(email, password);
			const posts = await getPosts();
			await setIsLogged(true);
			await setData(posts);
		} catch (error) {
			return error
		}
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
			await setData(posts);
			setIsLogged(true);
		} catch (error) {
			console.log(error);
			setIsLogged(false);
		}
	}, []);

	return (
		<Router >
			<div className="App">
				<Switch >
					<Route exact path="/auth">
						{isLogged ?
							<Redirect to="/" /> :
							<Auth handleLogin={handleLogin} />
						}
					</Route>
					<Route path="/" >
						{isLogged ?
							<Home postList={data} handleLogout={handleLogout} />
							: <Redirect to="/auth" />
						}
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
