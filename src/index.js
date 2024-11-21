import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMOqeqLYROHc6xJigjO7hVHgAhh_N780Y",
  authDomain: "my-react-blog-2c040.firebaseapp.com",
  projectId: "my-react-blog-2c040",
  storageBucket: "my-react-blog-2c040.firebasestorage.app",
  messagingSenderId: "26500729156",
  appId: "1:26500729156:web:07a2b1eef86ae0edeaaf11",
};

// Initialize Firebase
// For more info, go to https://console.firebase.google.com/ then select 'My React Blog'
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
