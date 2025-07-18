import { createApp } from 'vue'
import App from './App.vue'
import router from './router'       // ✅ import router ที่สร้างไว้
import './style.css'

createApp(App)
  .use(router)                      // ✅ ใช้ router ก่อน mount
  .mount('#app')