import React, { Component } from 'react';
import "./home.scss";

import ExpandIcon from '../../assets/expand-icon.png'

import HomeFeed from '../home-feed/HomeFeed';
import UserMusic from '../music/UserMusic';
import AddFriends from '../home-users/AddFriends';
import getImageByKey from '../profiles/getImageByKey';

// Home page - displays the posts, music interests, and users list in different sections.
export default class Home extends Component {
    constructor(props) {
        super(props);

        this.expandFeedSection = this.expandFeedSection.bind(this);
        this.expandMusicSection = this.expandMusicSection.bind(this);
        this.expandFriendSection = this.expandFriendSection.bind(this);
        
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    expandFeedSection() {
        
        //var section = document.getElementById("feed-space");
        var feedSpace = document.getElementsByClassName("feed-space")[0];
        var musicSpace = document.getElementsByClassName("music-space")[0];
        var friendSpace = document.getElementsByClassName("friend-space")[0];
        var homeOrganization = document.getElementsByClassName("home-organization")[0]; 

        // if the feed is already enlarged
        if (feedSpace.style.width === "1432px") {
            feedSpace.style.width = "100%";
            musicSpace.style.display = "block";
            friendSpace.style.display = "block";
            homeOrganization.style.display = "inline-flex";
        }
        // if the feed is not already enlarged
        else {
            feedSpace.style.width = "1432px";
            musicSpace.style.display = "none";
            friendSpace.style.display = "none";
            homeOrganization.style.display = "block";
        }   
    }

    expandMusicSection() {
        var content = document.getElementById("music-space-content");

        if (content.style.height === "1000px") {
            content.style.height = "500px";
        }
        else {
            content.style.height = "1000px";
        }
    }

    expandFriendSection() {
        var content = document.getElementById("friend-space-content");

        if (content.style.height === "1000px") {
            content.style.height = "500px";
        }
        else {
            content.style.height = "1000px";
        }
    }

    render() {
        return (
            <div >
                <div id="home" className="container">
                    <div className="profile-bar sticky-top">
                        <img src={getImageByKey(this.state.user.Username)} className="pro-pic" alt="profile pic"></img>
                        <h5>{this.state.user.Name}</h5>
                        <h5>@{this.state.user.Username}</h5>
                        <button className="play-music-btn">Play My Music</button>
                    </div>
                    <div className='home-organization' style={{ "width": "1440px !important" }}>
                        <div className='left-panel-home'>
                            <div className="music-space">
                                <div>
                                    <button className="expand-icon-btn" onClick={this.expandMusicSection}>
                                        <img src={ExpandIcon} className="expand-icon" alt="Expand Icon" />
                                    </button>
                                </div>
                                <div id="music-space-content" className="music-space-content">
                                    <h3>My Music</h3>
                                    <UserMusic />
                                </div>
                            </div>
                            <div className="friend-space">
                                <div>
                                    <button className="expand-icon-btn" onClick={this.expandFriendSection}>
                                        <img src={ExpandIcon} className="expand-icon" alt="Expand Icon" />
                                    </button>
                                </div>
                                <div id="friend-space-content">
                                    <h3>Users List</h3>
                                    <AddFriends />
                                </div>
                            </div>
                        </div>
                        <div id="feed-space right-panel" className="right-panel-home feed-space">
                            <button className="expand-icon-btn" onClick={this.expandFeedSection}>
                                <img src={ExpandIcon} className="expand-icon" alt="Expand Icon" />
                            </button>
                        <div id="feed-space-content" className="feed-space-content">
                            <HomeFeed />
                        </div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}