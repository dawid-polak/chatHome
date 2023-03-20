import firebase from "./config.js";
import { ref, child, get } from 'firebase/database';

let exist;

const checkUserExist = async (nick) => {
    const { db } = firebase();
    const dbRef = ref(db);

    await get(child(dbRef, `users/${nick}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                exist = true;
            } else {
                exist = false;
            }
        }).catch((err) => {
            console.log(err);
            exist = false;
        });
    
    return exist;
};

export default checkUserExist;