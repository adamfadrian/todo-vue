<script setup lang="ts">
import router from '@/router';
import { RouterLink } from 'vue-router'


const a =  localStorage.getItem('user')

console.log('test user', a)
const handleLogout = () => {
  localStorage.removeItem('user')
  router.push('/')
}

</script>

<template>
  <div class="flex justify-between gap-10 py-4 px-10 border-b-2 border-b-black mb-5">
    <nav class="flex gap-10">
      <RouterLink to="/home" class="text-2xl font-bold">Home</RouterLink>
      <RouterLink to="/newTask" class="text-2xl font-bold">Add New Task</RouterLink>
    </nav>
    <div class="flex">
      <v-menu
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }" >
    <div class="flex items-center gap-2">
      <v-btn
          color="blue"
          v-bind="props"
          icon="mdi-account"
          size="small"
        >
        </v-btn>
        <h1 class="font-semibold">{{ a }}</h1>
    </div>
      </template>

      <v-list>
        <v-list-item
         
        >
          <v-list-item-title >
            <v-btn @click="handleLogout">
              Logout
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
  </div>
</template>
