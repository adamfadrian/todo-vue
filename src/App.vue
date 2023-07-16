<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav class="flex gap-10 py-4 px-10 ">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/newTask">Add New Task</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
