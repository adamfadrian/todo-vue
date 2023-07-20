<script setup lang="ts">
import HomeTodo from '@/components/HomeTodo.vue'
import router from '@/router'
import useTodoApi, { type Todo } from '@/use-todos'
import  NavBarVue from '../components/NavBar.vue';
import { ref } from 'vue'
const { createTodoTask } = useTodoApi()

interface NewTask {
  content: string
  description: string
  isCompleted?: boolean
}

const loading = ref<boolean>(false)
const state = ref<NewTask>({
  content: '',
  description: '',
  isCompleted: false
})

const addNewTask = async () => {
  loading.value = true
  const { content, description } = state.value
  if (content !== '') {
    const payload: Todo = {
      ...state.value
    }
    await createTodoTask(payload)
    router.push('/home')
  } else {
    alert('addTask Failed, u have fill the content')
  }
  loading.value = false
}
</script>

<template>
  <NavBarVue />
  <div class="w-full flex flex-col items-center gap-10 p-20">
    <h1 class="text-4xl font-semibold text-teal-600">New Todo Task</h1>
    <div class="p-10 flex border-2 rounded-md  w-fit">
      <v-sheet width="500" class="mx-auto p-2 border rounded">
        <v-form validate-on="submit lazy" @submit.prevent="addNewTask">
          <v-text-field v-model="state.content" label="Content" color="teal-lighten-1"></v-text-field>
          <v-text-field v-model="state.description" label="Description" color="teal-lighten-1"></v-text-field>
          <v-checkbox color="teal-lighten-1" v-model="state.isCompleted" ></v-checkbox>
          <v-btn :loading="loading" type="submit" block class="mt-2" text="Submit" color="teal-lighten-1"></v-btn>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>
