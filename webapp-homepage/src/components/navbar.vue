<script setup>
import { ref } from "vue";
import "primeicons/primeicons.css";
import { storeToRefs } from "pinia";
import { useUserDummy } from "../stores/userDummy";
import { useRouter } from "vue-router"; // ✅ เพิ่มบรรทัดนี้

const userDummyStore = useUserDummy();
const showDropdown = ref(false);
const router = useRouter(); // ✅ เพิ่มตัว router

// ✅ ฟังก์ชัน Logout
const logout = () => {
  localStorage.removeItem("isLoggedIn"); // ลบสถานะล็อกอิน
  localStorage.removeItem("userDetail"); // ลบข้อมูลผู้ใช้ (ถ้ามี)
  router.push("/login"); // กลับไปหน้า login
};
</script>


<template>
  <header
    class="flex items-center justify-between bg-gradient-to-r from-blue-900 to-sky-600 text-white fixed top-0 left-0 w-full z-50 px-6 h-[10vh] shadow-md"
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

    

    <!-- คะแนน + Logout -->
    <div class="flex items-center gap-4">
      <div
        class="relative flex items-center bg-white/90 rounded-xl px-4 py-1 shadow-sm text-black font-semibold"
      >
        <i class="pi pi-star-fill text-yellow-500 mr-2"></i>
        <span> {{ userDummyStore.userDummys[0].point }} </span>
      </div>

    <button
      @click="logout"
      class="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl px-5 py-2 shadow-md transition-all duration-200"
    >
      Logout
    </button>

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