import { useEffect, useState } from 'react';
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import './App.css';

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email })
        console.log(token, user);

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const [user, setUser] = useState('');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');



  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats(chats => [...chats, data.val()])
      setTimeout(() => {
        updateHeight()

      }, 100)
    });
  }, [])


  const sendChat = () => {

    const chatRef = push(chatListRef);
    set(chatRef, {
      user, message: msg
    });
    setMsg('');
  };
  return (
    <div>
      {user.email ? null : <div>
        <div className="jumbotron">
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">This is a simple chatroom, an online platform or virtual space where multiple users can engage in real-time text-based communication with one another. </p>
          <p>Created by none other than Ankit Pandey, AIT Pune-21135</p>
          <hr className="my-4"/>
            <p className="lead">It uses Google Firebase which  offers a NoSQL, cloud-hosted database that enables developers to store and sync data in real time.</p>
            <p className="lead">Please sign in with google account to access chatroom</p>
            <p className="lead">
            <button type="button" className="btn btn-primary" onClick={e => { googleLogin() }}>SignIn wih Google</button>
            </p>
        </div>
      </div>}
      {user.email ? <div>
        <h3>User: {user.name}</h3>
        <div id="chat" className="chat-container">
          {chats.map((c, i) => (
            <div key={i} className={`container ${c.user.email === user.email ? 'me' : ''}`}>
              <p className="chatbox">
                <strong>{c.user.name}: </strong>
                <span>{c.message}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="btm">
          <input
            type="text"
            onInput={(e) => setMsg(e.target.value)}
            value={msg}
            placeholder="enter your chat"
          ></input>
          <button onClick={(e) => sendChat()}>Send</button>
        </div>
      </div> : null}
    </div>
  );
}

export default App;

// https://console.firebase.google.com/u/0/project/react-chat-app-c29e0/database/react-chat-app-c29e0-default-rtdb/data