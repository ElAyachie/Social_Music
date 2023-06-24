import React, { useState } from 'react';

import Edit_Icon from "../../assets/edit-icon.png";
import axios from 'axios';

import api from '../../config/api';

// Displays the user's profile information.
function UserInfo() {
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const UserID = user.UserID;
    const [name, setName] = useState(user.Name);
    const [bio, setBio] = useState(user.Bio);
    const [profileImage, setProfileImage] = useState(user.ProfileImage);

    async function handleEditInformation() {
        if (user.Bio !== bio || user.Name !== name || user.ProfileImage !== profileImage) {
            const Info = {
                userID: UserID,
                newName: name,
                newBio: bio,
                profileImage: profileImage
            }
            await axios.patch(api.base_url + "/users/update_info/update", Info)
                .then(function(response) {
                    user["Bio"] = bio;
                    user["Name"] = name;
                    user["ProfileImage"] = profileImage;
                    localStorage.setItem("user", JSON.stringify(user));
                    let newUsers = JSON.parse(localStorage.getItem("users"));
                    newUsers.filter(x => x.Username === user.Username)[0].ProfileImage = profileImage;
                    localStorage.setItem("users", JSON.stringify(newUsers));
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

    function handleImage(e) {
        var selectedFile = e.target.files[0];
        var reader = new FileReader();
      
        var imgtag = document.getElementById("myimage");

        if (selectedFile !== undefined) {
            // Handle if the image is too large for the database to store
            var imgSize = selectedFile.size/1024;
            if (imgSize > 45) {
                alert("Sorry image size too large. Please use a different image.");
                return;
            }
            imgtag.title = selectedFile.name;
            reader.onload = function(event) {
                imgtag.src = event.target.result;
                setProfileImage(event.target.result);
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    return (
        <div className="user-info">
            <div class="image-upload">
                <label htmlFor="file-input">
                    <img className="profile-picture clickable-image" id="myimage" src={user.ProfileImage} alt='' />
                </label>

                <input id="file-input" type="file" onChange={handleImage}/>
            </div>
            <div className="name-block">
                <input type='text' id="name" className="name" value={name} placeholder={"Name"}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                <textarea type="text" id="bio" className="bio" value={bio} placeholder={"Bio"}
                    onChange={(e) => {
                        setBio(e.target.value);
                    }}/>
                <button className="edit-btn" onClick={handleEditInformation}>
                    <img className="edit" src={Edit_Icon} alt="Edit icon" />
                </button>
            </div>
        </div>
    )
}

export default UserInfo;