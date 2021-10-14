import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

const Thread = ({ postList }) => {
    const [users, setUsers] = useState([]);

    // Fetches users (in order to associate the right username to a post)
    useEffect(() => {
        const token = document.cookie.split('=')[1];

        axios.get(`${process.env.REACT_APP_API_URL}api/user`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setUsers([...res.data.users]))
            .catch(err => console.log(err))
    }, [])


    return (
        <div className="thread" key="thread">
            <ul className="thread__list" key="thread-list">
                {postList.map(post =>
                    <Post
                        post={post}
                        user={users.filter(user => user.id === post.userId)[0]}
                        key={`post-${post.id}`}
                    />
                )}
            </ul>
        </div>
    );
};

export default Thread;