import React from 'react';
import Header from '../components/Header';
import NewPost from '../components/NewPost';
import Thread from '../components/Thread';

const Home = ({ postList }) => {
    return (
        <div className="homepage">
            <Header />
            <NewPost />
            <Thread postList={postList} />
        </div>
    );
};

export default Home;