import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { editComment } from '../utils/axiosServices';
import { getCookie } from '../utils/functions';
import MessageActions from './MessageActions';

const Comment = props => {
    const { comment, author, removeComment } = props;
    const userId = +getCookie("userId");
    const username = userId == author.id ? 'moi' : author.email.split('@')[0];

    const [isEditing, setIsEditing] = useState(false);
    const [modifiedText, setModifiedText] = useState(comment.text)
    const [text, setText] = useState(comment.text);

    useEffect(() => {
        if (!isEditing)
            setModifiedText(text);
    }, [isEditing])

    // Updates the comment on the database
    const handleUpdate = async () => {
        if (!(await editComment(comment.id, modifiedText))) {
            setText(modifiedText);
            setIsEditing(false);
        }
    }

    return (
        <li className="message">

            {!isEditing ?
                <p className="message__text--comment">
                    <span>{username}&nbsp;: </span>
                    {text}
                </p> :
                <textarea
                    name="" id=""
                    className="message__text message__text--comment message__text--edit"
                    onChange={e => setModifiedText(e.target.value)}>
                    {modifiedText}
                </textarea>
            }

            <div className="message__footer message__actions">
                <MessageActions
                    messageId={comment.id}
                    authorId={author.id}
                    handleUpdate={handleUpdate}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    removeSelf={removeComment}
                />
            </div>
        </li>
    );
};

export default Comment;