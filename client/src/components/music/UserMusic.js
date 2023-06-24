import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import "../profiles/profiles.scss";

import UserArtists from "./UserArtists";
import UserTracks from "./UserTracks";
import UserAlbums from "./UserAlbums";

// User Music interests underneath profile information.
function UserMusic() {
    const [artistInterests] = useState(JSON.parse(localStorage.getItem("artist_interests")));
    const [albumInterests] = useState(JSON.parse(localStorage.getItem("album_interests")));
    const [songInterests] = useState(JSON.parse(localStorage.getItem("song_interests")));
    const [user] = useState(JSON.parse(localStorage.getItem("user")));

    return (
        <div className="music-section">
            <Tabs defaultActiveKey="Artists" id="uncontrolled-tab-example">
                <Tab eventKey="Artists" title="Artists">
                    <div className="artists sub-sections list">
                        <UserArtists artistInterests={artistInterests} user={user}/>
                    </div>         
                </Tab>
                <Tab eventKey="Albums" title="Albums">
                    <div className="artists sub-sections">
                        <UserAlbums albumInterests={albumInterests} user={user}/>
                    </div>
                </Tab>
                <Tab eventKey="Tracks" title="Tracks">
                    <div className="user-tracks sub-sections">
                        <UserTracks songInterests={songInterests} user={user}/>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default UserMusic;