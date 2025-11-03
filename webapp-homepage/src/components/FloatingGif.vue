<template>
  <div
    class="fixed z-[9999] cursor-move"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown="startDrag"
  >
    <img :src="chibiGif" alt="floating gif" class="w-32 h-auto select-none" draggable="false" />
  </div>
</template>

<script setup>
import chibiGif from '../assets/chibi1.gif'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const position = ref({ x: 100, y: 100 })
let isDragging = false
let offset = { x: 0, y: 0 }

function startDrag(event) {
  isDragging = true
  offset.x = event.clientX - position.value.x
  offset.y = event.clientY - position.value.y
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(event) {
  if (isDragging) {
    position.value.x = event.clientX - offset.x
    position.value.y = event.clientY - offset.y
  }
}

function stopDrag() {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

onBeforeUnmount(stopDrag)

// 💾 Remember position
watch(position, (val) => {
  localStorage.setItem('floatingGifPos', JSON.stringify(val))
}, { deep: true })

onMounted(() => {
  const saved = localStorage.getItem('floatingGifPos')
  if (saved) position.value = JSON.parse(saved)
})
</script>