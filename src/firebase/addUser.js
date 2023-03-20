import { ref, set } from "firebase/database";
import firebase from "./config.js";


const addUser = (nick, date) => {
    const { db } = firebase();

    set(ref(db, 'users/' + nick), {
        date: date,
        active: true,
        chats: {}
    });
};

export default addUser;