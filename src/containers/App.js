import React, {useState, useEffect} from 'react';
import './App.css';
import Message from "../components/Message/Message";
import PostForm from "../components/PostForm/PostForm";
import axios from 'axios';

function App() {
    const [messenger, setMessenger] = useState([]);
    const [myMessage, setMyMessage] = useState({author: '', message: ''});
    const [post, setPost] = useState({author: '', message: ''});

    const getMessages = async () => {
        const result = await axios('http://146.185.154.90:8000/messages');
        setMessenger(result.data);
    }

    const postMessage = async () => {
        const url = 'http://146.185.154.90:8000/messages';
        const data = new URLSearchParams();
        if (post.message !== '' && post.author !== '') {
            data.set('message', post.message);
            data.set('author', post.author);
            await fetch(url, {
                method: 'post',
                body: data,
            });
        }
    }

    useEffect(() => {
        setInterval(() => {
            getMessages().catch(console.error);
        }, 2000);
    }, []);

    useEffect(() => {
        postMessage().catch(console.error);
    }, [post]);

    const newMessage = event => {
        const attr = event.target.name;
        const newField = {...myMessage};
        newField[attr] = event.target.value;
        setMyMessage(newField);
    }

    const changePost = () => {
        setPost(myMessage)
        setMyMessage({author: '', message: ''})
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
            />
            {messages}
        </div>
    );
}

export default App;
