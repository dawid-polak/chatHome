import firebase from "./config.js";
import { ref, child, get } from "firebase/database";

const readAllChats = async (nick) => {
    const { db } = firebase();
    const refDb = ref(db);

    let chats;

    await get(child(refDb, `users/${nick}/chats`))
        .then((snapshot) => {
            if ( snapshot.exists()) {
               chats = snapshot.val();
            }
        }).catch(err => {
            console.log(err)
        }) 

    return {chats};
}

export default readAllChats;