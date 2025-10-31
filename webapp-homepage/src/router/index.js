import { createRouter, createWebHistory } from 'vue-router'
import { useRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import Login from '../pages/login.vue'
import sigup from '../pages/signup.vue'
import HomeInventory from '../pages/HomeInventory.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Sigup', component: sigup},
  { path: '/HomeInventory', name: 'HomeInventory', component: HomeInventory },
  { path: '/Homepage', name: 'HomePage', component: HomePage },
  { path: '/HomeCourse', name: 'HomeCourse', component: () => import('../pages/HomeCourse.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router