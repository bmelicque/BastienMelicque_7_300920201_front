import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { getCookie } from '../utils/functions';

const MessageActions = props => {
    const { messageId, authorId, handleUpdate, isEditing, setIsEditing, removeSelf } = props;
    const [editionModal, setEditionModal] = useState(isEditing);
    const userId = +getCookie('userId');
    const userRole = getCookie('role');

    useEffect(() => {
        setEditionModal(isEditing)
    }, [props]);


    return (
        <div className="message__actions">
            {editionModal &&
                <button
                    className="post__send"
                    onClick={handleUpdate}>
                    <i class="fas fa-paper-plane"></i> Envoyer
                </button>
            }
            {
                (userId == authorId) &&
                <button
                    className="post__edit"
                    onClick={() => setIsEditing(!editionModal)}>
                    {editionModal ?
                        <>
                            <i class="fas fa-undo"></i> Annuler
                        </> :
                        <>
                            <i class="fas fa-edit"></i> Modifier
                        </>
                    }
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
                    <i class="fas fa-trash-alt"></i> Supprimer
                </button>
            }
        </div>
    );
};

export default MessageActions;