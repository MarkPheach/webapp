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
  </div>
</template>

<script setup>
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
