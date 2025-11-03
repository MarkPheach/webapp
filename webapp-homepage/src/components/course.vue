<script setup>
import { ref } from 'vue'
import { usePost } from '../stores/post'
const postStore = usePost()

const subjects = ref([
  { id: 1, image: '/src/assets/ไทย.png', name: 'ภาษาไทย', status: 'เลือกวิชา' },
  { id: 2, image: '/src/assets/ภาพมังคุดเจาะ_768x510.png', name: 'Math', status: 'เลือกวิชา' },
  { id: 3, image: '1.jpg', name: 'Operating Systems', status: 'เลือกวิชา' },
  { id: 4, image: '1.jpg', name: 'Artificial Intelligence', status: 'เลือกวิชา' },
  { id: 5, image: '1.jpg', name: 'Web Programming', status: 'เลือกวิชา' },
  { id: 6, image: '1.jpg', name: 'Software Engineering', status: 'เลือกวิชา' },
  { id: 7, image: '1.jpg', name: 'Data Structures', status: 'เลือกวิชา' },
])

// handle click
function selectSubject(subject) {
  if (postStore.selectedSubject === subject.name) {
    // already selected → unselect
    postStore.selectedSubject = 'ทั้งหมด'
  } else {
    // select this one
    postStore.selectedSubject = subject.name
  }
}
</script>

<template>
  <div class="bg-sky-100 h-screen w-full flex flex-col items-center py-12">
    <h1 class="bg-sky-200 text-4xl font-bold rounded-3xl px-10 py-3 shadow-md relative">
      เลือกรายวิชา
    </h1>

    <div class="bg-sky-200 rounded-3xl w-[80%] h-[75%] mt-10 p-8 shadow-lg overflow-auto relative left-20">
      <div class="grid grid-cols-5 gap-6 justify-items-center">
        <div
          v-for="subject in subjects"
          :key="subject.id"
          class="bg-white rounded-2xl shadow-xl w-48 h-60 flex flex-col items-center justify-between text-center text-lg font-semibold hover:scale-105 transition-transform duration-300 p-3"
        >
          <img
            :src="subject.image"
            alt="subject image"
            class="w-full h-3/4 object-cover shadow-md"
          />
          <div>
            <h2 class="font-bold text-base mb-1">{{ subject.name }}</h2>

            <!-- ✅ Use button instead of input -->
            <button
              @click="selectSubject(subject)"
              class="px-3 py-1 rounded-full text-sm font-medium shadow-md transition duration-200"
              :class="{
                'bg-green-300 hover:bg-green-400': postStore.selectedSubject === subject.name,
                'bg-gray-200 hover:bg-gray-300': postStore.selectedSubject !== subject.name
              }"
            >
              {{ postStore.selectedSubject === subject.name ? 'ยกเลิก' : 'เลือกวิชา' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
