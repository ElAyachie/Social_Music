import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './welcome.scss';

// The page the viewer sees after logging in (in progress)
function Welcome() {
    const user = localStorage.getItem("user");
    let authed = false;

    if (user !== undefined && user !== null) {
      authed = true;
    }
    else {
      authed = false;
    }

    return !authed ?
        <div id="welcome" className="container">
            <h1 className="welcome-title">Social Music</h1>

            <p className="welcome-text">
                Welcome to Social Music! 
                <br />
                Please use the button below to sign-up.
            </p>
            <Link to="/login">
                <button className="sign-up-btn">
                    Login!
                </button>
            </Link>
        </div>
        : <Redirect to="/login" />
}

export default Welcome;