import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getMessages, postMessage, startInterval} from "../store/actions";
import './App.css';
import Message from "../components/Message/Message";
import PostForm from "../components/PostForm/PostForm";

function App() {
    const messenger = useSelector(state => state.messenger);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const [myMessage, setMyMessage] = useState({author: '', message: ''});

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(startInterval(messenger));
        }, 4000);
        return () => clearInterval(interval);
    }, [messenger, dispatch]);

    const newMessage = event => {
        const attr = event.target.name;
        const newField = {...myMessage};
        newField[attr] = event.target.value;
        setMyMessage(newField);
    }

    const changePost = () => {
        dispatch(postMessage(myMessage));
        setMyMessage({author: '', message: ''});
    }

    const messages = messenger.map((message) => {
        return (
            <Message
                key={message.datetime}
                date={message.datetime.substr(0, 19).replace('T', ' ')}
                author={message.author}
                message={message.message}
            />
        )
    });

    return (
        <div className="App">
            <PostForm
                change={newMessage}
                click={changePost}
                author={myMessage.author}
                message={myMessage.message}
                error={error.error}
            />
            {messages}
        </div>
    );
}

export default App;
