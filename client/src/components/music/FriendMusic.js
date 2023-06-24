import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import "../profiles/profiles.scss";

import FriendArtists from "./FriendArtists";
import FriendTracks from "./FriendTracks";
import FriendAlbums from "./FriendAlbums";

// User Music interests underneath profile information.
function FriendMusic(props) {
    const user = props.friendInfo;
    const UserID = props.UserID;
    return (
        <div className="music-section">
            <Tabs defaultActiveKey="Artists" id="uncontrolled-tab-example">
                <Tab eventKey="Artists" title="Artists">
                    <div className="artists sub-sections list">
                        <FriendArtists UserID={UserID} user={user}/>
                    </div>         
                </Tab>
                <Tab eventKey="Albums" title="Albums">
                    <div className="artists sub-sections">
                        <FriendAlbums UserID={UserID} user={user}/>
                    </div>
                </Tab>
                <Tab eventKey="Tracks" title="Tracks">
                    <div className="user-tracks sub-sections">
                        <FriendTracks UserID={UserID} user={user}/>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default FriendMusic;