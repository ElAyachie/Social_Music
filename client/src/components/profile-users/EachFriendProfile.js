import React, { useState } from 'react';
import api from '../../config/api';
import axios from 'axios';
import "../profiles/profiles.scss";
import getImageByKey from '../profiles/getImageByKey';

// Each friend entry in the Friends component
function EachFriendProfile() {
    const [friends, setFriends] = useState(JSON.parse(localStorage.getItem("friends")));
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const [userID] = useState(user.UserID);

    // Removes a friend from local storage and database.
    const removeFriend = async e => {
        let elementID = e.target.id;
        let friendID = e.target.dataset.friendid;
        const friend = {
            UserID: userID,
            FriendID: friendID
        };
        await axios.delete(api.base_url + "/users/friends/delete", {
            data: friend
        })
            .then(response => {
                friends.splice(elementID, 1);
                localStorage.setItem("friends", JSON.stringify(friends));
                setFriends(JSON.parse(localStorage.getItem("friends")));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div>
            {
                (friends.length !== 0) ? (
                    <div>
                        {
                            friends.map((friend, index) => (
                                <div className="friend" key={index}>
                                    <div className='name-picture'>
                                        <img className="picture" src={getImageByKey(friend.Username)} width="45px" height="45px" alt="Profile pic"></img>
                                        <h4 className="name">{friend.Username} - {friend.Name}</h4>
                                    </div>
                                    <button className="minus-icon" id={index} onClick={removeFriend} alt="Upvote" data-userid={user.UserID} data-username={user.Username} />
                                </div>
                            ))}</div>) : (
                    <h5>Nothing to show...</h5>
                )
            }
        </div>
    )
}

export default EachFriendProfile;