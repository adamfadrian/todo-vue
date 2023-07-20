/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { Field, Form, configure } from 'vee-validate';

const vuetify = createVuetify({
    components,
    directives,
  })



configure({
  validateOnInput: true, // Enable real-time validation on input
});

  
const app = createApp(App)
  
app.component('Field', Field);
app.component('ValidationForm', Form);
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
