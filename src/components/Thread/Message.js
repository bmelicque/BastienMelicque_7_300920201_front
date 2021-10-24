import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import LikeButton from './LikeButton';
import Thread from './Thread';
import MessageInfo from './MessageInfo';
import MessageActions from './MessageActions';
import { getComments, editPost, editComment } from '../../utils/axiosServices';
import { getCookie } from '../../utils/functions';

const Message = props => {
    const { message, messageType, author, removeSelf } = props;
    const userId = +getCookie("userId");
    const username = userId === author.id ? 'moi' : author.email.split('@')[0];

    const [isEditing, setIsEditing] = useState(false);
    const [modifiedText, setModifiedText] = useState(message.text);
    const [text, setText] = useState(message.text);
    const [commentList, setCommentList] = useState([]);
    const [displayCommentsModal, setDisplayCommentsModal] = useState(false);

    const classNames = {
        message: `message ${messageType === "post" && "message--post"}`,
        text: `message__text message__text--${messageType}`,
        edit: `message__text message__text--edit message__text--${messageType}`,
        footer: `message__footer ${messageType === "comment" ? "message__actions" : ""}`
    }

    // On load, fetches comments
    useEffect(async () => {
        setCommentList(await getComments(message.id));
    }, [message.id]);

    // When quitting edition mode, resets modifiedText
    useEffect(() => {
        if (!isEditing)
            setModifiedText(text);
    }, [isEditing, text])

    // Updates the post on the database
    const handleUpdate = async () => {
        if (!['post', 'comment'].includes(messageType)) return 0;

        const editMessage = messageType === 'post' ? editPost : editComment;

        if (!(await editMessage(message.id, modifiedText))) {
            setText(modifiedText);
            setIsEditing(false);
        }
    }

    return (
        <li className={classNames.message}>

            {messageType === "post" &&
                <MessageInfo author={author} date={message.date} />
            }

            {!isEditing ?
                <p
                    className={classNames.text}>
                    {messageType === "comment" &&
                        <span>{username}&nbsp;: </span>
                    }
                    {text}
                </p>
                : <textarea
                    name="text-edition" id="text-edition"
                    className={classNames.edit}
                    onChange={e => setModifiedText(e.target.value)}
                    value={modifiedText}>
                </textarea>
            }
            {message.mediaUrl &&
                <img
                    src={message.mediaUrl}
                    className="message__image"
                    alt=""
                />
            }

            <div className={classNames.footer}>
                {messageType === "post" &&
                    <div>
                        <button className="message__comment-list" onClick={() => setDisplayCommentsModal(!displayCommentsModal)}>
                            <i className="far fa-comment-alt"></i> {commentList.length}
                        </button>
                        <LikeButton
                            messageId={message.id}
                            usersLiked={message.usersLiked} />
                    </div>
                }

                <MessageActions
                    messageId={message.id}
                    authorId={author.id}
                    handleUpdate={handleUpdate}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    removeSelf={removeSelf}
                />
            </div>

            {displayCommentsModal &&
                <Thread
                    contentType="comment"
                    messageList={commentList}
                    users={props.users}
                    parentId={message.id}
                />
            }
        </li>
    );
};

export default Message;