import React from 'react';
import "../profiles/profiles.scss";
import EachFriendRemove from './EachFriendRemove';

// Add friends module attached to the home page.
// Displays a list of users to the user they can add.
function RemoveFriends() {
    return (
        <div className="friends-section">
            <div id="friends-list-ad" className="friends-list list">
                <EachFriendRemove />
            </div>
        </div>
    )
}

export default RemoveFriends;