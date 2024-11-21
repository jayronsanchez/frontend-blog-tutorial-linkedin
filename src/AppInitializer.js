import { useEffect, useState } from "react";
import App from "./App";
import axios from "axios";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const AppInitializer = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const getFirebaseApiKey = async () => {
      const response = await axios.get("/api/get-secret?name=firebaseApiKey");
      setApiKey(response?.data?.value);
    };

    getFirebaseApiKey();
  }, []);

  if (!!apiKey) {
    const firebaseConfig = {
      // Your web app's Firebase configuration
      // apiKey is stored securely. This is retrieved from the backend by retrieving the secret from akv
      apiKey: apiKey,
      authDomain: "my-react-blog-2c040.firebaseapp.com",
      projectId: "my-react-blog-2c040",
      storageBucket: "my-react-blog-2c040.firebasestorage.app",
      messagingSenderId: "26500729156",
      appId: "1:26500729156:web:07a2b1eef86ae0edeaaf11",
    };
    // Initialize Firebase
    // For more info, go to https://console.firebase.google.com/ then select 'My React Blog'

    initializeApp(firebaseConfig);
    return <App />;
  } else {
    return <h1>Loading</h1>;
  }
};
export default AppInitializer;
