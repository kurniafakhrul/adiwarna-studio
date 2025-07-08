import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia' // <-- 1. Impor Pinia

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia()) // <-- 2. Gunakan Pinia
app.use(router)

app.mount('#app')
