import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { editPost, getComments } from '../utils/axiosServices';
import LikeButton from './LikeButton';
import CommentThread from './CommentThread';
import MessageInfo from './MessageInfo';
import MessageActions from './MessageActions';

const Post = props => {
    const { post, author, removePost } = props;
    const { id, date, mediaUrl, usersLiked } = post;

    const [isEditing, setIsEditing] = useState(false);
    const [modifiedText, setModifiedText] = useState(post.text);
    const [text, setText] = useState(post.text);
    const [commentList, setCommentList] = useState([]);
    const [commentsModal, setCommentsModal] = useState(false);

    // On load, fetches comments
    useEffect(async () => {
        setCommentList(await getComments(id));
    }, []);

    // Updates the post on the database
    const handleUpdate = async () => {
        if (!(await editPost(id, modifiedText))) {
            setText(modifiedText);
            setIsEditing(false);
        }
    }

    return (
        <li className="message message--post" key={`post-${id}`}>
            <MessageInfo author={author} date={date} />

            {!isEditing ?
                <p className="message__text">{text}</p>
                : <textarea
                    name="" id=""
                    className="message__text message__text--edit"
                    onChange={e => setModifiedText(e.target.value)}>
                    {modifiedText}
                </textarea>
            }
            {mediaUrl &&
                <img
                    src={mediaUrl}
                    className="message__image"
                    alt=""
                />
            }

            <div className="message__footer">
                <div>
                    <button className="message__comment-list" onClick={() => setCommentsModal(!commentsModal)}>
                        <i class="far fa-comment-alt"></i> {commentList.length}
                    </button>
                    <LikeButton
                        postId={id}
                        usersLiked={usersLiked} />
                </div>

                <MessageActions
                    messageId={id}
                    authorId={author.id}
                    handleUpdate={handleUpdate}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    removeSelf={removePost}
                />
            </div>

            {commentsModal && <CommentThread commentList={commentList} users={props.users} postId={id} />}
        </li>
    );
};

export default Post;