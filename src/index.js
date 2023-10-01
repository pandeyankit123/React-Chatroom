import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9DudokecV6IBfNEoAAHkeROCx8_o3_6g",
  authDomain: "react-chat-app-c29e0.firebaseapp.com",
  databaseURL: "https://react-chat-app-c29e0-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-c29e0",
  storageBucket: "react-chat-app-c29e0.appspot.com",
  messagingSenderId: "518102159238",
  appId: "1:518102159238:web:925e971a8a6145a763e607"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
