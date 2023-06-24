import React, { useState, useRef, useEffect } from "react";
import "../profiles/profiles.scss";
import api from '../../config/api';
import axios from 'axios';

// Songs tab in the music interests section on the users profile page.
const FriendTracks = (props) => {
    const [songInterests, setSongInterests] = useState([]);

    useEffect(() => {
        const getSongInterests = async e => {
            await axios.get(api.base_url + '/users/load_songs/get', {
                    params: {
                        UserID: props.UserID
                    }
                })
                .then(function(response) {
                    if (response.data.code === 200) {
                        let dataObject = {};
                        let songInterests = [];
                        for(var i = 0; i < response.data.songInterests.length; i++) {
                            dataObject = {
                                SongName: response.data.songInterests[i].SongName,
                                SongLink: response.data.songInterests[i].SongLink,
                                ArtistName: response.data.songInterests[i].ArtistName,
                                AlbumPic: response.data.songInterests[i].AlbumPic,
                                ArtistID: response.data.songInterests[i].ArtistID,
                                AlbumID: response.data.songInterests[i].AlbumID
                            };
                            songInterests.push(dataObject);
                        }
                        setSongInterests(songInterests);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        };
        getSongInterests();
    }, [props.UserID]);

    const audioRef = useRef();

    if(audioRef.current) {
        audioRef.current.load();
    }

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

export default FriendTracks;