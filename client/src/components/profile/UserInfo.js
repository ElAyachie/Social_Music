import React, { useState, useEffect } from 'react';

import EditInfo from './EditInfo';
import Edit_Icon from "../../assets/edit-icon.png";
import axios from 'axios';
import getImageByKey from '../profiles/getImageByKey';

import api from '../../config/api';

// Displays the user's profile information.
function UserInfo() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [bioText, setBioText] = useState('');

    function EditInformation() {
        // Get the editBox
        var editBox = document.getElementById("edit-info");

        // Get the <span> element that closes the editBox
        var span = document.getElementsByClassName("close-edit")[0];

        editBox.style.display = "block";

        // When the user clicks on <span> (x), close the editBox
        span.onclick = function () {
            editBox.style.display = "none";
        }
    }

    async function fetchUserData() {
        axios.get(api.base_url + '/users/info/get', {
            params: {
                UserID: user.UserID
            }
        })
            .then(function (response) {
                console.log(response.data);
                console.log("Profile data grabbed");
                console.log(response.data.name);
                setBioText(response.data.bio);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /*
    useEffect(() => {
        setInterval(() =>
            //fetchUserData(),
        5000);
        fetchUserData()
    }, [fetchUserData(), setBioText]);
    */

    return (
        <div className="user-info">
            <img className="picture" src={getImageByKey(user.Username)} width="95px" height="95px" alt="Profile pic" />
            <div className="name-block">
                <h1 className="name">{user.Name}</h1>
                <button className="edit-btn" onClick={EditInformation}>
                    <img className="edit" src={Edit_Icon} alt="Edit icon" />
                </button>
            </div>
            <h3 className="bio">{bioText}</h3>
            <EditInfo />
        </div>
    )
}

export default UserInfo;