<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import FloatingGif from './components/FloatingGif.vue' // adjust path if needed

// Control whether the floating GIF is shown
const showGif = ref(false)

// Optional: persist across page reloads
onMounted(() => {
  const saved = localStorage.getItem('showFloatingGif')
  if (saved === 'true') showGif.value = true
})

// Function to toggle GIF visibility
function toggleGif() {
  showGif.value = !showGif.value
  localStorage.setItem('showFloatingGif', showGif.value)
}
</script>

<template>
  <div>
    <!-- Render the routed page -->
    <RouterView />

    <!-- Floating GIF always visible if showGif is true -->
    <FloatingGif v-if="showGif" />

    <!-- Optional toggle button -->
    <button
      @click="toggleGif"
      class="fixed bottom-5 right-5 bg-blue-500 text-black px-4 py-2 rounded-lg shadow-lg z-[9999]"
    >
      Toggle GIF
    </button>
  </div>
</template>