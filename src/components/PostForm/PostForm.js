import React from 'react';
import './PostForm.css';

const PostForm = props => {
    return (
        <div className="PostForm">
            <input
                type="text"
                placeholder="Author"
                className="field"
                name="author"
                value={props.author}
                onChange={props.change}
            />
            <input
                type="text"
                placeholder="Message"
                className="field"
                name="message"
                value={props.message}
                onChange={props.change}
            />
            <button type="button" className="post" onClick={props.click}>Post</button>
            <p className="error">{props.error}</p>
        </div>
    );
};

export default PostForm;