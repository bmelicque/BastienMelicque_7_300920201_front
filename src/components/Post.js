import React from 'react';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';
import { formatDate, getCookie } from '../utils/functions';

const Post = ({ post, author }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [modifiedText, setModifiedText] = useState(post.text);
    const [text, setText] = useState(post.text);
    const [removed, setRemoved] = useState(false);

    const { id, date, mediaUrl } = post;
    const userId = getCookie('userId');

    const username = author && (userId == author.id ? 'moi' : author.email.split('@')[0]);
    const formatedDate = formatDate(date);

    // Updates the post on the database
    const updatePost = async () => {
        try {
            const token = getCookie('token');

            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
                data: {
                    text: modifiedText
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            setText(modifiedText);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    }

    // Deletes the post from the database
    const deletePost = async () => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce message ?'))
            return 0;

        try {
            const token = getCookie('token');

            await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
                headers: { Authorization: `Bearer ${token}` }
            });
            setRemoved(true);
        } catch (error) {
            console.log(error);
        }
    }

    if (removed) return null;

    return (
        <li className="post" key={`post-${id}`} >
            <div className="post__header">
                <div className="post__user">{username}</div>
                <div className="post__date">{formatedDate}</div>
            </div>

            {!isEditing ?
                <p className="post__text">{text}</p>
                : <textarea
                    name="" id=""
                    className="post__textarea"
                    onChange={e => setModifiedText(e.target.value)}>
                    {modifiedText}
                </textarea>
            }
            {mediaUrl !== undefined ||
                <img
                    src={mediaUrl}
                    className="post__image"
                    alt=""
                />
            }

            <div className="post__footer">
                <button className="post__like">Like</button>
                {
                    author && (author.id == userId) &&
                    <div className="post__modify">
                        {isEditing &&
                            <button
                                className="post__send"
                                onClick={updatePost}>
                                Envoyer
                            </button>
                        }
                        <button
                            className="post__edit"
                            onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Annuler' : 'Modifier'}
                        </button>
                        <button
                            className="post__delete"
                            onClick={deletePost}>
                            Supprimer</button>
                    </div>
                }
            </div>
        </li>
    );
};

export default Post;