import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from './plugins/vuetify/vuetify.js'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'  // ✅ โหลด font MDI
import './style.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)  // ✅ ใช้ Vuetify
  .mount('#app')
