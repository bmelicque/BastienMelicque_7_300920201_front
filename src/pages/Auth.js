import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = props => {
    const { handleLogin } = props;
    const [signUpModal, setSignupModal] = useState(false);
    const [logInModal, setLogInModal] = useState(true);

    const handleModals = e => {
        if (e.target.id === 'signup') {
            setSignupModal(true);
            setLogInModal(false);
        } else if (e.target.id === 'login') {
            setLogInModal(true);
            setSignupModal(false);
        }
    }

    return (
        <div className="auth">
            <nav>
                <ul>
                    <li onClick={handleModals} id='signup' className={signUpModal ? 'nav-link--active' : null}>S'inscrire</li>
                    <li onClick={handleModals} id='login' className={logInModal ? 'nav-link--active' : null}>Se connecter</li>
                </ul>
            </nav>
            {signUpModal && <Signup handleLogin={handleLogin} />}
            {logInModal && <Login handleLogin={handleLogin} />}
        </div>
    )
}

export default Auth;