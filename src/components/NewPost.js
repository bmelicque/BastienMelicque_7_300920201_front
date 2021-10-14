import axios from 'axios';
import React, { useState } from 'react';

const NewPost = () => {
    const [text, setText] = useState('');

    const sendNewPost = async e => {
        e.preventDefault();

        try {
            const token = document.cookie.split('=')[1];
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post`,
                data: {
                    text
                },
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
                onChange={e => setText(e.target.value)}>
            </textarea>
            <button type="submit">Envoyer</button>
        </form>
    );
};

export default NewPost;