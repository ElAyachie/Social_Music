import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.scss';
import api from '../../config/api';
import FriendMusic from '../music/FriendMusic';

// Show a friend profile popup.
function FriendProfilePopup(props) {
    const userID = props.UserID;
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        const getUserInfo  = async e  =>  {
            await axios.get(api.base_url + '/user/get', {
                    params: {
                        UserID: userID
                    }
                })
                .then(function(response) {
                    if (response.data.code === 200) {
                        setUserInfo(response.data.user[0]);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        };
        getUserInfo();
    }, []);

    return(
        <div id={"friend-profile-popup" + props.PostID} className={"friend-profile-popup"}>
            <div className="friend-profile-content">
            <div>
                <img className="profile-picture clickable-image" id="myimage" src={userInfo.ProfileImage} />
            </div>
            <div className="name-block">
                <p className="name">@{userInfo.Username}</p>
                <p className="name">{userInfo.Name}</p>
                <p className="bio">{userInfo.Bio}</p>
            </div>
                <FriendMusic UserID={userID} friendInfo={userInfo}/>
            </div>
        </div>
    );
}

export default FriendProfilePopup;