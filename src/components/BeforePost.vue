<script setup>
import { ref } from 'vue'
import { usePostStore } from '../stores/postStore'

const emit = defineEmits(['close'])

const postStore = usePostStore()

const postType = ref('question')
const subject = ref('math')
const question = ref('')
const image = ref(null)
const author = ref('')

function onImageChange(e) {
  const file = e.target.files[0]
  if (file) {
    image.value = file
  } else {
    image.value = null
  }
}

function submitPost() {
  console.log('debug question:', question.value, typeof question.value)

  if (!question.value || !question.value.toString().trim()) {
    alert('กรุณากรอกข้อความก่อนโพสต์')
    return
  }

  postStore.addPost({
    type: postType.value,
    subject: subject.value,
    text: question.value,
    image: image.value,
  })

  // reset form
  question.value = ''
  image.value = null
  postType.value = 'question'
  subject.value = 'math'

  emit('close')
}
</script>

<template>
  <div>
    <!-- ส่วนหัว -->
    <div class="flex items-center mb-6">
      <div
        class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold mr-4"
      >
        12a
      </div>
      <div>
        <div class="font-semibold text-lg">ชื่อผู้โพสต์</div>
        <div class="flex space-x-2 mt-1">
          <button
            v-for="type in ['question', 'general']"
            :key="type"
            @click="postType = type"
            :class="[
              'px-3 py-1 rounded-full text-sm',
              postType === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700',
            ]"
          >
            {{ type === 'question' ? 'คำถาม' : 'ทั่วไป' }}
          </button>
        </div>
      </div>
    </div>

    <!-- กล่องข้อความ -->
    <div class="mb-4">
      <textarea
        v-model="question"
        rows="4"
        class="w-full border-none focus:ring-0 resize-none text-lg bg-gray-50 rounded-lg p-4"
        placeholder="คุณกำลังคิดอะไรอยู่"
      ></textarea>
    </div>

    <!-- รูปภาพ -->
    <div class="flex items-center justify-between mb-6">
      <div v-if="!image" class="text-gray-400">+ เพิ่มรายละเอียด</div>
      <div v-else class="flex items-center">
        <span class="text-green-600 mr-2">เพิ่มรูปภาพแล้ว</span>
        <span class="text-xs text-gray-500">{{ image.name }}</span>
      </div>
      <label class="cursor-pointer flex items-center space-x-2">
        <input
          type="file"
          class="hidden"
          accept="image/*"
          @change="onImageChange"
        />
        <span
          class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
        >
          เพิ่มรูปภาพ
        </span>
      </label>
    </div>

    <!-- หมวดหมู่ -->
    <div class="flex items-center justify-between">
      <div class="flex space-x-2">
        <button
          v-for="sub in ['math', 'science', 'thai']"
          :key="sub"
          @click="subject = sub"
          :class="[
            'px-4 py-1 rounded-full text-sm',
            subject === sub
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700',
          ]"
        >
          {{
            sub === 'math'
              ? 'คณิตศาสตร์'
              : sub === 'science'
              ? 'วิทยาศาสตร์'
              : 'ภาษาไทย'
          }}
        </button>
      </div>
      <button
        class="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition"
        @click="submitPost"
      >
        โพสต์
      </button>
    </div>
  </div>
</template>
