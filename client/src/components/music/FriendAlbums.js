import React, { useState, useEffect } from "react";
import "../profiles/profiles.scss";
import api from '../../config/api';
import axios from 'axios';

// Albums tab in the music interests section on the users profile page.
const FriendAlbums = (props) => {
    const [albumInterests, setAlbumInterests] = useState([]);

    useEffect(() => {
        const getAlbumInterests  = async e  =>  {
            await axios.get(api.base_url + '/users/load_albums/get', {
                    params: {
                        UserID: props.UserID
                    }
                })
                .then(function(response) {
                    if (response.data.code === 200) {
                        let dataObject = {};
                        let albumInterests = [];
                        for(var i = 0; i < response.data.albumInterests.length; i++) {
                            dataObject = {
                                AlbumName: response.data.albumInterests[i].AlbumName,
                                AlbumPic: response.data.albumInterests[i].AlbumPic,
                                ArtistName: response.data.albumInterests[i].ArtistName,
                                AlbumID: response.data.albumInterests[i].AlbumID,
                                ArtistID: response.data.albumInterests[i].ArtistID
                            };
                            albumInterests.push(dataObject);
                        }
                        setAlbumInterests(albumInterests);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        };
        getAlbumInterests();
    }, []);

    return (
        <div>
        {
        (albumInterests.length !== 0) ? (
            <div>
            { 
            albumInterests.map((album, index) => (
            <div className="album-card" key={album.AlbumID}>
                <div className="jc-cente" style={{display: "flex"}}>
                    <img className="picture" src={album.AlbumPic} alt="Artist"></img>
                    <div className="information">
                        <h2 className="name">{album.AlbumName} - {album.ArtistName}</h2>
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

export default FriendAlbums;