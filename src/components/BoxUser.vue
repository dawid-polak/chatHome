<template>
     <main class="w-full flex justify-between items-center bg-slate-700 rounded mt-2">
          <p class="ml-4 my-3 text-white w-48 break-words">{{ nick }}</p>
          <button @click="handleCreateNewChats"  class="mr-4 bg-green-600 text-xs py-1 px-2 rounded text-white">napisz</button>
     </main>
</template>

<script>
import { useRouter } from 'vue-router'
import createNewChat from "../firebase/createNewChat";

export default {
     props: ["nick", "currentUser"],

     setup(props) {
        const router = useRouter();

        const handleCreateNewChats = async () => {

            const { chatId } = await createNewChat(props.currentUser, props.nick);

            router.push({ name: 'chat', params: { user: props.currentUser, chatId: chatId }});
        }

        return { handleCreateNewChats }
     },
};
</script>

<style lang="scss" scoped></style>
