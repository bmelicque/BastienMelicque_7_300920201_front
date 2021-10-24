import React from 'react';

const JoinButton = props => {
    const { previewPicture, setPreviewPicture, file, setFile } = props

    const handlePicture = e => {
        setPreviewPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    return (
        <>
            {previewPicture && <img src={previewPicture} alt="Prévisualisation" className="form__picture" />}

            <div className="form__row">
                {file ?
                    <button
                        className="btn"
                        onClick={() => {
                            setPreviewPicture(null);
                            setFile(null);
                        }} >
                        <i className="fas fa-trash-alt"></i> Supprimer l'image
                    </button>
                    : <>
                        <label htmlFor="file"
                            className="btn"
                            tabIndex="0" >
                            <i className="fas fa-paperclip"></i>  Joindre une image
                        </label>
                        <input type="file"
                            name="file"
                            id="file"
                            className="form__file-input"
                            accept=".jpg, .jpeg, .png"
                            onChange={e => handlePicture(e)} />
                    </>
                }
                {props.children}
            </div>
        </>
    );
};

export default JoinButton;