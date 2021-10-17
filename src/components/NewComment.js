import React from 'react';
import { useState } from 'react/cjs/react.development';

const NewComment = props => {
    const { postId, addComment } = props;
    const [text, setText] = useState('');

    return (
        <form action=""
        className="new new--comment"
        onSubmit={e => {
            e.preventDefault();
            addComment(postId, text);
            setText('');
        }}>
            <textarea name="new-comment" id="new-comment"
                cols="30" rows="2"
                className="new__input"
                placeholder="Répondre..."
                onChange={e => setText(e.target.value)}
                value={text}>
            </textarea>
            <button type="submit" disabled={!text}>Envoyer</button>
        </form>
    );
};

export default NewComment;