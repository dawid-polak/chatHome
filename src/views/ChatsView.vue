<template>
     <nav class="w-full h-16 bg-white flex items-center justify-between">
          <h1 class="text-4xl ml-5 grow-1">Czaty</h1>
          <p class="font-thin mr-5">{{ user }}</p>
     </nav>
     <header class="w-full flex justify-center">
          <div class="w-48 flex justify-between mx-5 mt-5">
               <span class="ml-3 block text-sm font-medium text-white">Dostępny</span>
               <label class="relative inline-flex items-center mb-5 cursor-pointer">
                    <input @click="handleChangeStatus" type="checkbox" :value="status" class="sr-only peer" />
                    <div
                         class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
               </label>
          </div>
     </header>
     <aside class="w-full text-center bg-slate-700 py-3">
          <router-link :to="{ name: 'active-users', params: { currentUser: user } }"><p class="underline text-white">Sprawdź aktywnych uzytkowników</p></router-link>
     </aside>
     <main class="w-full flex flex-col items-center">
          <div class="w-11/12 mt-5 text-xl font-bold text-white flex justify-between items-center">Moje rozmowy <span class="font-thin underline text-xs mr-2" @click="refreshChat">odświez</span></div>

          <section class="w-10/12 h-96 overflow-auto mt-5">
               <BoxChat v-for="chat in allChats" :key="chat" :data="chat" :currentUser="user"/>
          </section>
          <!-- <div class="mt-5">
               <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">usuń uzytkownika</button>
          </div> -->
     </main>
</template>

<script>
import { ref } from "vue";
import BoxChat from "../components/BoxChat.vue";
import changeStatus from "../firebase/changeStatus.js";
import readAllChats from "../firebase/readAllChats.js";

export default {
     components: {
          BoxChat,
     },
     props: ["user"],
     setup(props) {
          //change user status
          const status = ref(false);
          const handleChangeStatus = async () => {
               status.value = !status.value;
               await changeStatus(props.user, status.value);
          };

          //download and write in document all chats
          const allChats = ref([]);
          const downloadChats = async () => {
               const { chats } = await readAllChats(props.user);

               for (const chat in chats) {

                    chats[chat]['chatId'] = `${chat}`;

                    allChats.value.push(chats[chat]);
               }
          };

          downloadChats();

          //refresh chat
          const refreshChat = () => {
               allChats.value = [];
               downloadChats();
          }

          return { status, handleChangeStatus, allChats, refreshChat };
     },
};
</script>

<style lang="scss" scoped></style>
