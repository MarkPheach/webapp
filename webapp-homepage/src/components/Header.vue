<script setup>
import { ref } from 'vue';
import 'primeicons/primeicons.css'
const showDropdown = ref(false);

</script>
<template>
  <div>
    <header
      class="flex items-center justify-between navbar bg-sky-500 text-white fixed top-0 left-0 w-full z-50 px-4 h-15">
       <img src="../assets/CU_DEPT_LOGO.png" alt="Logo" class="h-12 w-30 mr-3 rounded-2xl" />
      <div class="relative flex items-center justify-center flex-col">
        <i  class="pi pi-search absolute left-3 text-black"></i>
        <input
          type="text"
          placeholder="ค้นหารายวิชา"
          class="w-full max-w-xs input input-bordered rounded-2xl bg-sky-200 pl-10 text-black"
         />
        </div>
        
      <div class="flex items-center gap-4 ml-auto mr-6 relative">
        <!-- ปุ่ม dropdown -->
        <button @click="showDropdown = !showDropdown"
          class="btn bg-white text-blue-500 border border-blue-500 rounded-lg px-6 py-2 hover:bg-gray-200 flex justify-between items-center w-30 min-h-full">
          สาขา
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200 ease-in-out"
            :class="showDropdown ? 'rotate-360' : 'rotate-270'" 
            viewBox="0 0 20 20" 
            fill="currentColor">
            <path d="M5.5 7.5L10 12l4.5-4.5H5.5z" />
          </svg>
        </button>

        <!-- เมนู dropdown -->
        <ul v-if="showDropdown"
          class="absolute top-full mt-2 right-0 z-[100] menu p-2 shadow bg-white text-blue-500 rounded-box w-52">
          <li><a href="#">CS</a></li>
          <li><a href="#">CY</a></li>
          <li><a href="#">AI</a></li>
          <li><a href="#">IT</a></li>
          <li><a href="#">GIS</a></li>
          <li><a href="#">ทั้งหมด</a></li>
        </ul>

        <!-- Logout Button -->
        <router-link to="/login">
          <button class="btn btn-lg bg-white text-blue-500 border border-blue-500 rounded-lg px-6 py-2 hover:bg-gray-200">Log out</button>
        </router-link>
      </div>
    </header>

    <main class="pt-15 px-4">
      <!-- เนื้อหา -->
    </main>
  </div>
</template>