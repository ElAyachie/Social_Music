import React from 'react';
import EachFriendProfile from "./EachFriendProfile"
import "../profiles/profiles.scss";

function Friends() {
    return (
        <div className="friends-section">
            <div id="friends-list-ad" className="friends-list list">
                <EachFriendProfile />
            </div>
        </div>
    )
}

export default Friends;