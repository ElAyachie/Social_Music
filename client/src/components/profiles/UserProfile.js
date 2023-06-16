import React from "react";
import "./profiles.scss";

import UserInfo from "./UserInfo"
import UserMusic from "./UserMusic"
import RemoveFriends from "./RemoveFriends"
import Post from "../post/post"

// Layout for the profile page.
// The left side of the page including user information, user music interests, and friends list.
// The right side view all the posts you made. (in progress)
function UserProfile() {
    return (
        <div className="user-profile">
            <div className="left-side">
                <UserInfo />
                <UserMusic />
                <div className="friend-space">
                    <div id="friend-space-content">
                        <h3>Followers List</h3>
                        <RemoveFriends />
                    </div>
                </div>
            </div>
            <div className="right-side">
                <div className="right-side-content">
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}
export default UserProfile;