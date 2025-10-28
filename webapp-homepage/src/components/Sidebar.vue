<script setup>
import { ref } from 'vue'
import ProfileCard from '../InfoCard/ProfileCard.vue'


// state
const selectedSubject = ref(null)
const selectedType = ref(null)
const types = ['Lecture', 'Lab', 'Tutorial']
</script>

<template>
  <div class="flex relative">
    <!-- Sidebar -->
    <aside class="w-65 bg-white text-gray-800 min-h-screen shadow-2xl p-5 pt-20 fixed bottom-0 left-0">
      <profile-card />
      <div class="mt-8 flex flex-col gap-4">
        <v-btn class="flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium" elevation="0">
          <v-icon left>mdi-briefcase</v-icon>
          Inventory
        </v-btn>
        <v-btn class="flex items-center gap-3 px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium" elevation="0">
          <v-icon left>mdi-store</v-icon>
          Shop
        </v-btn>
        <v-btn class="flex items-center gap-3 px-4 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium" elevation="0">
          <v-icon left>mdi-book-open-variant</v-icon>
          รายวิชา
        </v-btn>
      </div>
    </aside>

    <!-- Panel -->
    <div v-if="selectedSubject"
         class="absolute left-65 top-15 z-10 w-full sm:w-[400px] bg-white border-l border-gray-300 p-6 shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold truncate">{{ selectedSubject }}</h3>
        <button @click="selectedSubject = null" class="text-gray-500 hover:text-black text-xl" aria-label="Close panel">
          ✕
        </button>
      </div>

      <!-- Filter buttons -->
      <div class="flex gap-2 mb-4 flex-wrap">
        <button v-for="type in types" :key="type" @click="selectedType = type" :class="[
          'px-4 py-1 rounded-full border cursor-pointer select-none',
          selectedType === type
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-blue-500 border-blue-300 hover:bg-blue-100'
        ]">
          {{ type }}
        </button>
      </div>

      <!-- Display selection -->
      <div>
        <p class="text-gray-600">คุณเลือก: <strong>{{ selectedType }}</strong></p>
      </div>
    </div>
  </div>
</template>
