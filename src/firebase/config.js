import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBF6IdkXKbHZYQRqs8RycHw_jJsG7Zha6o",
  authDomain: "chathome-e9cb0.firebaseapp.com",
  projectId: "chathome-e9cb0",
  storageBucket: "chathome-e9cb0.appspot.com",
  messagingSenderId: "324575808962",
  appId: "1:324575808962:web:6053832edd32f6f5ad9a5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const firebase = () => {

    return { app, db }
}

export default firebase;