import React from 'react';
import { useState } from 'react/cjs/react.development';

const NewComment = props => {
    const { postId, addComment } = props;
    const [text, setText] = useState('');

    return (
        <form action=""
            className="form form--comment"
            onSubmit={e => {
                e.preventDefault();
                addComment(postId, text);
                setText('');
            }}>
            <textarea name="new-comment" id="new-comment"
                rows="1"
                className="form__input form__input--comment"
                placeholder="Répondre..."
                onChange={e => setText(e.target.value)}
                value={text}>
            </textarea>
            <button type="submit" className="btn btn--red" disabled={!text}>
                <i class="fas fa-paper-plane"></i> Envoyer
            </button>
        </form>
    );
};

export default NewComment;