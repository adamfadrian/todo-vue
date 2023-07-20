<script setup lang="ts">
import router from '@/router'
import { useLoginStore } from '@/stores/login';
import axios from 'axios'
import { ref } from 'vue'

interface Register {
  username: string
  password: string
}

const loading = ref<boolean>(false)
const state = ref<Register>({
  username: '',
  password: ''
})

const handleRegister = async () => {
  const { username, password } = state.value
  if(!username && !password){
    alert('All field are required')
    return;
  }
  try {
    const res = await axios.post('http://localhost:3000/users', {
      username: username,
      password: password
    })
    if (res.data) {
      alert('register success')
      router.push('/')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full flex flex-col justify-end items-end">
      <div class="max-w-md">
        <img src="/todoist.png" alt="" class="object-fit" />
      </div>
    </div>
    <div class="w-full flex justify-start">
      <div
        class="flex flex-col w-full gap-10 items-center max-w-[500px] border-2 todoist rounded-lg p-5"
      >
        <h1 class="text-2xl font-semibold todoist-text">Register Form</h1>
        <v-form validate-on="submit lazy" class="w-full" @submit.prevent="handleRegister">
          <v-text-field
            label="Username"
            color="deep-orange"
            filled
            variant="outlined"
            v-model="state.username"
            required
          ></v-text-field>
          <v-text-field
          required
            filled
            variant="outlined"
            type="password"
            hint="please input the correct password!"
            label="Password"
            color="deep-orange"
            v-model="state.password"
          ></v-text-field>
          <div class="mt-10">
            <v-btn
              :loading="loading"
              type="submit"
              block
              class="mt-2"
              text="Submit"
              color="deep-orange"
            ></v-btn>
          </div>
          <div class="flex justify-center mt-2">
            <h1 class="text-sm">
              Already have an account? <RouterLink to="/" class="underline todoist-text">Login</RouterLink>
            </h1>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<style >
.todoist {
  border-color: #e44332;
}
.todoist-text {
  color: #e44332;
}
</style>
