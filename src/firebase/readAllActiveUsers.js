
import firebase from "./config.js";
import { ref, onValue, get } from "firebase/database";

const readAllActiveUsers = async () => {


    const { db } = firebase();
    const usersDbRef= ref(db, 'users');

    let users = [];

    await get(usersDbRef)
        .then((snap) => {
            snap.forEach( user => {
                if (user.val().active) {

                    users.push(user.key)
                }
            })
        }).catch( err => console.log(err))

    return { users }
}

export default readAllActiveUsers;