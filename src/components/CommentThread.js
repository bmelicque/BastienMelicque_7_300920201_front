import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { createComment, deleteComment } from '../utils/axiosServices';
import Comment from './Comment';
import NewComment from './NewComment';

const CommentThread = props => {
    const { postId } = props;
    const [commentList, setCommentList] = useState(props.commentList);

    const addComment = async (postId, text) => {
        const newComment = await createComment(postId, text);
        setCommentList([newComment, ...commentList]);
    }

    const removeComment = async (commentId) => {
        if (!(await deleteComment(commentId)))
            setCommentList(commentList.filter(comment => comment.id !== commentId))
    }

    useEffect(() => {
        setCommentList(props.commentList);
    }, [props]);

    return (
        <div className="comment-thread">
            <NewComment postId={postId} addComment={addComment} />
            <ul>
                {commentList.map(comment =>
                    <Comment
                    key={`comment-${comment.id}`}
                        comment={comment}
                        author={props.users.filter(user => user.id === comment.userId)[0]}
                        removeComment={removeComment}
                    />
                )}
            </ul>
        </div>
    );
};

export default CommentThread;