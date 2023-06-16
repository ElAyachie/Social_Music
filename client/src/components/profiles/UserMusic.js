import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import "./profiles.scss";

import Artists from "./Artists";
import UserTracks from "./UserTracks";
import Albums from "./Albums";

// User Music interests underneath profile information.
function UserMusic() {
    return (
        <div className="music-section">
            <Tabs defaultActiveKey="Artists" id="uncontrolled-tab-example">
                <Tab eventKey="Artists" title="Artists">
                    <div className="artists sub-sections list">
                        <Artists />
                    </div>         
                </Tab>
                <Tab eventKey="Albums" title="Albums">
                    <div className="artists sub-sections">
                        <Albums />
                    </div>
                </Tab>
                <Tab eventKey="Tracks" title="Tracks">
                    <div className="user-tracks sub-sections">
                        <UserTracks />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default UserMusic;