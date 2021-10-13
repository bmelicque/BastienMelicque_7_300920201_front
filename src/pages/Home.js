import React from 'react';
import Thread from './Thread';

const Home = ({ postList }) => {
    return (
        <div className="homepage">
            <Thread postList={postList} />
        </div>
    );
};

export default Home;