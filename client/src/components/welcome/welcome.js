import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './welcome.scss';

// The page the viewer sees after logging in (in progress)
export default class Welcome extends Component {
    render() {
        return(
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
        );
    }
}