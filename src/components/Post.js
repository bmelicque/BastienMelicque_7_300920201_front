import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { formatDate, getCookie } from '../utils/functions';
import { editPost, getComments, likePost } from '../utils/axiosServices';

const Post = props => {
    const { post, author, removePost } = props;
    const { id, date, mediaUrl } = post;
    const userId = +getCookie('userId');
    const userRole = getCookie('userRole');

    const [isEditing, setIsEditing] = useState(false);
    const [modifiedText, setModifiedText] = useState(post.text);
    const [text, setText] = useState(post.text);
    const [usersLiked, setUsersLiked] = useState(post.usersLiked ? post.usersLiked.split(' ').map(e => +e) : []);
    const [liked, setLiked] = useState(usersLiked.includes(userId));
    const [commentList, setCommentList] = useState([]);

    // Formats username and date of the post
    const username = userId == author.id ? 'moi' : author.email.split('@')[0];
    const formatedDate = formatDate(date);

    // On load, fetches comments
    useEffect(async () => {
        setCommentList(await getComments(id));
    }, [])

    const handleLike = () => {
        const like = !liked;

        if (like) setUsersLiked([...usersLiked, userId]);
        else setUsersLiked(usersLiked.filter(user => user != userId));
        setLiked(!liked);

        likePost(id, like);
    }

    // Updates the post on the database
    const handleUpdate = async () => {
        if (!(await editPost(id, modifiedText))) {
            setText(modifiedText);
            setIsEditing(false);
        }
    }

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
            {mediaUrl &&
                <img
                    src={mediaUrl}
                    className="post__image"
                    alt=""
                />
            }

            <div className="post__footer">
                <div>
                    <button className="post__comments">
                        Commentaires {commentList.length}
                    </button>
                    <button
                        className="post__like"
                        className={liked && "post__like--liked"}
                        onClick={handleLike}>
                        Like {usersLiked.length}
                    </button>
                </div>
                {
                    author && (author.id == userId) &&
                    <div className="post__modify">
                        {isEditing &&
                            <button
                                className="post__send"
                                onClick={handleUpdate}>
                                Envoyer
                            </button>
                        }
                        {
                            (userId == author.id) &&
                            <button
                                className="post__edit"
                                onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? 'Annuler' : 'Modifier'}
                            </button>
                        }
                        {
                            (userId == author.id || userRole == 'admin') &&
                            <button
                                className="post__delete"
                                onClick={() => {
                                    if (window.confirm('Voulez-vous vraiment supprimer ce message ?'))
                                        removePost(id);
                                }}>
                                Supprimer
                            </button>
                        }
                    </div>
                }
            </div>
        </li>
    );
};

export default Post;