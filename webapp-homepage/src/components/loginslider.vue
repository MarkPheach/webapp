<template>
  <div class="relative h-full w-full overflow-hidden">
    <div v-for="(slide, i) in slides" :key="slide.id" 
         class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
         :class="i === currentIndex ? 'opacity-100' : 'opacity-0'">
      <img 
        :src="slide.image" 
        class="w-full h-full object-cover"
      />
    </div>
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex">
    <span v-for="(slide, i) in slides" :key="slide.id" 
        class="mx-1 cursor-pointer text-2xl"
        :class="i === currentIndex ? 'text-blue-500' : 'text-white'"
        @click="currentIndex = i">
      &#9679;
    </span>
</div>   
  </div>
</template>

<script setup>
import 'primeicons/primeicons.css'
import { ref, onMounted, onUnmounted } from 'vue'

// รับ props จาก parent
const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.slides.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
