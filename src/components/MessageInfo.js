import React from 'react';
import { getCookie, formatDate } from '../utils/functions';

const MessageInfo = props => {
    const { author, date } = props;
    const userId = +getCookie("userId");

    // Formats username and date of the post
    const username = userId == author.id ? 'moi' : author.email.split('@')[0];
    const formatedDate = formatDate(date);

    return (
        <div className="info">
            <div className="info__author">{username}</div>
            <div className="info__date">{formatedDate}</div>
        </div>
    );
};

export default MessageInfo;