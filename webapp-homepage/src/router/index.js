import { createRouter, createWebHistory } from 'vue-router'
import { useRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Login from '../pages/login.vue'
import sigup from '../pages/signup.vue'
import HomeShop from '../pages/HomeShop.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: sigup},
  { path: '/HomePage', name: 'HomePage', component: HomePage},
  { path: '/Homeshop', name: 'HomeShop', component: HomeShop},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router