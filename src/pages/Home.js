import React from 'react';
import NewPost from '../components/NewPost';
import Thread from '../components/Thread';

const Home = ({ postList }) => {
    return (
        <div className="homepage">
            <NewPost />
            <Thread postList={postList} />
        </div>
    );
};

export default Home;