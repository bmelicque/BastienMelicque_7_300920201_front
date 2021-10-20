import React, { useState } from 'react';

const NewPost = props => {
    const { addPost } = props;
    const [text, setText] = useState('');
    const [previewPicture, setPreviewPicture] = useState(null);
    const [file, setFile] = useState(null);

    const handlePicture = e => {
        setPreviewPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    return (
        <form action=""
            className="new"
            onSubmit={e => {
                e.preventDefault();
                addPost(text, file);
            }}>
            <textarea name="new-post" id="new-post"
                rows="10"
                className="new__input"
                placeholder="Quoi de neuf ?"
                onChange={e => setText(e.target.value)}
                value={text}>
            </textarea>
            <label htmlFor="file"
                className="form__label--file"
                tabindex="0" >
                <i class="fas fa-paperclip"></i>
                Joindre une image
            </label>
            <input type="file"
                name="file"
                id="file"
                className="new__file-input"
                accept=".jpg, .jpeg, .png"
                onChange={e => handlePicture(e)} />
            {previewPicture && <img src={previewPicture} alt="Prévisualisation" className="new__picture" />}
            <button type="submit" disabled={!text}>
                <i class="fas fa-paper-plane"></i>
                Envoyer
            </button>
        </form>
    );
};

export default NewPost;