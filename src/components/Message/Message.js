import React from 'react';
import './Message.css';

const Message = props => {
    return (
        <div className="message">
            <p>{props.date} <b>{props.author}:</b></p>
            <p>{props.message}</p>
        </div>
    );
};

export default Message;