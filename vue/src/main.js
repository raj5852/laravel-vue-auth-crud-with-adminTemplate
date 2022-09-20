import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import AdminHeader from './pages/layouts/Header.vue'

createApp(App).component('AdminHeader',AdminHeader).use(router).mount('#app')
