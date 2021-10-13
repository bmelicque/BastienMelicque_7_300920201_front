import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = () => {
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
                    <li onClick={handleModals} id='signup' className={signUpModal && 'nav-link--active'}>S'inscrire</li>
                    <li onClick={handleModals} id='login' className={logInModal && 'nav-link--active'}>Se connecter</li>
                </ul>
            </nav>
            {signUpModal && <Signup />}
            {logInModal && <Login />}
        </div>
    )
}

export default Auth;