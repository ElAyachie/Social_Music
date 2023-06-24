import React, { useState } from 'react';
import axios from 'axios';
import './login.scss';

//import Login from './Login';

import api from '../../config/api';

function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async e => {
        if((email.length || username.length || name.length || password.length) <= 0) {
            alert("Fields cannot be empty");
            return;
        }
        else {
            var payload = {
                username: username,
                email: email,
                name: name,
                password: password
            }
            axios.post(api.base_url + "/users/insert", payload)
                .then((response) => {
                    if(response.data.code === 200) {
                        console.log("Registration Successful");
                        alert("Successful Register");
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    alert(error);
                })
        }
    };

    return(
        <div className="login-form">
            <div className="container form-box">
                <h5>Create new account</h5>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <input
                            type="text"
                            autoComplete="on"
                            className="form-control"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            name="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            autoComplete="on"
                            className="form-control"
                            id="username"
                            required
                            value={username}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                            name="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            autoComplete="on"
                            className="form-control"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            name="name"
                            placeholder="Name"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-success loginBtn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;