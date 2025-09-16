<script setup>
import { ref } from 'vue';
import 'primeicons/primeicons.css'
const showDropdown = ref(false);
</script>

<template>
  <div>
    <header
      class="flex items-center justify-between navbar bg-sky-500 text-white fixed top-0 left-0 w-full z-50 px-4 h-15">

      <!-- โลโก้ -->
      <img src="../assets/CU_DEPT_LOGO.png" alt="Logo" class="h-12 w-30 mr-3 rounded-2xl" />

      <!-- กลุ่มค้นหา + กรองรายวิชา -->
      <div class="flex items-center gap-3">
        <!-- ค้นหา -->
        <div class="relative flex items-center">
          <i class="pi pi-search absolute left-3 text-black"></i>
          <input
            type="text"
            placeholder="ค้นหารายวิชา"
            class="w-400 max-w-xs input input-bordered rounded-2xl bg-sky-200 pl-10 text-black"
          />
        </div>

        <!-- ปุ่มกรองรายวิชา -->
        <div class="relative">
          <button 
            @click="showDropdown = !showDropdown"
            class="btn w-32 max-w-xs input input-bordered rounded-2xl bg-sky-200 text-black flex items-center justify-between pl-2 pr-2 font-thin text-[14px]"
          >
            กรองรายวิชา
            <svg xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 transition-transform duration-200 ease-in-out"
              :class="showDropdown ? 'rotate-180' : 'rotate-0'" 
              viewBox="0 0 20 20" 
              fill="currentColor">
              <path d="M5.5 7.5L10 12l4.5-4.5H5.5z" />
            </svg>
          </button>

          <!-- เมนู dropdown -->
          <ul v-if="showDropdown"
            class="absolute top-full mt-2 right-0 z-[100] menu p-2 shadow bg-sky-200 text-black rounded-2xl w-30">
            <li><a href="#">ทุกรายวิชา</a></li>
            <li><a href="#">รายวิชาที่เลือก</a></li>
            <li><a href="#">อื่นๆ</a></li>
          </ul>
        </div>
      </div>

      <!-- Logout + ราตา-->
      <div class="flex items-center gap-3">
        <div class="relative flex items-center">
          <i class="left-3 pi pi-prime text-2xl absolute " style="color:goldenrod"></i>
          <span class="font-semibol bg-white text-black rounded-2xl pl-10 pr-2 w-25 text-[14px] h-6">110</span>
        </div>
        
        <router-link to="/login">
          <button class="relative btn btn-outline btn-error rounded-2xl bg-white  text-black w-full h-6 font-bold pl-5 pr-5 text-[12px]">
            Logout
          </button>
        </router-link>
      </div>

    </header>

    <main class="pt-15 px-4">
      <!-- เนื้อหา -->
    </main>
  </div>
</template>
