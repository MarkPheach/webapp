<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import BeforePost from './BeforePost.vue'
import { usePostStore } from '../stores/postStore'

const showBeforePost = ref(false)
const postStore = usePostStore()

</script>

<template>
  <div class="min-h-screen bg-gray-100 flex overflow-y-auto">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-2xl">
      <Sidebar />
    </div>

    <!-- Main Content -->
    <div class="bg-blue-400 flex-1 flex justify-center items-start pt-12 relative">
      <div class="mb-15 bg-white w-full max-w-5xl p-8 rounded-2xl shadow-2xl min-h-[800px]">
        <!-- Floating Action Button -->
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
            <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
              <div>
                ประเภท: <span class="font-medium">{{ post.type === 'question' ? 'คำถาม' : 'ทั่วไป' }}</span>
              </div>
              <div>
                หมวด: <span class="font-medium">{{
                  post.subject === 'math' ? 'คณิตศาสตร์' : post.subject === 'science' ? 'วิทยาศาสตร์' : 'ภาษาไทย'
                }}</span>
              </div>
            </div>
            <div class="text-gray-800 text-base leading-relaxed mb-4">
              {{ post.text }}
            </div>
            <div v-if="post.image" class="mt-2">
              <img :src="URL.createObjectURL(post.image)" alt="image" class="max-h-64 rounded-lg object-cover w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showBeforePost"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 relative">
        <!-- ปุ่มปิด modal -->
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          @click="showBeforePost = false"
          aria-label="ปิด"
          type="button"
        >
          &times;
        </button>

        <BeforePost @close="showBeforePost = false" />
      </div>
    </div>
  </div>
</template>
