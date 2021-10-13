import React from 'react';
import { formatDate } from '../utils/functions';

const Post = ({ post, user }) => {
    const {id, text, date, mediaUrl} = post;
    const username = user && user.email.split('@')[0];

    const formatedDate = formatDate(date);

    return (
        <li className="post" key={`post-${id}`} >
            <div className="post__header">
                <div className="post__user">{username}</div>
                <div className="post__date">{formatedDate}</div>
            </div>
            <p className="post__text">{text}</p>
            {mediaUrl !== undefined ||
                <img
                    src={mediaUrl}
                    className="post__image"
                    alt=""
                />
            }
        </li>
    );
};

export default Post;