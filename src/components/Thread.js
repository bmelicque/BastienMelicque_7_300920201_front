import React, { useEffect, useState } from 'react';
import Post from './Post';
import { getUsersList, deletePost } from '../utils/axiosServices';

const Thread = props => {
    const [postList, setPostList] = useState(props.postList);
    const [users, setUsers] = useState([]);

    const removePost = async (postId) => {
        if (!(await deletePost(postId)))
            setPostList(postList.filter(post => post.id !== postId));
    }

    // Synchronizes the post list form the props with the one in the state
    useEffect(() => {
        setPostList(props.postList);
    }, [props])

    // Fetches users (in order to associate the right username to a post)
    useEffect(async () => {
        setUsers(await getUsersList());
    }, [])


    return (!!users.length &&
        <div className="thread" key="thread">
            <ul className="thread__list" key="thread-list">
                {postList.map(post =>
                    <Post
                        post={post}
                        author={users.filter(user => user.id === post.userId)[0]}
                        users={users}
                        removePost={removePost}
                        key={`post-${post.id}`}
                    />
                )}
            </ul>
            <p className="thread__end-msg">C'est déjà la fin !</p>
        </div>
    );
};

export default Thread;