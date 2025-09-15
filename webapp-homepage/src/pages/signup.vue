<script setup>
import { ref } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/User.js';

const userid = ref('');
const userpassword = ref('');
const useremail = ref('');
const userfact = ref('');
const confirmPassword = ref('');

const userStore = useUserStore();

const updatedsignupuser = (e) => {
  e.preventDefault();
  if (userpassword.value !== confirmPassword.value) {
    alert("รหัสผ่านไม่ตรงกัน");
    return;
  }
  const userdata = {
    id: userid.value,
    email: useremail.value,
    password: userpassword.value,
    fact: userfact.value,
  };
  userStore.setUser(userdata);
  router.push('/login');
};
</script>

<template>
  <div class="flex justify-between">
    <!-- Left Block -->
    <div class="h-screen flex items-center justify-center w-3/5 bg-sky-400">
      <div class="flex flex-col items-center text-white">
        <h1 class="block text-2xl font-bold mb-2">Welcome to CY PROJECT!</h1>
        <p class="opacity-90">This is the place you are going to Sign Up.</p>
      </div>
    </div>

    <!-- Right Block -->
    <div class="flex flex-col bg-white min-h-full w-2/5 items-center justify-center relative">
      <!-- Back Button -->
      <router-link
        to="/login"
        class="absolute top-6 left-6 text-blue-500 hover:text-blue-700 transition duration-200"
      >
        ← Back
      </router-link>

      <!-- Form -->
      <form
        @submit="updatedsignupuser"
        class="block bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-auto mt-10 border border-blue-100"
      >
        <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <!-- Student ID -->
        <div class="mb-4">
          <input
            type="text"
            v-model="userid"
            placeholder="รหัสนักศึกษา"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          />
        </div>

        <!-- KKUMail -->
        <div class="mb-4">
          <input
            type="email"
            v-model="useremail"
            placeholder="KKUMail"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <input
            type="password"
            v-model="userpassword"
            placeholder="รหัสผ่าน"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          />
        </div>

        <!-- Confirm Password -->
        <div class="mb-4">
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="ยืนยันรหัสผ่าน"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          />
        </div>

        <!-- Select Major -->
        <div class="mb-6">
          <select
            v-model="userfact"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          >
            <option value="" disabled selected>เลือกสาขา</option>
            <option value="CS">CS</option>
            <option value="CY">CY</option>
            <option value="AI">AI</option>
            <option value="IT">IT</option>
            <option value="GIS">GIS</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="space-y-4">
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow hover:shadow-md"
          >
            Sign Up
          </button>

          <router-link to="/login" class="block">
            <button
              type="button"
              class="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Already have an account? Login
            </button>
          </router-link>

          <div class="text-center py-3">
            <label class="text-gray-500 text-sm">or sign up with</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
