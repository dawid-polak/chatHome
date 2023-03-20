<template>
    <nav class="w-full bg-white h-16 flex ">
        <div class="flex self-center justify-center mx-5 cursor">
            <router-link :to="{ name: 'chats', params: { user: currentUser } }">
                <img class="w-5 h-5" src="../assets/icons/left-arrow.png" alt="left-arrow">
            </router-link>
        </div>
        <div class="flex flex-col self-center">
            <h1 class="m-0 p-0 text-xl font-blod">{{  }}</h1>
            <h5 class="m-0 p-0 text-xs font-thin text-green-700">online</h5>
        </div>
    </nav> 
    <main class="h-[calc(100%_-_4rem)] flex flex-col items-center justify-between">
        <section class="h-4/5 my-5 bg-slate-900 rounded-xl p-10 w-11/12 overflow-auto">
            <!-- currentUser ? who === true : whu === fasle -->
                <Message v-for="messages in allMessages" :key="messages" :who="messages.user === currentUser" :text="messages.text" :time="messages.time"/>
        </section>
        <section class="h-20 w-full bg-white place-items-end flex justify-center items-center">
            <form @submit.prevent="handleSendMessage" class="w-11/12 flex">
                <textarea v-model="newMessage" class="w-4/5 p-2 border-solid border-current" rows="1" placeholder="Napisz wiadomość"></textarea>
                <button class="mx-auto">
                    <img class="w-6 h-6" src="../assets/icons/send.png" alt="send">
                </button>
            </form>
        </section>
    </main>
</template>

<script>
import { ref } from 'vue';

import Message from '../components/Message.vue';
import MessegeRecived from '../components/MessegeRecived.vue';

import readAllMessages from '../firebase/readAllMessages.js';
import sendMessage from '../firebase/sendMessage.js';

export default {
    props: ['currentUser', 'chatId'],
    components: {
        Message,
        MessegeRecived
    },
    setup(props) {

        const newMessage = ref('');
        const allMessages = ref();;


        //notateczka do logiki, nie musimy na frontcie dodać wiadomośc, wszystko ma się dzieć po stronie serwera automatycznie odświezać
        const handleSendMessage = async () => {
            const date = new Date();
            const fullTime = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

            const { messages } = await readAllMessages(props.chatId);
            let idNewMessages;

            if (!messages) {
                idNewMessages = 0;
            } else {
                idNewMessages = messages.length;
            }

            if (!newMessage.value) {
                return
            }

            await sendMessage(props.chatId, idNewMessages, newMessage.value, props.currentUser, fullTime);
            handleReadAllMessages();
            newMessage.value = '';
        };

        const handleReadAllMessages = async () => {
            const { messages } = await readAllMessages(props.chatId);
            allMessages.value = messages;
        };

        setInterval(() => {
            handleReadAllMessages();
        }, 500);

        return { allMessages, newMessage, handleSendMessage }
    }
}

</script>

<style lang="scss" scoped>

</style>