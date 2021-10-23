import React, { useEffect, useState } from 'react';
import Message from './Message/index.js';
import { getUsersList, deletePost, deleteComment, createPost, createComment } from '../utils/axiosServices';
import NewMessage from './NewMessage.js';

const Thread = props => {
    const { contentType, parentId } = props;
    const [messageList, setMessageList] = useState(props.messageList);
    const [users, setUsers] = useState(props.users || []);

    const addPost = async (text, file) => {
        const newPost = await createPost(text, file);
        setMessageList([newPost, ...messageList]);
    }

    const addComment = async (postId, text) => {
        const newComment = await createComment(postId, text);
        setMessageList([newComment, ...messageList]);
    }

    const removeMessage = async messageId => {
        if (!['post', 'comment'].includes(contentType)) return 0;

        const deleteMessage = contentType === "post" ? deletePost : deleteComment;

        if (!(await deleteMessage(messageId)))
            setMessageList(messageList.filter(message => message.id !== messageId))
    }

    // Synchronizes the post list form the props with the one in the state
    useEffect(() => {
        setMessageList(props.messageList);
    }, [props])

    // Fetches users (in order to associate the right username to a post)
    useEffect(async () => {
        if (contentType === "post")
            setUsers(await getUsersList());
    }, [])


    return (!!users.length &&
        <div className={`${contentType === "comment" ? "comment-" : ""}thread`}>
            <NewMessage
                parentId={parentId}
                messageType={contentType}
                addMessage={contentType === "post" ? addPost : addComment}
            />
            <ul className="thread__list" key="thread-list">
                {messageList.map(message =>
                    <Message
                        key={`${contentType}-${message.id}`}
                        messageType={contentType}
                        message={message}
                        author={users.filter(user => user.id === message.userId)[0]}
                        users={users}
                        removeSelf={removeMessage}
                    />
                )}
            </ul>
            {contentType === "post" &&
                <p className="thread__end-msg">C'est déjà la fin !</p>
            }
        </div>
    );
};

export default Thread;