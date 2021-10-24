import React from 'react';
import { useState } from 'react/cjs/react.development';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Thread from '../components/Thread/Thread';

const Home = props => {
    const [profileModal, setProfileModal] = useState(false)

    return (
        <div className="homepage">
            <Header
                handleLogout={props.handleLogout}
                profileModal={profileModal}
                setProfileModal={setProfileModal}
            />
            {profileModal ?
                <Profile handleLogout={props.handleLogout} /> :
                <Thread
                    contentType="post"
                    messageList={props.postList}
                />
            }
        </div>
    );
};

export default Home;