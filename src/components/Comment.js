import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { editComment } from '../utils/axiosServices';
import MessageActions from './MessageActions';
import MessageInfo from './MessageInfo';

const Comment = props => {
    const { comment, author, removeComment } = props;

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
        <li className="comment">
            <MessageInfo
                author={author}
                date={comment.date}
            />

            {!isEditing ?
                <p className="comment__text">{text}</p>
                : <textarea
                    name="" id=""
                    className="comment__textarea"
                    onChange={e => setModifiedText(e.target.value)}>
                    {modifiedText}
                </textarea>
            }

            <div className="comment__footer">
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