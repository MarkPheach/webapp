<script setup>
import { ref } from "vue"
import LoginSlider from "../components/LoginSlider.vue"

// slides ที่ส่งให้ LoginSlider
const slides = ref([
  { id: 1, image: "/src/assets/login1.png",},
  { id: 2, image: "/src/assets/login2.png",},
  { id: 3, image: "/src/assets/login3.png",},
  { id: 4, image: "/src/assets/login4.png",},
])
</script>

<template>
  <div class="flex h-screen">
    <!-- Left Block (Slider) -->
    <div class="w-3/5 h-full">
      <LoginSlider :slides="slides" class="h-full w-full" />
    </div>

    <!-- Right Block (Login Form) -->
    <div class="w-2/5 flex flex-col justify-center items-center bg-white px-8 h-full">
      <!-- Logo -->
      <img src="../assets/KKU_LOGO.png" alt="KKU Logo" />

      <!-- Login Form -->
      <form class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-blue-100">
        <!-- Username -->
        <div class="mb-4">
          <input
            type="text"
            placeholder="Username"
            class="w-full px-4 py-3 rounded-lg border border-blue-200
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                   focus:outline-none transition duration-200"
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <input
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-lg border border-blue-200
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                   focus:outline-none transition duration-200"
          />
        </div>

        <!-- Remember + Forgot -->
        <div class="flex justify-between items-center mb-6">
          <label class="flex items-center text-blue-800">
            <input
              type="checkbox"
              class="mr-2 rounded text-blue-500 focus:ring-blue-400"
            />
            Remember me
          </label>
          <a
            href="#"
            class="text-blue-500 hover:text-blue-700 transition duration-200"
          >
            Forgot password?
          </a>
        </div>

        <!-- Buttons -->
        <div class="space-y-4">
          <router-link to="/" class="block">
            <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow hover:shadow-md"
            >
              Login
            </button>
          </router-link>

          <router-link to="/signup" class="block">
            <button
              type="button"
              class="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
          </router-link>
        </div>

        <!-- Divider -->
        <div class="text-center py-3">
          <label class="text-gray-500 text-sm">or login with</label>
        </div>
      </form>
    </div>
  </div>
</template>
