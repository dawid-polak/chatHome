import firebase from "./config.js";
import { ref, set } from "firebase/database";

const createNewChat = async (currentUser, activeUser) => {
    const { db } = firebase();
    const date = new Date();

    const chatId = `${currentUser}_${Math.round(Math.random(-1) * 10000000)}_${activeUser}`;
    const dateCreate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    const time = `${date.getHours()}:${date.getMinutes()}`;

    await set(ref(db, 'chats/' + chatId), {
        date: dateCreate
    });

    await set(ref(db, `users/${currentUser}/chats/` + chatId), {
        user: activeUser,
        time: time
    });

    await set(ref(db, `users/${activeUser}/chats/` + chatId), {
        user: currentUser,
        time: time
    });

    return { chatId }
}

export default createNewChat;