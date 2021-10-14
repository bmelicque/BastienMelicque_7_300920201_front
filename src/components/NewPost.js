import axios from 'axios';
import React, { useState } from 'react';
import { getCookie } from '../utils/functions';

const NewPost = () => {
    const [text, setText] = useState('');
    const [previewPicture, setPreviewPicture] = useState(null);
    const [file, setFile] = useState(null);

    const handlePicture = e => {
        setPreviewPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const sendNewPost = async e => {
        try {
            e.preventDefault();

            const token = getCookie('token');

            const data = new FormData();
            data.append('text', text);
            if (file) data.append('image', file);

            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post`,
                data,
                headers: { Authorization: `Bearer ${token}` }
            });
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form action="" className="new-post" onSubmit={sendNewPost}>
            <textarea name="new-post" id="new-post"
                cols="30" rows="10"
                className="new-post__input"
                placeholder="Écrivez un nouveau post..."
                onChange={e => setText(e.target.value)}
                value={text}>
            </textarea>
            <label htmlFor="file">Joindre une image</label>
            <input type="file"
                name="file"
                id="file"
                className="new-post__file-input"
                accept=".jpg, .jpeg, .png"
                onChange={e => handlePicture(e)} />
            {previewPicture && <img src={previewPicture} alt="L'image à envoyer" className="new-post__picture" />}
            <button type="submit" disabled={!text}>Envoyer</button>
        </form>
    );
};

export default NewPost;