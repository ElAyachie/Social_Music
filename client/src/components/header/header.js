import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./header.scss";

import musicNotes from "../../assets/music-notes.png";

export default class Header extends Component 
{
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            default: "Profile"
        }
    }

    componentDidMount() {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            this.setState({
                username: foundUser.Username
            });
        }
    }

    render()
    {
        return (
            <div id="header">
                <nav className="navbar navbar-expand-lg navbar-light h-collapse navbar-custom">
                    <div className="container">
                        <Link to="/home" className="navbar-brand">
                            <img src={musicNotes} id="music-notes" alt="Music Notes" />
                            Social Music
                        </Link>
                        <ul className="nav ml-auto ul-custom">
                            <li className="nav-item active li-custom">
                                <Link to="/welcome" className="nav-link">Welcome</Link>
                            </li>
                            <li className="nav-item active li-custom">
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item active li-custom">
                                <Link to="/search" className="nav-link">Search</Link>
                            </li>
                            <li className="nav-item active li-custom">
                                <Link to="/profile" className="nav-link">
                                    {
                                        (this.state.username) ?
                                        (this.state.username) : (this.state.default)
                                    }
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

/*
    <div id="search">
        <form>
            <input type="text" placeholder="Search Music, Interests and more..." className="search-bar" onChange={this.setSearchQuery} />
        </form>
    </div>
*/