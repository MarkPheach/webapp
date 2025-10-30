<script setup>
import { ref } from 'vue'
import ProfileCard from '../InfoCard/ProfileCard.vue'
import Shop from './Shop.vue' 

const menuItems = [
  { icon: 'mdi-text-box', text: 'User:.....', route: '/' },
  { text: 'User:.....', route: '/' },
  { text: 'ID:673380XXX-X', route: '/' },
  { text: 'Course:CP.CY', route: '/' },
  { divider: true },
  { icon: 'mdi-briefcase', text: 'Inventory', route: '/inventory' },
  { icon: 'mdi-store', text: 'Shop'},
  { icon: 'mdi-book-open-variant', text: 'รายวิชาที่ลงเรียน', route: '/courses' }
]
</script>

<template>
    <aside class="w-1/7 bg-white-100 text-gray-800 min-h-screen shadow-xl fixed top-1/10 left-0 overflow-y-auto z-49">
      <div class="flex flex-col h-full">
        <!-- Menu Items -->
        <div class="flex-1 py-6">
          <div class="space-y-2">
            <div v-for="(item, index) in menuItems" :key="index">
              <!-- Divider -->
              <hr v-if="item.divider" class="my-4 border-gray-200">
              
              <!-- Menu Item -->
              <router-link
                v-else
                :to="item.route"
                class="group flex items-center px-6 py-3 text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200"
              >
                <v-icon class="mr-4 text-gray-500 group-hover:text-gray-900">{{ item.icon }}</v-icon>
                <span class="text-sm font-medium">{{ item.text }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </aside>
</template>

<style scoped>
.router-link-active {
  background-color: #f3f4f6;
  color: #1d4ed8;
}
</style>
