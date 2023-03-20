<template>
    <router-link :to="{ name: 'chat', params: { currentUser: currentUser, chatId: data.chatId}}">
   
        <div class="w-full bg-slate-200 p-3 mt-2 rounded-xl flex justify-between cursor-pointer">
           <div>
               <h1 class="font-extrabold">{{ data.user }}</h1>
               <p class="text-xs m-1">{{ data.latest }}</p>
           </div>
           <div class="flex flex-col items-center">
               <p>{{ data.time }}</p>
               <!-- <div class="w-3 h-3 bg-blue-700 rounded-full mt-2"></div> -->
           </div>
   
        </div>
    
    </router-link>
</template>

<script>
export default {
    props: ["data", "currentUser"],
     setup(props) {

        return {}
     },
};
</script>

<style lang="scss" scoped></style>
