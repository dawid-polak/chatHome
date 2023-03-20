<template>
     <div class="flex" :class="{ 'justify-end': who }, 'justify-start'">
          <p class="p-3 pb-1 m-1 max-w-full text-xs text-white rounded-xl inline-block break-words" :class=" { 'bg-slate-800': who }, 'bg-slate-700' ">{{ text }} <br>
               <span class="time block pt-1">{{ time }}</span>
          </p>
     </div>
</template>

<script>
 
export default {
     props: ["who", "text", "time"],
     setup(props) {

          

          return {}

     },
};
</script>

<style lang="scss" scoped>

.time { 
     font-size: 8px;
     color: azure;
}
</style>
