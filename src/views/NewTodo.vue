<script setup lang="ts">
import HomeTodo from '@/components/HomeTodo.vue'
import router from '@/router'
import useTodoApi, { type Todo } from '@/use-todos'
import type { Ref } from 'vue'
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
    const payload: Partial<Todo> = {
     ...state.value
    }
    await createTodoTask(payload)
    router.push('/about')
  } else {
    alert('addTask Failed, u have fill the content')
  }
  loading.value = false
}
</script>

<template>
  <div class="p-10 flex justify-center items-center mx-auto bg-orange-300 w-fit">
    <v-sheet width="500" class="mx-auto p-2 border rounded">
      <v-form validate-on="submit lazy" @submit.prevent="addNewTask">
        <v-text-field v-model="state.content" label="Content"></v-text-field>
        <v-text-field v-model="state.description" label="Description"></v-text-field>
        <v-checkbox color="indigo" v-model="state.isCompleted"></v-checkbox>
        <v-btn :loading="loading" type="submit" block class="mt-2" text="Submit"></v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
