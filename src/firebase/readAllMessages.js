import { get, ref, child } from "firebase/database";
import firebase from "./config.js";


const readAllMessages = async (chatId) => {

    const { db } = firebase();
    const chatsRef = ref(db);
    let messages;

    await get(child(chatsRef, `chats/${chatId}`)).then((snapshot) => {
        messages = snapshot.val();
    }).catch(err => console.log(err.messages))

    return messages;
};

export default readAllMessages;