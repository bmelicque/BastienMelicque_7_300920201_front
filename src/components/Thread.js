import React, { useEffect, useState } from 'react';
import Post from './Post';
import { getUsersList } from '../utils/axiosServices';

const Thread = ({ postList }) => {
    const [users, setUsers] = useState([]);

    // Fetches users (in order to associate the right username to a post)
    useEffect(async () => {
        setUsers(await getUsersList());
    }, [])


    return (users.length &&
        <div className="thread" key="thread">
            <ul className="thread__list" key="thread-list">
                {postList.map(post =>
                    <Post
                        post={post}
                        author={users.filter(user => user.id === post.userId)[0]}
                        key={`post-${post.id}`}
                    />
                )}
            </ul>
        </div>
    );
};

export default Thread;