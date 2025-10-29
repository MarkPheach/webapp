<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import BeforePost from './BeforePost.vue'
import Shop from './Shop.vue'
import Basket from './Basket.vue'   // <-- import ใหม่ (หลังจากเปลี่ยนชื่อไฟล์)
import { usePostStore } from '../stores/postStore'

const showBeforePost = ref(false)
const showShop = ref(false)
const showBasket = ref(false)     // <-- เพิ่มตัวแปรนี้
const postStore = usePostStore()
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex overflow-y-auto">
    <Sidebar />
    <!-- Main Content -->
    <div class="bg-sky-200 flex-1 flex justify-center items-start pt-12 relative">
      <div class="mb-15 bg-white w-full max-w-5xl p-8 rounded-2xl shadow-2xl min-h-[800px]">

        <!-- Floating Action Button: Basket -->
        <button
          @click="showBasket = !showBasket"
          class="fixed right-12 bottom-28 z-50 bg-yellow-200 hover:bg-yellow-300 text-yellow-700 rounded-full p-4 shadow-lg transition-colors"
          aria-label="Basket"
          type="button"
        >
          <!-- ไอคอนรถเข็นของ (shopping cart) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>

        <!-- Floating Action Button: Pencil -->
        <button
          @click="showBeforePost = true"
          class="fixed right-12 bottom-12 z-50 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-4 shadow-lg transition-colors"
          aria-label="สร้างโพสต์ใหม่"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V21h8" />
          </svg>
        </button>

        <!-- รายการโพสต์ -->
        <div class="mt-10 space-y-6">
          <div
            v-for="(post, index) in postStore.posts"
            :key="index"
            class="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div class="text-gray-800 text-base leading-relaxed mb-4">
              {{ post.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: BeforePost -->
    <div v-if="showBeforePost" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 relative">
        <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl" @click="showBeforePost = false">&times;</button>
        <BeforePost @close="showBeforePost = false" />
      </div>
    </div>

    <!-- Modal: Shop -->
    <div v-if="showShop" class="fixed inset-0 z-50 flex items-start justify-end bg-black/40 pt-12">
      <div class="bg-sky-100 rounded-2xl shadow-xl w-full max-w-5xl h-[80vh] p-6 m-6 overflow-auto relative">
        <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl" @click="showShop = false">&times;</button>
        <Shop />
      </div>
    </div>

    <!-- Modal: Basket -->
    <div v-if="showBasket" class="fixed inset-0 z-50 flex items-center justify-end bg-black/40 pt-12">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md h-[80vh] p-4 m-6 overflow-auto relative">
        <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl" @click="showBasket = false">&times;</button>
        <Basket />
      </div>
    </div>
  </div>
</template>