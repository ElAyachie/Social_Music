import React, { useState, useEffect } from "react";
import "../profiles/profiles.scss";
import api from '../../config/api';
import axios from 'axios';

// Artists tab in the music interests section on the users profile page.
const FriendArtists = (props) => {
    const [artistInterests, setArtistInterests] = useState([]);

    useEffect(() => {
        const getArtistInterests = async e => {
            await axios.get(api.base_url + '/users/load_artists/get', {
                params: {
                    UserID: props.UserID
                }
            })
                .then(function (response) {
                    if (response.data.code === 200) {
                        let dataObject = {};
                        let artistInterests = [];
                        for (var i = 0; i < response.data.artistInterests.length; i++) {
                            dataObject = {
                                ArtistName: response.data.artistInterests[i].ArtistName,
                                ArtistPic: response.data.artistInterests[i].ArtistPic,
                                ArtistID: response.data.artistInterests[i].ArtistID
                            };
                            artistInterests.push(dataObject);
                        }
                        setArtistInterests(artistInterests);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getArtistInterests();
    }, [props.UserID]);

    return (
        <div>
            {
                (artistInterests.length !== 0) ? (
                    <div>
                        {
                            artistInterests.map((artist, index) => (
                                <div className="artist" key={artist.ArtistID}>
                                    <div className="jc-cente" style={{ display: "flex" }}>
                                        <img className="picture" src={artist.ArtistPic} height="65px" width="65px" alt="Artist"></img>
                                        <div className="information">
                                            <h2 className="name">{artist.ArtistName}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))}</div>) : (
                    <h5>Nothing to show...</h5>
                )
            }
        </div>
    );
}

export default FriendArtists;