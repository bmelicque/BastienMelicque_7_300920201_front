import React from 'react';
import { useState } from 'react/cjs/react.development';
import Header from '../components/Header';
import NewPost from '../components/NewPost';
import Profile from '../components/Profile.js';
import Thread from '../components/Thread';
import { createPost } from '../utils/axiosServices';

const Home = props => {
    const [postList, setPostList] = useState(props.postList);
    const [profileModal, setProfileModal] = useState(false)

    const addPost = async (text, file) => {
        const newPost = await createPost(text, file);
        setPostList([newPost, ...postList]);
    }

    return (
        <div className="homepage">
            <Header
                handleLogout={props.handleLogout}
                profileModal={profileModal}
                setProfileModal={setProfileModal}
            />
            {profileModal ?
                <Profile
                    handleLogout={props.handleLogout} /> :
                <>
                    <NewPost addPost={addPost} />
                    <Thread postList={postList} />
                </>
            }
        </div>
    );
};

export default Home;