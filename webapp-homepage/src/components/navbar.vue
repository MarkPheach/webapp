<script setup>
import { ref } from "vue";
import "primeicons/primeicons.css";
import { storeToRefs } from "pinia";
import { useUserDummy } from "../stores/userDummy";

const userDummyStore = useUserDummy();
const showDropdown = ref(false);
</script>

<template>
  <header
    class="flex items-center justify-between bg-gradient-to-r from-blue-900 to-sky-600 text-white sticky top-0 left-0 w-full z-50 px-6 h-[10vh] shadow-md"
  >
    <!-- โลโก้ -->
    <div class="flex items-center gap-3">
      <img
        src="../assets/CU_DEPT_LOGO.png"
        alt="Logo"
        class="h-[60px] w-auto rounded-2xl shadow-md bg-white p-1"
      />
      <h1 class="text-2xl font-semibold tracking-wide drop-shadow">
        CourseHub
      </h1>
    </div>

    <!-- กล่องค้นหา + ตัวกรอง -->
    <div class="flex items-center gap-4 w-1/2">
      <!-- ช่องค้นหา -->
      <div class="relative w-2/3">
        <i
          class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        ></i>
        <input
          type="text"
          placeholder="ค้นหารายวิชา..."
          class="w-full h-[45px] rounded-xl bg-white/90 text-black pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-400 shadow-sm"
        />
      </div>

      <!-- ปุ่มกรองรายวิชา -->
      <div class="relative w-[180px]">
        <button
          @click="showDropdown = !showDropdown"
          class="w-full flex justify-between items-center bg-white text-blue-900 font-semibold rounded-xl px-4 py-2 shadow-md hover:bg-sky-100 transition-all duration-200"
        >
          กรองรายวิชา
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-transform duration-200 ease-in-out"
            :class="showDropdown ? 'rotate-180' : 'rotate-0'"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.5 7.5L10 12l4.5-4.5H5.5z" />
          </svg>
        </button>

        <!-- dropdown -->
        <ul
          v-show="showDropdown"
          class="absolute right-0 top-[110%] z-50 bg-white text-blue-900 font-medium shadow-xl rounded-xl overflow-hidden w-full animate-fadeIn"
        >
          <li class="hover:bg-sky-100 px-4 py-2 cursor-pointer">ทุกรายวิชา</li>
          <li class="hover:bg-sky-100 px-4 py-2 cursor-pointer">
            รายวิชาที่เลือก
          </li>
          <li class="hover:bg-sky-100 px-4 py-2 cursor-pointer">อื่นๆ</li>
        </ul>
      </div>
    </div>

    <!-- คะแนน + Logout -->
    <div class="flex items-center gap-4">
      <div
        class="relative flex items-center bg-white/90 rounded-xl px-4 py-1 shadow-sm text-black font-semibold"
      >
        <i class="pi pi-star-fill text-yellow-500 mr-2"></i>
        <span> {{ userDummyStore.userDummys[0].point }} </span>
      </div>

      <router-link to="/login">
        <button
          class="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl px-5 py-2 shadow-md transition-all duration-200"
        >
          Logout
        </button>
      </router-link>
    </div>
  </header>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
