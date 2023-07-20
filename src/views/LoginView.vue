<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useLoginStore } from '@/stores/login'



interface Login {
  username: string
  password: string
}

const loading = ref<boolean>(false)
const state = ref<Login>({
  username: '',
  password: ''
})

const { isLogin } = useLoginStore();

const getUsers = async () => {
  try {
    const res = await axios.get('http://localhost:3000/users')
    if (res) {
      return res.data
    }
    return []
  } catch (error) {
    console.log(error)
  }
}

const handleLogin = async () => {
  const { username, password } = state.value
  try {
    const users = await getUsers()
    const user = users.find(
      (user: Login) => user.username === username && user.password === password
    )

    if (user) {
      alert('login success')
      isLogin()
      localStorage.setItem('user', user.username)
      router.push('/home')
    } else {
      alert('Invalid credentials')
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(getUsers)
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
        class="flex flex-col w-full gap-10 items-center max-w-[500px]  border-2 todoist rounded-lg p-5"
      >
        <h1 class="text-2xl font-semibold todoist-text">Login Form</h1>
        <v-form validate-on="submit lazy" class="w-full" @submit.prevent="handleLogin">
          <v-text-field
            label="Username"
            color="deep-orange"
            filled
            variant="outlined"
            v-model="state.username"
          ></v-text-field>
          <v-text-field
            filled
            type="password"
            hint="please input the correct password!"
            label="Password"
            color="deep-orange"
            variant="outlined"
            v-model="state.password"
          ></v-text-field>
          <div class="mt-10">
            <v-btn
              :loading="loading"
              type="submit"
              block
              text="Submit"
              color="deep-orange"
            ></v-btn>
          </div>
          <div class="flex justify-center mt-2">
            <h1 class="text-sm">
              Don't have an account?
              <RouterLink to="/register" class="underline todoist-text">Sign up</RouterLink>
            </h1>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.todoist {
  border-color: #e44332;
}
.todoist-text {
  color: #e44332;
}
</style>
