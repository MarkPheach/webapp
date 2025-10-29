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
  <div class="w-full h-full">
    <!-- ส่วนหัว -->
    <div class="flex w-full h-1/6 items-center bg-blue-300 rounded-t-2xl">
      <div
        class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold ml-5 mr-7">
        12a
      </div>
      <div class="h-4/5 w-2/5 flex-col">
        <div class="font-semibold text-lg "> User name : Nameless </div>
        <div class="flex space-x-2">
          <button v-for="type in ['question', 'general']" :key="type" @click="postType = type" :class="[
            'px-3 py-1 rounded-full text-sm',
            postType === type
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700',
          ]">
            {{ type === 'question' ? 'คำถาม' : 'ทั่วไป' }}
          </button>
        </div>
      </div>
    </div>

    <!-- กล่องข้อความ -->
    <div class="h-3/6">
      <textarea v-model="question" rows="4" class="w-full h-full focus:ring-0 resize-none text-lg bg-gray-50 rounded-lg"
        placeholder="  คุณกำลังคิดอะไรอยู่"></textarea>
    </div>

    <!-- รูปภาพ -->
    <div class="full flex items-center justify-center mt-5 mb-5">
      <label class="w-1/5 cursor-pointer flex items-center space-x-2">
        <input type="file" class="hidden" accept="image/*" @change="onImageChange" />
        <span
          class="text-center w-full bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition">
          เพิ่มรูปภาพ
        </span>
      </label>
    </div>

    <!-- หมวดหมู่ -->
    <div class="flex items-center justify-between bg-sky-200">
      <div class="flex space-x-2">
        <button v-for="sub in ['math', 'science', 'thai']" :key="sub" @click="subject = sub" :class="[
          'px-4 py-1 rounded-full text-sm bg-gray-500',
          subject === sub
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-700',
        ]">
          {{ sub === 'math' ? 'คณิตศาสตร์' : sub === 'science' ? 'วิทยาศาสตร์' : 'ภาษาไทย' }}
        </button>
      </div>
      <button class="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition"
        @click="submitPost">
        โพสต์
      </button>
    </div>
  </div>
</template>
