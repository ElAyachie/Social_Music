import React, { useState } from "react";
import axios from 'axios';
import "./profiles.scss";
import api from '../../config/api';

import minus from "../../assets/red_minus.png";

// Artists tab in the music interests section on the users profile page.
const Artists = () => {
    const [artistInterests, setArtistInterests] = useState(JSON.parse(localStorage.getItem("artist_interests")));
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const [userID] = useState(user.UserID);

    // Removes the artist interest from local storage and the database.
    const deleteArtistInterest = async e => {
        let elementID = e.target.id;
        let artistID = e.target.dataset.artistid;
        const artist = {
            UserID: userID,
            ArtistID: artistID 
        };
        await axios.delete(api.base_url + "/users/artist_interests/delete", {
                data: artist
            })
            .then(response => {
                artistInterests.splice(elementID, 1);
                localStorage.setItem("artist_interests", JSON.stringify(artistInterests));
                setArtistInterests(JSON.parse(localStorage.getItem("artist_interests")));
            })      
            .catch(function(error) {
                console.log(error);
            });  
    };

    return (
        <div>
            {
            (artistInterests.length !== 0) ? (
            <div>
            { 
            artistInterests.map((artist, index) => (
                <div className="artist" key={index}>
                    <div className="jc-cente" style={{display: "flex"}}>
                        <img className="picture" src={artist.ArtistPic} height="65px" width="65px" alt="Artist"></img>
                        <div className="information">
                            <h2 className="name">{artist.ArtistName}</h2>
                            <button className="minus-icon" id={index} onClick={deleteArtistInterest} data-artistid={artist.ArtistID}/>
                        </div>
                    </div>
            </div>
           ))}</div>):(
          <h5>Nothing to show...</h5>
        )
           }
        </div>
    );
}

export default Artists;