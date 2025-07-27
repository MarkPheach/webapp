<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const postType = ref('question')
const postTypes = [
  { label: 'คำถาม', value: 'question' },
  { label: 'ทั่วไป', value: 'general' }
]

const subject = ref('math')
const subjects = [
  { label: 'คณิตศาสตร์', value: 'math' },
  { label: 'วิทยาศาสตร์', value: 'science' },
  { label: 'ภาษาไทย', value: 'thai' }
]

const question = ref('')
const image = ref(null)

function onImageChange(e) {
  const file = e.target.files[0]
  if (file) image.value = file
}
</script>

<template>
        <!-- ส่วนหัว -->
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold mr-4">
            12a
          </div>
          <div>
            <div class="font-semibold text-lg">ชื่อผู้โพสต์</div>
            <div class="flex space-x-2 mt-1">
              <button
                v-for="type in postTypes"
                :key="type.value"
                @click="postType = type.value"
                :class="[
                  'px-3 py-1 rounded-full text-sm',
                  postType === type.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                ]"
              >
                {{ type.label }}
              </button>
            </div>
          </div>
        </div>
        <!-- ส่วนกลาง -->
        <div class="mb-4">
          <textarea
            v-model="question"
            rows="4"
            class="w-full border-none focus:ring-0 resize-none text-lg bg-gray-50 rounded-lg p-4"
            :placeholder="'คุณกำลังคิดอะไรอยู่'"
          ></textarea>
        </div>
        <!-- เพิ่มรายละเอียด/รูปภาพ -->
        <div class="flex items-center justify-between mb-6">
          <div v-if="!image" class="text-gray-400">+ เพิ่มรายละเอียด</div>
          <div v-else class="flex items-center">
            <span class="text-green-600 mr-2">เพิ่มรูปภาพแล้ว</span>
            <span class="text-xs text-gray-500">{{ image.name }}</span>
          </div>
          <label class="cursor-pointer flex items-center space-x-2">
            <input type="file" class="hidden" accept="image/*" @change="onImageChange" />
            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition">เพิ่มรูปภาพ</span>
          </label>
        </div>
        <!-- ส่วนล่าง -->
        <div class="flex items-center justify-between">
          <div class="flex space-x-2">
            <button
              v-for="sub in subjects"
              :key="sub.value"
              @click="subject = sub.value"
              :class="[
                'px-4 py-1 rounded-full text-sm',
                subject === sub.value
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              ]"
            >
              {{ sub.label }}
            </button>
          </div>
          <button class="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
            โพสต์
          </button>
        </div>
</template>