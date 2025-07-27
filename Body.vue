<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import BeforePost from './ฺBeforePost.vue'

const showBeforePost = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex overflow-y-auto">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-md">
      <Sidebar />
    </div>
    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center relative">
      <div class="bg-white max-w-3xl w-full p-8 rounded-2xl shadow-md min-h-[800px] min-w-[1200px] relative">
        <!-- ปุ่มกากบาทด้านขวาบน (แสดงเฉพาะตอน showBeforePost) -->
        <!-- ปุ่มดินสอ (Floating Action Button) -->
        <button
          @click="showBeforePost = true"
          class="fixed right-12 bottom-12 z-50 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-4 shadow-lg transition-colors"
          aria-label="สร้างโพสต์ใหม่"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V21h8" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Overlay and Modal for BeforePost -->
    <div v-if="showBeforePost" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative">
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          @click="showBeforePost = false"
          aria-label="ปิด BeforePost"
        >
          &times;
        </button>
        <BeforePost />
      </div>
    </div>
  </div>
</template>
