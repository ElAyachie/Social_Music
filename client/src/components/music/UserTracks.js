import React, { useState, useRef } from "react";
import api from '../../config/api';
import axios from 'axios';
import "../profiles/profiles.scss";

// Songs tab in the music interests section on the users profile page.
const UserTracks = (props) => {
    const [songInterests, setSongInterests] = useState(props.songInterests);
    const [user] = useState(props.user);
    const [userID] = useState(user.UserID);

    const audioRef = useRef();

    if(audioRef.current) {
        audioRef.current.load();
    }
    // Removes the song interest from local storage and database.
    const deleteSongInterest = async e => {
        let elementID = e.target.id;
        let songname = e.target.dataset.songname;
        const song = {
            UserID: userID,
            SongName: songname
        };
        await axios.delete(api.base_url + "/users/song_interests/delete", {
                data: song
            })
            .then(response => {
                songInterests.splice(elementID, 1);
                localStorage.setItem("song_interests", JSON.stringify(songInterests));
                setSongInterests(JSON.parse(localStorage.getItem("song_interests")));
            })      
            .catch(function(error) {
                console.log(error);
            });  
    };

    return (
        <div>
        {
        (songInterests.length !== 0) ? (
            <div>
            { 
            songInterests.map((song, index) => (
                <div className="track" key={index}>
                    <div className="jc-cente" style={{display: "flex"}}>
                        <img className="picture" src={song.AlbumPic} height="65px" width="65px" alt="Artist"></img>
                        <div className="information">
                            <h2 className="name">{song.SongName} - {song.SongName}</h2>
                            <audio className="audio" controls ref={audioRef}>
                                <source src={song.SongLink} type="audio/mpeg"/>
                                Your browser does not support the audio tag.
                            </audio>
                        </div>
                        <div className="right-side-track">
                            <button className="minus-icon" id={index} onClick={deleteSongInterest} data-songname={song.SongName}/>
                        </div>
                    </div>
                </div>
           ))}</div>
           ):(
          <h5>Nothing to show...</h5>
          )
           }
 </div>
 );
}

export default UserTracks;