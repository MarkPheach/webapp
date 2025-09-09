import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' // ✅ import Pinia
import router from './router'       // ✅ import router ที่สร้างไว้
import './style.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)               // ✅ ใช้ Pinia
  .use(router)                      // ✅ ใช้ router ก่อน mount
  .mount('#app')  