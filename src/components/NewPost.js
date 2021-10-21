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
            className="form form--post"
            onSubmit={async e => {
                e.preventDefault();
                await addPost(text, file);
                setText('');
                setPreviewPicture(null);
                setFile(null);
            }}>

            <h1
                className="form__title" >
                Quoi de neuf ?
            </h1>

            <textarea name="new-post" id="new-post"
                rows="2"
                className="form__input"
                placeholder="Racontez-le ici..."
                onChange={e => setText(e.target.value)}
                value={text}>
            </textarea>
            {previewPicture && <img src={previewPicture} alt="Prévisualisation" className="new__picture" />}
            <div className="form__row">
                {file ?
                    <button
                        className="btn"
                        onClick={() => {
                            setPreviewPicture(null);
                            setFile(null);
                        }} >
                        <i class="fas fa-trash-alt"></i> Supprimer l'image
                    </button>
                    : <>
                        <label htmlFor="file"
                            className="btn"
                            tabindex="0" >
                            <i class="fas fa-paperclip"></i>  Joindre une image
                        </label>
                        <input type="file"
                            name="file"
                            id="file"
                            className="form__file-input"
                            accept=".jpg, .jpeg, .png"
                            onChange={e => handlePicture(e)} />
                    </>
                }

                <button type="submit" className="btn btn--red" disabled={!text}>
                    <i class="fas fa-paper-plane"></i>  Envoyer
                </button>
            </div>
        </form>
    );
};

export default NewPost;