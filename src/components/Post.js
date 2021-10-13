import React from 'react';

const Post = ({ post, user }) => {
    const username = user && user.email.split('@')[0];

    return (
        <li className="post" key={`post-${post.id}`} >
            par {username} le {post.date}
            {post.text}
        </li>
    );
};

export default Post;