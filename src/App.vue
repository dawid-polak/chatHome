<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class=" w-full h-full max-w-md max-h-full bg-slate-800">
      <Navbar />
      <RouterView />
    </div>
  </div>
 

</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  setup() {

  }
}
</script>

<style lang="scss" scoped>

</style>
