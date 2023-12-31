import React, { useState } from 'react';
import axios from 'axios';
import '../profiles/profiles.scss';

import api from '../../config/api';

// Modal for edditting user information (in progress)
function EditInfo() {
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const [nameText, setNameText] = useState(user.Name);
    const [bioText, setBioText] = useState(user.Bio);
    const userID = user.UserID;

    async function fetchData() {
        if (user.Bio !== bioText || user.Name !== nameText) {
            const Info = {
                userID: userID,
                newName: nameText,
                newBio: bioText
            }
            await axios.patch(api.base_url + "/users/update_info/update", Info)
                .then(function(response) {
                    user["Bio"] = bioText;
                    user["Name"] = nameText;
                    localStorage.setItem("user", JSON.stringify(user));
                    setBioText(bioText);
                    setNameText(nameText);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

    const handleInformationChange = e => {
        e.preventDefault();
        fetchData();
    }

    return(
        <div id="edit-info" className="edit-info">
            <div className="edit-info-content">
                <div className="close-space">
                    <span className="close-edit">&times;</span>
                </div>
                <div className="info-space">
                    <form onSubmit={handleInformationChange}>
                        <input
                        className="form-control"
                        type="text"
                        autoComplete="on"
                        id="name"
                        required
                        name="name"
                        placeholder={nameText}
                        value={nameText}
                        onChange={(e) => {
                            setNameText(e.target.value);
                        }}
                        />
                        <textarea
                        className="form-control"
                        type="text"
                        autoComplete="on"
                        id="postText"
                        required
                        name="postText"
                        placeholder={bioText}
                        value={bioText}
                        rows="5"
                        onChange={(e) => {
                            setBioText(e.target.value);
                        }}
                        />
                        <button type="submit" className="edit-info-button btn loginBtn">
                            Save Changes
                        </button>
            
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditInfo;