import React, { Component } from 'react';
import './login.scss';

import Login from './Login';
import Register from './Register';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.onButtonSubmit = this.onButtonSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            loginscreen: [],
            loginmessage: '',
            buttonLabel: 'Register',
            isLogin: true
        }
    }

    componentDidMount() {
        var loginscreen = [];
        loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} />);
        var loginmessage = "Not registered yet? Register Now";
        this.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage
        });
    }

    onButtonSubmit() {
        var loginmessage;
        var loginscreen;
        if(this.state.isLogin) {
            loginscreen = [];
            loginscreen.push(<Register parentContext={this} appContext={this.props.appContext} key="register"/>);
            loginmessage = "Already registered? Go to Login.";
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                buttonLabel: "Login",
                isLogin: false
            });
        }
        else {
            loginscreen = [];
            loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} key="login"/>);
            loginmessage = "Not Registered yet? Go to registration.";
            this.setState({
                loginscreen: loginscreen,
                loginmessage: loginmessage,
                buttonLabel: "Register",
                isLogin: true
            });
        }
    }

    render() {
        return(
            <div className="loginScreen">
                {this.state.loginscreen}
                <div className="container">
                    <br />
                    {this.state.loginmessage}
                    <br /><br />
                    <button className="btn btn-success loginScreenBtn" label={this.state.buttonLabel} onClick={this.onButtonSubmit}>
                        {this.state.buttonLabel}
                    </button>
                </div>
            </div>
        );
    }
}
