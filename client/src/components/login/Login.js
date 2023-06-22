import React, { useEffect, useState } from 'react';
import axios from 'axios';

import LoadMusicInterests from '../../services/local_data/LoadMusicInterests';
import LoadFriendsList from '../../services/local_data/LoadFriendsList';
import LoadUsersList from '../../services/local_data/LoadUsersList';
import getImage from '../profiles/getImage';

import api from '../../config/api';

// User login
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleLogin = async e => {
        e.preventDefault();
        const user = {
            email,
            password
        };
        await axios.post(api.base_url + '/login', user)
            .then(function(response) {
                if(response.data.code === 200) {
                    const userData = {
                        UserID: response.data.userID,
                        Email: response.data.email,
                        Username: response.data.username,
                        Name: response.data.name,
                        Bio: response.data.bio,
                        ProfileImage: getImage(response.data.profileImage)
                    };

                    setUser(response.data.email);
                    localStorage.setItem("user", JSON.stringify(userData));
                    
                    LoadUsersList();
                    LoadMusicInterests();
                    LoadFriendsList();
                    
                    window.location.reload();
                    window.location = "/home";
                }
                else if(response.data.code === 204) {
                    console.log("email or Password do not match our records.");
                    alert("email or Password do not match our records.");
                }
                else {
                    console.log("email does not exist.");
                    alert("email does not exist.");
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    const handleLogout = () => {
        setUser("");
        setEmail("");
        setPassword("");
        localStorage.clear();
        window.location.reload();
    }

    if(user) {
        return(
            <div>
                <h5>
                    {user.Username} is logged in.
                    <br /><br />
                    <button className="btn btn-success logoutBtn" onClick={handleLogout}>Logout</button>
                </h5>
            </div>
        );
    }

    return(
        <div className="login-form">
            <div className="container form-box">
                <h5>Log in to Social Music</h5>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                        className="form-control"
                        type="text"
                        autoComplete="on"
                        id="email"
                        required
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input
                        className="form-control"
                        type="password"
                        id="password"
                        required
                        name="Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        />
                    </div>

                    <button type="submit" className="btn btn-success loginBtn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

/*

    var uploadScreen=[];
    uploadScreen.push(<UploadScreen appContext={self.props.appContext} />);
    self.props.appContext.setState({
        loginPage: [],
        uploadScreen: uploadScreen
    })

constructor(props) {
        super(props);

        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeemail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    const login = () => {
        var self = this;
        var payload = {
            "email": email,
            "password": password
        }

        axios.post(api.base_url + '/login', payload)
            .then(function(response) {
                console.log(response);
                if(response.data.code === 200) {
                    console.log("Login Successful");
                    var uploadScreen=[];
                    uploadScreen.push(<UploadScreen appContext={self.props.appContext} />);
                    self.props.appContext.setState({
                        loginPage: [],
                        uploadScreen: uploadScreen
                    })
                }
                else if(response.data.code === 204) {
                    console.log("email or Password do not match our records.");
                    alert("email or Password do not match our records.");
                }
                else {
                    console.log("email does not exist.");
                    alert("email does not exist.");
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
*/
