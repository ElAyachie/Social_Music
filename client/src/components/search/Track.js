import ExplicitIcon from "../../assets/explicit.svg";
import axios from 'axios';
import React, { useRef } from "react";
import api from '../../config/api';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import { useState } from 'react';

// Layout for each indivdual result from the API query.
// Organizes the results into cards that the user can use to add either the album, artist, or song.
const Track = ({ musicResult }) => {
    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    const [userID] = useState(user.UserID);

    // Verifies that the user does not already have the artist in their list.
    // Adds the music interest to the local storage and database.
    const addArtist = () => {
        let artistInterests = JSON.parse(localStorage.getItem("artist_interests"));
        // Check if the user already has the interest in their list
        var found = false;
        for (let i = 0; i < artistInterests.length; i++){
            if (artistInterests[i].ArtistID === musicResult.artist.id) {
                found = true;
                break;
            }
        }
        if (!found) {
            const newArtist = {
                UserID: userID,
                ArtistID: musicResult.artist.id,
                ArtistName: musicResult.artist.name,
                ArtistPic: musicResult.artist.picture,
            };
            axios.post(api.base_url + "/users/artist_interests/insert", newArtist)
                .then(function(response) {
                    console.log("Successful insert");
                    // Add to the local storage
                    const dataObject = {
                        ArtistName: musicResult.artist.name,
                        ArtistPic: musicResult.album.cover,
                        ArtistID: musicResult.artist.id
                    };
                    artistInterests.push(dataObject);
                    console.log("Artist data recieved");
                    localStorage.setItem("artist_interests", JSON.stringify(artistInterests));
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        else {
            return alert("Interest already added.");
        }
    }

    // Verifies that the user does not already have the song in their list.
    // Adds the music interest to the local storage and database.
    const addSong = () => {
        let songInterests = JSON.parse(localStorage.getItem("song_interests"));
        var found = false;
        for (let i = 0; i < songInterests.length; i++){
            if (songInterests[i].SongName === musicResult.title) {
                found = true;
                break;
            }
        }
        if (!found){
            axios.post(api.base_url + "/users/song_interests/insert", {
                UserID: userID,
                SongName: musicResult.title,
                SongLink: musicResult.preview,
                ArtistID: musicResult.artist.id,
                ArtistName: musicResult.artist.name,
                AlbumID: musicResult.album.id,
                AlbumPic: musicResult.album.cover
            })
            .then(function(response) {
                console.log("Successful insert");
                // Add to the locale storage
                let dataObject = {
                    SongName: musicResult.title,
                    SongLink: musicResult.preview,
                    ArtistName: musicResult.artist.name,
                    AlbumPic: musicResult.album.cover,
                    ArtistID: musicResult.artist.id,
                    AlbumID: musicResult.album.id
                };
                songInterests.push(dataObject);
                localStorage.setItem("song_interests", JSON.stringify(songInterests));
            })
            .catch(function(error) {
                console.log(error);
            });  
        }
        else {
            alert("Interest already added.");
        }
    }

    // Verifies that the user does not already have the album in their list.
    // Adds the music interest to the local storage and database.
    const addAlbum = () => {
        let albumInterests = JSON.parse(localStorage.getItem("album_interests"));
        var found = false;
        for (let i = 0; i < albumInterests.length; i++) {
            if (albumInterests[i].AlbumID === musicResult.album.id) {
                found = true;
                break;
            }
        }
        if (!found) {
            axios.post(api.base_url + "/users/album_interests/insert", {
                UserID: userID,
                AlbumID: musicResult.album.id,
                AlbumName: musicResult.album.title,
                AlbumPic: musicResult.album.cover,
                ArtistID: musicResult.artist.id,
                ArtistName: musicResult.artist.name
            })
            .then(function(response) {
                console.log("Successful insert");
                // Add to the locale storage
                let dataObject = {
                        AlbumName: musicResult.album.title,
                        AlbumPic: musicResult.album.cover,
                        ArtistName: musicResult.artist.name,
                        AlbumID: musicResult.album.id,
                        ArtistID: musicResult.artist.id
                    };
                albumInterests.push(dataObject);
                localStorage.setItem("album_interests", JSON.stringify(albumInterests));
            })
            .catch(function(error) {
                console.log(error);
            });  
        }
        else {
            alert("Interest already added.");
        }
    }
    
    const audioRef = useRef();

    if(audioRef.current) {
        audioRef.current.load();
    }
    
    return (
      <div className="card result" id={"musicResult" + musicResult.id}>
          <div className="card-body">
              <img src={musicResult.album.cover} alt={musicResult.artist.name} />
              <br />
              <h5 className="card-title header">{musicResult.artist.name} - {musicResult.title}</h5>
              <DropdownButton className="drop-up" id="dropdown-button-drop-up" drop="up" title="+">
                    <Dropdown.Item onClick={addSong}>Add Song</Dropdown.Item>
                    <Dropdown.Item onClick={addArtist}>Add Artist/Group</Dropdown.Item>
                    <Dropdown.Item onClick={addAlbum}>Add Album</Dropdown.Item>
              </DropdownButton>
              {
                musicResult.explicit_content_lyrics ? 
                <img className="explicit-icon" src={ExplicitIcon} alt="explicit icon" width="90px" height="55" /> : <div />
              }
              <audio className="audio" controls ref={audioRef}>
                  <source src={musicResult.preview} type="audio/mpeg"/>
                  Your browser does not support the audio tag.
              </audio>
          </div>
      </div>
    );
}
  
export default Track;