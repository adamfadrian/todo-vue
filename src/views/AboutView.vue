<script setup lang="ts">
import router from '@/router';
import HomeTodo from '../components/HomeTodo.vue'

const navigate = () => {
  router.push('/newTask')
}
</script>

<template>
  <div class="flex flex-col gap-10 p-5 border mx-3 rounded ">
    <div class="flex justify-between items-center p-2">
      <h1 class="text-xl font-bold">List of Todos</h1>
      <v-btn icon="mdi-plus" @click="navigate"></v-btn>
    </div>
   <hr />

    <HomeTodo />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
