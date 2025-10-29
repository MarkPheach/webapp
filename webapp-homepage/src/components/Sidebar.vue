<script setup>
import { ref } from 'vue'
import ProfileCard from '../InfoCard/ProfileCard.vue'

const menuItems = [
  { icon: 'mdi-text-box', text: 'User:.....', route: '/' },
  { text: 'User:.....', route: '/' },
  { text: 'ID:673380XXX-X', route: '/' },
  { text: 'Course:CP.CY', route: '/' },
  { divider: true },
  { icon: 'mdi-briefcase', text: 'Inventory', route: '/inventory' },
  { icon: 'mdi-store', text: 'Shop', route: '/shop' },
  { icon: 'mdi-book-open-variant', text: 'รายวิชาที่ลงเรียน', route: '/courses' }
]
</script>

<template>
  <div class="flex relative w-1/6 bg-red-100">
    <!-- Sidebar -->
    <aside class="w-1/5 bg-red-100 text-gray-800 min-h-screen shadow-xl fixed bottom-0 left-0 overflow-y-auto">
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
                class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <v-icon class="mr-4">{{ item.icon }}</v-icon>
                <span class="text-sm font-medium">{{ item.text }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.router-link-active {
  background-color: #f3f4f6;
  color: #1d4ed8;
}
</style>
