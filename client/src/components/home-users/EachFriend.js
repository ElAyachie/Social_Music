import React, { useState } from 'react';
import api from '../../config/api';
import axios from 'axios';
import "../profiles/profiles.scss";

// Each friend entry in the AddFriends component
function EachFriend() {
    const [users] = useState(JSON.parse(localStorage.getItem("users")));
    const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [userID] = useState(currentUser.UserID);

    // Verifies that the user is not already added as a friend.
    // Stores the new friend entry into the local storage and database.
    const addFriend = async e => {
        let friendList = JSON.parse(localStorage.getItem("friends"));
        let otherUserID = parseInt(e.target.dataset.userid);
        let otherUsername = e.target.dataset.otherusername;
        let otherName = e.target.dataset.othername;
        // Check if the user already has the friend in their list
        var found = false;
        for (let i = 0; i < friendList.length; i++){
            if (friendList[i].FriendID === otherUserID) {
                found = true;
                break;
            }
        }
        if (!found) {
            const friend = {
                UserID: userID,
                FriendID: otherUserID,
            };
            axios.post(api.base_url + "/users/friends/insert", friend)
                .then(function(response) {
                    console.log("Successful insert");
                    // Add to the local storage
                    const dataObject = {
                        FriendID: otherUserID,
                        Username: otherUsername,
                        Name: otherName
                    };
                    friendList.push(dataObject);
                    console.log("Friend data recieved");
                    localStorage.setItem("friends", JSON.stringify(friendList));
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        else {
            return alert("Already following this user.");
        }
    };

    return (
        <div>
        {
        (users.length !== 0) ? (
            <div>
            { 
            users.map((user, index) => (
                (user.UserID !== userID) ? (
                <div className="friend" key={index}>
                    <div className='name-picture'>
                        <img className="picture" src={user.ProfileImage} width="45px" height="45px" alt="Profile pic"></img>
                        <h4 className="name">{user.Username} - {user.Name}</h4>
                    </div>
                    <button className="upvote-icon" id={index} onClick={addFriend} alt="Upvote" data-userid={user.UserID} data-otherusername={user.Username} data-othername={user.Name}>+</button>
                </div>) : null
            ))}</div>):(
                <h5>Nothing to show...</h5>
              )
            }
          </div>
    )
}

export default EachFriend;