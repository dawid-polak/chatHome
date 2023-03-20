import firebase from "./config.js";
import { ref, set } from 'firebase/database';


const sendMessage = async (chatId, idNewMessage, text, user, date) => {

    const { db } = firebase();

    await set(ref(db, `/chats/${chatId}/messages/` + idNewMessage), {
        text: text,
        user: user,
        time: date,
    })
 
};

export default sendMessage;