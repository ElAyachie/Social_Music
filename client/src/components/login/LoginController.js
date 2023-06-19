import React, { /*useEffect,*/ useState } from 'react';
import './login.scss';

import LoginScreen from './LoginScreen';

const LoginController = () => {
    const [loginPage] = useState([]);

    if (loginPage.length === 0)
    {
        loginPage.push(<LoginScreen appContext={this} />);
    }

    return (
        <div className="loginController">
            {loginPage}
        </div>
    );
}

export default LoginController;
