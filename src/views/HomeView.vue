<template>
     <div class="flex min-h-full items-center justify-center py-12 px-12 sm:px-6">
          <div class="w-full max-w-md space-y-8">
               <div>
                    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">Zacznij z kimś pisać!</h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                         <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Jak się nazwasz?</a>
                    </p>
               </div>
               <form @submit.prevent="handleAddUser" class="mt-8 space-y-6">
                    <div class="rounded-md">
                         <div class="flex justify-center">
                              <input v-model="nick" type="text" class="relative block w-64 rounded p-3 text-center" placeholder="Twój NICK" />
                         </div>
                    </div>
                    <p class="text-center text-xs text-red-500">{{ alert }}</p>
                    <div class="flex justify-center">
                         <button type="submit" class="group relative flex w-24 justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                   <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                              </span>
                              dalej
                         </button>
                    </div>
               </form>
          </div>
     </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import addUser from "../firebase/addUser.js";
import checkUserExist from "../firebase/checkUserExist.js";

export default {
     setup() {
          const nick = ref('');
          const alert = ref();
          const router = useRouter();

          const handleAddUser = async () => {
               const date = new Date();
               const fullTime = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

               if (nick.value === "") {
                    alert.value = "Wpisz NICK!";
               } else {
                    alert.value = "";
                    if (await checkUserExist(nick.value)) {
                         alert.value = "Podany NICK juz istnieje. Wpisz inny!";
                    } else {
                         addUser(nick.value, fullTime);
                         router.push({ name: 'chats', params: { user: nick.value}});
                         nick.value = '';
                    }
               }
          };

          return { nick, handleAddUser, alert };
     },
};
</script>

<style></style>
