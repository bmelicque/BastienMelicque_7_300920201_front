import React, { useState } from 'react';
import JoinButton from './JoinButton';

// If the message is an answer comment, it takes the parent ID as a prop
const NewMessage = props => {
    const { messageType, addMessage, parentId } = props;
    const [text, setText] = useState('');
    const [previewPicture, setPreviewPicture] = useState(null);
    const [file, setFile] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!['post', 'comment'].includes(messageType)) return 0;

        if (messageType === "post")
            await addMessage(text, file);
        else
            await addMessage(parentId, text);

        setText('');
        setPreviewPicture(null);
        setFile(null);
    }

    return (
        <form action=""
            className={`form form--${messageType}`}
            onSubmit={e => handleSubmit(e)}>

            {messageType === "post" &&
                <h1
                    className="form__title" >
                    <label htmlFor="new-post">
                        Quoi de neuf ?
                    </label>
                </h1>
            }

            <textarea name="new-post" id="new-post"
                rows={messageType === "post" ? "2" : "1"}
                className={`form__input form__input--${messageType}`}
                placeholder={messageType === "post" ?
                    "Racontez-le ici..." :
                    "Répondre..."}
                onChange={e => setText(e.target.value)}
                value={text}>
            </textarea>

            {messageType === "post" ?
                <JoinButton
                    previewPicture={previewPicture}
                    setPreviewPicture={setPreviewPicture}
                    file={file}
                    setFile={setFile}>
                    <button type="submit" className="btn btn--red" disabled={!text}>
                        <i className="fas fa-paper-plane"></i>  Envoyer
                    </button>
                </JoinButton> :
                <button type="submit" className="btn btn--red" disabled={!text}>
                    <i className="fas fa-paper-plane"></i>  Envoyer
                </button>
            }
        </form >
    );
};

export default NewMessage;