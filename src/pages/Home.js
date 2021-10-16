import React from 'react';
import { useState } from 'react/cjs/react.development';
import Header from '../components/Header';
import NewPost from '../components/NewPost';
import Thread from '../components/Thread';
import { createPost } from '../utils/axiosServices';

const Home = props => {
    const [postList, setPostList] = useState(props.postList);

    const addPost = async (text, file) => {
        const newPost = await createPost(text, file);
        setPostList([newPost, ...postList]);
    }

    return (
        <div className="homepage">
            <Header />
            <NewPost addPost={addPost} />
            <Thread postList={postList} />
        </div>
    );
};

export default Home;