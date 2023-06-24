import React, { useState } from "react";
import axios from 'axios';
import "../profiles/profiles.scss";
import api from '../../config/api';

// Artists tab in the music interests section on the users profile page.
const UserArtists = (props) => {
    const [artistInterests, setArtistInterests] = useState(props.artistInterests);
    const [user] = useState(props.user);
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
                <div className="artist" key={artist.ArtistID}>
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

export default UserArtists;