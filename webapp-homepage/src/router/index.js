import { createRouter, createWebHistory } from 'vue-router'
import { useRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Login from '../pages/login.vue'
import sigup from '../pages/signup.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Sigup', component: sigup},
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router