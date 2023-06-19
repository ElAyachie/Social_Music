import React, { useState } from "react";
import axios from 'axios';
import "../profiles/profiles.scss";
import api from '../../config/api';

// Albums tab in the music interests section on the users profile page.
const Albums = () => {
    const [albumInterests, setAlbumInterests] = useState(JSON.parse(localStorage.getItem("album_interests")));
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const [userID] = useState(user.UserID);

    // Removes the album interest from local storage and the database.
    const deleteAlbumInterest = async e => {
        let elementID = e.target.id;
        let albumID = e.target.dataset.albumid;
        const album = {
            UserID: userID,
            AlbumID: albumID 
        };
        await axios.delete(api.base_url + "/users/album_interests/delete", {
                data: album
            })
            .then(response => {
                albumInterests.splice(elementID, 1);
                localStorage.setItem("album_interests", JSON.stringify(albumInterests));
                setAlbumInterests(JSON.parse(localStorage.getItem("album_interests")));
            })      
            .catch(function(error) {
                console.log(error);
            });  
    };

    return (
        <div>
        {
        (albumInterests.length !== 0) ? (
            <div>
            { 
            albumInterests.map((album, index) => (
            <div className="album-card" key={index}>
                <div className="jc-cente" style={{display: "flex"}}>
                    <img className="picture" src={album.AlbumPic} alt="Artist"></img>
                    <div className="information">
                        <h2 className="name">{album.AlbumName} - {album.ArtistName}</h2>
                        <button className="minus-icon" id={index} onClick={deleteAlbumInterest} data-albumid={album.AlbumID}/>
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

export default Albums;