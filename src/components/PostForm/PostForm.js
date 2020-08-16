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
                onChange={props.change}
            />
            <input
                type="text"
                placeholder="Message"
                className="field"
                name="message"
                onChange={props.change}
            />
            <button type="button" className="post" onClick={props.click}>Post</button>
        </div>
    );
};

export default PostForm;