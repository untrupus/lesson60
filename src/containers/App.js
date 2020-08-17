import React, {useState, useEffect} from 'react';
import './App.css';
import Message from "../components/Message/Message";
import PostForm from "../components/PostForm/PostForm";
import axios from 'axios';

function App() {
    const [messenger, setMessenger] = useState([]);
    const [myMessage, setMyMessage] = useState({author: '', message: ''});

    const getMessages = async () => {
        const response = await axios('http://146.185.154.90:8000/messages');
        let result = response.data;
        setMessenger(result);
    }

    const getNewMessages = async () => {
        const response = await axios('http://146.185.154.90:8000/messages');
        let result = response.data;
        let lastDate = result[result.length - 1].datetime;
        setInterval(async () => {
            let newResponse = await axios(`http://146.185.154.90:8000/messages?datetime=${lastDate}`);
            const newMessages = newResponse.data;
            if (newMessages.length !== 0) {
                const newMessenger = [...messenger];
                for (let i = 0; i < newMessages.length; i++) {
                    newMessenger.push(newMessages[i]);
                }
                setMessenger(newMessenger);
                lastDate = newMessages[newMessages.length - 1].datetime;
            }
        }, 2000);
    }

    useEffect(() => {
        getMessages().catch(console.error);
    }, []);

    getNewMessages().catch(console.error);


    const newMessage = event => {
        const attr = event.target.name;
        const newField = {...myMessage};
        newField[attr] = event.target.value;
        setMyMessage(newField);
    }

    const changePost = async () => {
        const url = 'http://146.185.154.90:8000/messages';
        const data = new URLSearchParams();
        if (myMessage.message !== '' && myMessage.author !== '') {
            data.set('message', myMessage.message);
            data.set('author', myMessage.author);
            await fetch(url, {
                method: 'post',
                body: data,
            });
        }
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
            />
            {messages}
        </div>
    );
}

export default App;
