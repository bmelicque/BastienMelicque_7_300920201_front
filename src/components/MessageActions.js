import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { getCookie } from '../utils/functions';

const MessageActions = props => {
    const { messageId, authorId, handleUpdate, isEditing, setIsEditing, removeSelf } = props;
    const [editionModal, setEditionModal] = useState(isEditing);
    const userId = +getCookie('userId');
    const userRole = getCookie('userRole');

    useEffect(() => {
        setEditionModal(isEditing)
    }, [props]);


    return (
        <div className="message__actions">
            {editionModal &&
                <button
                    className="post__send"
                    onClick={handleUpdate}>
                    Envoyer
                </button>
            }
            {
                (userId == authorId) &&
                <button
                    className="post__edit"
                    onClick={() => setIsEditing(!editionModal)}>
                    {editionModal ? 'Annuler' : 'Modifier'}
                </button>
            }
            {
                (userId == authorId || userRole == 'admin') &&
                <button
                    className="post__delete"
                    onClick={() => {
                        if (window.confirm('Voulez-vous vraiment supprimer ce message ?'))
                            removeSelf(messageId);
                    }}>
                    Supprimer
                </button>
            }
        </div>
    );
};

export default MessageActions;