import React from 'react';
import EachFriend from "./EachFriend"
import "../profiles/profiles.scss";

// Add friends module attached to the home page.
// Displays a list of users to the user they can add.
function AddFriends() {
    return (
        <div className="friends-section">
            <div id="friends-list-ad" className="friends-list list">
                <EachFriend />
            </div>
        </div>
    )
}

export default AddFriends;