<script setup lang="ts">
import useTodoApi, { type Todo } from '@/use-todos'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { isProxy, toRaw } from 'vue'

defineProps({
  content: String,
  isCompleted: Boolean,
  description: String
})

const edit = ref<{ [key: string]: boolean }>({})
const editedTodo = ref<Partial<Todo>>({})

const { fetchTodoList, todos, deleteTodoTask, editTodoTask } = useTodoApi()

console.log('todos', todos)

const handleEdit = (id: string) => {
  edit.value[id] = true
  const todo = todos.find((todo) => todo.id === id)
  if (todo) {
    editedTodo.value = { ...todo }
  }
}

const saveEdit = async (id: string) => {
  const updatedTodo = { ...editedTodo.value }
  updatedTodo.id = id; // Set the id of the updated todo

  await editTodoTask(updatedTodo) // Call editTodoTask with the updated todo

  edit.value[id] = false // Reset the edit flag
}

const cancelEdit = (id: string) => {
  edit.value[id] = false
}
</script>

<template>
  <div class="grid grid-cols-2 gap-5  ">
    <div v-for="todo in todos" :key="todo.id">
      <div v-if="!edit[todo.id]" class="flex flex-col gap-4 rounded-md border-2 border-green-400 p-5 ">
        <div class="flex border rounded-lg p-3 w-full justify-between min-w-[200px]">
          <h1 class="font-semibold">{{ todo.content }}</h1>
          <input type="checkbox" :checked="todo.isCompleted" />
        </div>
        <hr />
        <div class="flex flex-col border p-3 rounded-md max-w-20">
          <h1 class="text-lg">{{ todo.description }}</h1>
        </div>

        <div class="flex gap-4 justify-end">
          <v-btn icon="mdi-pencil-outline" @click="handleEdit(todo.id)"></v-btn>
          <v-btn icon="mdi-delete-outline" @click="deleteTodoTask(todo.id)"></v-btn>
        </div>
      </div>

      <div v-else class="flex flex-col gap-4 border-2 border-purple-300 rounded p-5">
        <div class="flex border rounded-lg p-3 w-full justify-between min-w-[200px]">
          <input v-model="editedTodo.content" />
          <input type="checkbox" v-model="editedTodo.isCompleted" />
        </div>
        <hr />
        <div class="flex flex-col border p-3 rounded-md max-w-20">
          <textarea v-model="editedTodo.description"></textarea>
        </div>

        <div class="flex gap-4 justify-end">
          <v-btn icon="mdi-check" @click="saveEdit(todo.id)"></v-btn>
          <v-btn icon="mdi-close" @click="cancelEdit(todo.id)"></v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
