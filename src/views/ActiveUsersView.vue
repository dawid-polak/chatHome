<template>
     <nav class="w-full bg-white h-16 flex">
          <div class="flex self-center justify-center mx-5 cursor">
               <router-link :to="{ path: `/chats/${currentUser}` }">
                    <img class="w-5 h-5" src="../assets/icons/left-arrow.png" alt="left-arrow" />
               </router-link>
          </div>
          <div class="w-full h-full flex items-center justify-between">
               <h1 class="m-0 p-0 text-xl font-blod">Aktywni uzytkownicy</h1>
               <div class="flex">
                   <p class="font-thin">{{ currentUser }}</p>
                   <span class="w-2 h-2 bg-green-500 block rounded-full mt-1 ml-1 mr-4"></span>
               </div>
          </div>
     </nav>
     <main class="w-full flex justify-center">
          <section class="w-10/12 mt-5 h-96 overflow-auto">
               <BoxUser v-for="user in activeUsers" :key="user" :nick="user" :currentUser="currentUser"/>
          </section>
     </main>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from "vue-router";

import BoxUser from "../components/BoxUser.vue";
import readAllActiveUsers from "../firebase/readAllActiveUsers.js";


export default {
     components: {
          BoxUser,
     },
     props: ["currentUser"],
     setup() {
          const router = useRouter();
          const activeUsers = ref([]);
          
          const handleReadAllActiveUsers = async () => {
              const { users } = await readAllActiveUsers();


                    activeUsers.value.push(...users);

          }

          handleReadAllActiveUsers();

          return { router, activeUsers };
     },
};
</script>

<style lang="scss" scoped></style>
