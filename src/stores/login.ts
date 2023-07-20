import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('user', () => {
  const login = ref<boolean>(false)
  function isLogin() {
    login.value = true
  }

  function isLogout () {
    login.value = false;
  }
  return { login, isLogin ,isLogout}
})
