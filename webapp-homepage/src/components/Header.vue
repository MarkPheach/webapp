<script setup>
import { ref } from 'vue';
import 'primeicons/primeicons.css'
const showDropdown = ref(false);
</script>

<template>
  <div>
    <div class="h-1/10 w-full bg-sky-300 flex items-center">...</div>
    <header class="flex items-center justify-between bg-sky-500 text-white fixed top-0 left-0 w-full z-50 px-4 h-1/10">

      <!-- โลโก้ -->
      <img src="../assets/CU_DEPT_LOGO.png" alt="Logo" class="9/10 w-auto mr-3 rounded-2xl" />

      <!-- กลุ่มค้นหา + กรองรายวิชา -->
      <div class="flex items-center gap-3 h-full w-1/2 text-xl font-bold">
        <!-- ค้นหา -->
        <div class="relative flex items-center ml-15 w-1/2 h-full">
          <i class="pi pi-search absolute left-3 text-black"></i>
          <input type="text" placeholder="ค้นหารายวิชา"
            class="w-9/10 h-1/2 input input-bordered rounded-xl bg-white pl-10 pr-3 text-black placeholder-gray-400" />
        </div>

        <!-- ปุ่มกรองรายวิชา -->
        <div class="relative h-full w-60 items-center flex text-xl font-bold">
          <button @click="showDropdown = !showDropdown"
            class="btn btn-sm bg-white rounded-xl px-4 flex items-center gap-12 h-1/2 w-full">
            กรองรายวิชา
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 transition-transform duration-200 ease-in-out"
              :class="showDropdown ? 'rotate-180' : 'rotate-0'" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.5 7.5L10 12l4.5-4.5H5.5z" />
            </svg>
          </button>

          <!-- เมนู dropdown -->
          <ul v-show="showDropdown"
            class="absolute top-full mt-1 right-0 z-[100] menu p-5 shadow bg-sky-200 text-black rounded-2xl w-40 h-100">
            <li><a href="#">ทุกรายวิชา</a></li>
            <li><a href="#">รายวิชาที่เลือก</a></li>
            <li><a href="#">อื่นๆ</a></li>
          </ul>
        </div>
      </div>

      <!-- Logout + ราตา-->
      <div class="flex items-center gap-3 h-full w-1/7">
        <div class="relative flex items-center h-full w-full">
          <i class="left-3 pi pi-prime text-2xl absolute " style="color:goldenrod"></i>
          <span class="font-bold bg-white text-black rounded-2xl pl-10 w-9/10 text-xl h-1/2 flex items-center">110</span>
        </div>

        <router-link to="/login" class="h-full flex items-center text-xl font-bold">
          <button
            class="relative btn btn-outline btn-error rounded-2xl bg-white  text-black w-full h-1/2 font-bold pl-5 pr-5 text-[12px]">
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
