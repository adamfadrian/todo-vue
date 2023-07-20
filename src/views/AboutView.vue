<script setup lang="ts">
import router from '@/router'
import HomeTodo from '../components/HomeTodo.vue'
import { useCounterStore } from '@/stores/counter'


const navigate = () => {
  router.push('/newTask')
}


const store = useCounterStore()
</script>

<template>
  <div class="flex flex-col gap-10 p-5 border mx-3 rounded">
    <h1>test state</h1>
    <h1>Double Count {{ store.doubleCount }}</h1>
    <h1>this is first counter {{ store.count }}</h1>
    <div class="flex gap-4 ">
      <button @click="store.increment()" class="border w-fit px-4 rounded hover:opacity-75 bg-blue">
        +
      </button>
      <button @click="store.decrement()" class="border w-fit px-4 rounded hover:opacity-75 bg-blue">
        -
      </button>
    </div>
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
