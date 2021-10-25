import React, { useState } from 'react';
import { likePost } from '../../utils/axiosServices';
import { getCookie } from '../../utils/functions';

const LikeButton = props => {
    const { postId } = props;
    const userId = +getCookie('userId'); // '+' to convert string into number
    const [usersLiked, setUsersLiked] = useState(props.usersLiked ? props.usersLiked.split(' ').map(e => +e) : []);
    const [liked, setLiked] = useState(usersLiked.includes(userId));

    const handleLike = () => {
        const like = !liked;

        if (like) setUsersLiked([...usersLiked, userId]);
        else setUsersLiked(usersLiked.filter(user => user !== userId));
        setLiked(!liked);

        likePost(postId, like);
    }

    return (
        <button
            className={`like-btn ${liked && "like-btn--liked"}`}
            onClick={handleLike}>
                {liked ?
                    <i className="fas fa-heart"></i> :
                    <i className="far fa-heart"></i>
                }
             {`  ${usersLiked.length}`}
        </button>
    );
};

export default LikeButton;