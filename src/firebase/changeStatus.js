import firebase from "./config.js";
import { ref, update } from "firebase/database";

const changeStatus = async (nick, currentStatus) => {

    const { db } = firebase();

    const dbRef = ref(db, `users/${nick}`);

    await update(dbRef, {
        active: currentStatus
    }).then(() => {
    }).catch((err) => {
        console.log('nie udało sie')
    })

}

export default changeStatus;